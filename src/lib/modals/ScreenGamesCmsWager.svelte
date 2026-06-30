<script>
    import { createEventDispatcher, onDestroy, onMount, tick } from "svelte";
    import { watchResize } from "svelte-watch-resize";
    import { isMobileSafari } from "mobile-device-detect";
    import ServerConnection from "../../js/server";
    import { assetsUrl } from "../../js/utils/assetsUtils";

    /**
     * @typedef {Object} CmsWagerLaunchResponse
     * @property {string} url
     * @property {{
     *   scriptUrl: string,
     *   platform: string,
     *   token: string,
     *   culture: string,
     *   clientKey: string,
     *   defaultPage?: string,
     *   exttoken?: string,
     *   clientApi?: string,
     *   logo?: string,
     * }} params
     */

    export let open = false;
    export let platform;
    export let updateBalance = () => {};
    export let options_launch = {};
    export let launchDescriptor = null;
    export let embedded = true;
    export let onTerminalEvent = () => {};

    const dispatch = createEventDispatcher();

    let loadCmsWager = false;
    let isFullscreen = false;
    let heightModal;
    let errorMessage = "";
    let requestVersion = 0;
    let launchKey = "";
    let appContent;
    let activeLaunchKey = "";
    let terminalConfig = {
        exttoken: "",
        clientApi: "",
        logo: "",
    };

    const resizeHeightModal = () => {
        heightModal = visualViewport?.height || window.innerHeight;
    };

    function statusModal(isActive) {
        const body = document.body.classList;
        if (embedded || !isActive) body.remove("modal-open");
        else body.add("modal-open");
    }

    const lockTouchZoom = (e) => {
        if (e.touches.length > 1) e.preventDefault();
    };

    function clearContainer() {
        if (appContent) {
            appContent.innerHTML = "";
        }
    }

    function resetTerminalConfig() {
        terminalConfig = {
            exttoken: "",
            clientApi: "",
            logo: "",
        };
    }

    function clearState() {
        loadCmsWager = false;
        errorMessage = "";
        activeLaunchKey = "";
        clearContainer();
        resetTerminalConfig();
    }

    function applyTerminalDescriptor(params) {
        terminalConfig = {
            exttoken: params?.exttoken || "",
            clientApi: params?.clientApi || "",
            logo: params?.logo || "",
        };
    }

    function emitTerminalEvent(type, payload) {
        const detail = {
            type,
            payload,
            config: terminalConfig,
        };
        console.info("CMSWager terminal event", detail);
        dispatch("terminalEvent", detail);
        try {
            onTerminalEvent(detail);
        } catch (error) {
            console.error("CMSWager terminal event callback failed", error);
        }
    }

    function loadProviderScript(scriptUrl) {
        window.__cmsWagerScriptPromises = window.__cmsWagerScriptPromises || {};
        if (window.__cmsWagerScriptPromises[scriptUrl]) {
            return window.__cmsWagerScriptPromises[scriptUrl];
        }

        const existingScript = document.querySelector(
            `script[data-cmswager-script="true"][src="${scriptUrl}"]`
        );
        if (existingScript) {
            window.__cmsWagerScriptPromises[scriptUrl] = Promise.resolve(existingScript);
            return window.__cmsWagerScriptPromises[scriptUrl];
        }

        window.__cmsWagerScriptPromises[scriptUrl] = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = scriptUrl;
            script.async = true;
            script.dataset.cmswagerScript = "true";
            script.onload = () => resolve(script);
            script.onerror = () =>
                reject(new Error(`Failed to load CMSWager script: ${scriptUrl}`));
            document.head.appendChild(script);
        });

        return window.__cmsWagerScriptPromises[scriptUrl];
    }

    async function loadCmsWagerSportbook() {
        const descriptorParams = launchDescriptor?.payload?.params;
        const descriptorBaseUrl =
            launchDescriptor?.payload?.baseUrl || launchDescriptor?.payload?.url || "";
        const sessionToken =
            options_launch?.sessionToken || options_launch?.token || options_launch?.gameToken;
        const gameId = options_launch?.gameId || options_launch?.gameid;
        const mode = options_launch?.mode || options_launch?.deviceMode || options_launch?.viewMode;

        if (!descriptorParams && (!sessionToken || !gameId || !mode)) {
            errorMessage =
                "No se pudo iniciar CMSWager: faltan sessionToken, gameId o mode.";
            return;
        }

        const currentLaunchKey = descriptorParams
            ? JSON.stringify({
                  scriptUrl: descriptorParams.scriptUrl,
                  platform: descriptorParams.platform,
                  token: descriptorParams.token,
                  culture: descriptorParams.culture,
                  clientKey: descriptorParams.clientKey,
                  defaultPage: descriptorParams.defaultPage,
                  exttoken: descriptorParams.exttoken,
                  clientApi: descriptorParams.clientApi,
                  logo: descriptorParams.logo,
              })
            : `${sessionToken}|${gameId}|${mode}`;
        if (loadCmsWager || activeLaunchKey === currentLaunchKey) {
            return;
        }
        activeLaunchKey = currentLaunchKey;

        const currentRequest = ++requestVersion;
        loadCmsWager = true;
        errorMessage = "";
        clearContainer();

        try {
            /** @type {CmsWagerLaunchResponse} */
            const response = descriptorParams
                ? {
                      url: descriptorBaseUrl,
                      params: descriptorParams,
                  }
                : await ServerConnection.game.openCmsWagerGame(
                      sessionToken,
                      gameId,
                      mode
                  );

            if (currentRequest !== requestVersion) return;

            const params = response?.params;
            if (
                !response?.url ||
                !params?.scriptUrl ||
                !params?.platform ||
                !params?.token ||
                !params?.culture ||
                !params?.clientKey
            ) {
                console.error("Invalid CMSWager opengame response:", response);
                errorMessage = "No fue posible obtener el descriptor de CMSWager.";
                return;
            }

            applyTerminalDescriptor(params);

            await loadProviderScript(params.scriptUrl);
            if (currentRequest !== requestVersion) return;
            await tick();

            const sportsbook =
                typeof cmsSportbook !== "undefined" ? cmsSportbook : window.cmsSportbook;
            if (
                !sportsbook ||
                typeof sportsbook.startSportbook !== "function"
            ) {
                console.error("CMSWager script loaded without cmsSportbook.startSportbook");
                errorMessage =
                    "CMSWager cargo el script, pero el bootstrap del proveedor no esta disponible.";
                return;
            }

            clearContainer();
            sportsbook.startSportbook(
                params.platform,
                params.token,
                params.culture,
                params.clientKey,
                params.defaultPage || "sport"
            );

            console.log("CMSWager sportbook started", {
                gameId,
                mode,
                baseUrl: response.url,
                platform: params.platform,
                defaultPage: params.defaultPage,
                hasTerminalConfig: !!(params.exttoken || params.clientApi || params.logo),
            });
        } catch (error) {
            if (currentRequest !== requestVersion) return;
            console.error("CMSWager launch failed:", error);
            errorMessage =
                "Error al cargar CMSWager. Revisa la conexion o intenta nuevamente.";
            activeLaunchKey = "";
        } finally {
            if (currentRequest === requestVersion) {
                loadCmsWager = false;
            }
        }
    }

    function closeModal() {
        try {
            updateBalance();
            if (document.fullscreenElement != null) {
                toggleFullscreen();
            }
            open = false;
        } catch (error) {
            console.error("Error closing CMSWager modal:", error);
        } finally {
            requestVersion += 1;
            clearState();
        }
    }

    function reloadCmsWager() {
        activeLaunchKey = "";
        loadCmsWagerSportbook();
    }

    function toggleFullscreen() {
        setTimeout(() => {
            resizeHeightModal();
        }, 100);

        if (!isFullscreen) {
            const e = document.body;
            if (e.requestFullscreen) e.requestFullscreen();
            else if (e.mozRequestFullScreen) e.mozRequestFullScreen();
            else if (e.webkitRequestFullscreen) e.webkitRequestFullscreen();
            else if (e.msRequestFullscreen) e.msRequestFullscreen();
            isFullscreen = true;
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
            isFullscreen = false;
        }
    }

    function handleMessage(event) {
        const payload = event?.data || {};
        const messageType = payload?.type;
        const messageEvent = payload?.event;

        if (messageType === "ticket:placed" || messageType === "action:openCheckTicket") {
            emitTerminalEvent(messageType, payload);
            return;
        }

        if (messageEvent === "exit") {
            if (!embedded) closeModal();
        } else if (messageEvent === "reload") {
            reloadCmsWager();
        }
    }

    onMount(() => {
        resizeHeightModal();
        window.addEventListener("resize", resizeHeightModal);
        window.addEventListener("message", handleMessage);
    });

    onDestroy(() => {
        requestVersion += 1;
        clearState();
        window.removeEventListener("resize", resizeHeightModal);
        window.removeEventListener("message", handleMessage);
    });

    $: statusModal(open);

    $: {
        const descriptorKey = launchDescriptor?.payload?.params
            ? JSON.stringify(launchDescriptor.payload.params)
            : "";
        const sessionToken =
            options_launch?.sessionToken || options_launch?.token || options_launch?.gameToken || "";
        const gameId = options_launch?.gameId || options_launch?.gameid || "";
        const mode = options_launch?.mode || options_launch?.deviceMode || options_launch?.viewMode || "";
        const nextLaunchKey = descriptorKey
            ? `${open}|descriptor|${descriptorKey}`
            : `${open}|${sessionToken}|${gameId}|${mode}`;

        if (
            open &&
            ((descriptorKey && launchDescriptor?.payload?.params) || (sessionToken && gameId && mode)) &&
            nextLaunchKey !== launchKey
        ) {
            launchKey = nextLaunchKey;
            loadCmsWagerSportbook();
        } else if (!open) {
            launchKey = "";
        }
    }

    $: if (!open) {
        requestVersion += 1;
        clearState();
    }
</script>

{#if open}
    {#if embedded}
        <div class="cmswager-inline" use:watchResize={resizeHeightModal}>
            <div class="cmswager-inline__body" style="height:{heightModal}px">
                <div bind:this={appContent} id="appcontent" class="cmswager-container"></div>
                {#if loadCmsWager}
                    <div class="screenGames__overlay">
                        <b class="loading"><b><b></b></b></b>
                    </div>
                {:else if errorMessage}
                    <div class="screenGames__error">
                        <b>No se pudo cargar CMSWager.</b>
                        <p>{errorMessage}</p>
                        <button class="btn screenGames__retry" on:click={reloadCmsWager}>Reintentar</button>
                    </div>
                {/if}
            </div>
        </div>
    {:else}
        <div class="modal screenGames" on:touchstart={lockTouchZoom} on:touchmove={lockTouchZoom} on:scroll={resizeHeightModal}>
            <div class="modal-dialog">
                <div class="modal-content" use:watchResize={resizeHeightModal} style="height:{heightModal}px">
                    <div class="modal-header {isMobileSafari ? 'safari' : ''}">
                        <div class="screenGames__options">
                            <button class="btn close" on:click={closeModal} />
                            <div />
                        </div>
                        {#if terminalConfig.logo}
                            <img src={terminalConfig.logo} alt="cmswager-terminal-logo" class="screenGames__custom-logo" loading="eager" />
                        {:else}
                            <picture>
                                <source media="(max-width: 1023px)" srcset="{assetsUrl}{platform}/logo_mb.png" />
                                <img src="{assetsUrl}{platform}/logo.png" alt="{platform}-logo" loading="eager" />
                            </picture>
                        {/if}
                        <div class="screenGames__options">
                            <button class="btn reload" on:click={reloadCmsWager} disabled={loadCmsWager}></button>
                            <button class="btn screen {isFullscreen ? 'full' : ''}" on:click={toggleFullscreen} hidden={isMobileSafari}></button>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div bind:this={appContent} id="appcontent" class="cmswager-container"></div>
                        {#if loadCmsWager}
                            <div class="screenGames__overlay">
                                <b class="loading"><b><b></b></b></b>
                            </div>
                        {:else if errorMessage}
                            <div class="screenGames__error">
                                <b>No se pudo cargar CMSWager.</b>
                                <p>{errorMessage}</p>
                                <button class="btn screenGames__retry" on:click={reloadCmsWager}>Reintentar</button>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    {/if}
{/if}

<style>
    :global(.modal.screenGames .modal-body) {
        position: relative !important;
        z-index: 10001 !important;
        flex: 1 !important;
        overflow: hidden !important;
        padding: 0 !important;
    }

    :global(.modal.screenGames .modal-body iframe) {
        width: 100% !important;
        height: 100% !important;
        border: none !important;
        position: relative !important;
        z-index: 1 !important;
    }

    .cmswager-inline {
        width: 100%;
    }

    .cmswager-inline__body {
        position: relative;
        width: 100%;
        overflow: hidden;
    }

    .cmswager-container {
        width: 100%;
        height: 100%;
    }

    .screenGames__custom-logo {
        max-height: 42px;
        max-width: min(280px, 42vw);
        object-fit: contain;
    }

    .screenGames__overlay,
    .screenGames__error {
        position: absolute;
        inset: 0;
        display: grid;
        gap: 0.75rem;
        place-items: center;
        align-content: center;
        width: 100%;
        height: 100%;
        padding: 1.5rem;
        text-align: center;
        background: rgba(34, 34, 34, 0.92);
        z-index: 2;
    }

    .screenGames__error p {
        line-height: 1.4;
        max-width: 32rem;
    }

    .screenGames__retry {
        max-width: 14rem;
    }
</style>
