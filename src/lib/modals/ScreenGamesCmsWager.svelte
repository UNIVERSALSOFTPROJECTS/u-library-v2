<script>
    import { onDestroy, onMount, tick } from "svelte";
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
     * }} params
     */

    export let open = false;
    export let platform;
    export let updateBalance = () => {};
    export let options_launch = {};

    let loadCmsWager = false;
    let isFullscreen = false;
    let heightModal;
    let errorMessage = "";
    let requestVersion = 0;
    let launchKey = "";
    let appContent;
    let cmswScriptElement = null;

    const resizeHeightModal = () => {
        heightModal = visualViewport?.height || window.innerHeight;
    };

    function statusModal(isActive) {
        const body = document.body.classList;
        isActive ? body.add("modal-open") : body.remove("modal-open");
    }

    const lockTouchZoom = (e) => {
        if (e.touches.length > 1) e.preventDefault();
    };

    function clearContainer() {
        if (appContent) {
            appContent.innerHTML = "";
        }
    }

    function cleanupScript() {
        if (cmswScriptElement?.parentNode) {
            cmswScriptElement.parentNode.removeChild(cmswScriptElement);
        }
        cmswScriptElement = null;
        if (window.cmsSportbook) {
            delete window.cmsSportbook;
        }
    }

    function clearState() {
        loadCmsWager = false;
        errorMessage = "";
        clearContainer();
        cleanupScript();
    }

    function loadProviderScript(scriptUrl) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = scriptUrl;
            script.async = true;
            script.dataset.cmswagerScript = "true";
            script.onload = () => resolve(script);
            script.onerror = () =>
                reject(new Error(`Failed to load CMSWager script: ${scriptUrl}`));
            document.head.appendChild(script);
        });
    }

    async function loadCmsWagerSportbook() {
        const sessionToken =
            options_launch?.sessionToken || options_launch?.token || options_launch?.gameToken;
        const gameId = options_launch?.gameId || options_launch?.gameid;
        const mode = options_launch?.mode || options_launch?.deviceMode || options_launch?.viewMode;

        if (!sessionToken || !gameId || !mode) {
            errorMessage =
                "No se pudo iniciar CMSWager: faltan sessionToken, gameId o mode.";
            return;
        }

        const currentRequest = ++requestVersion;
        loadCmsWager = true;
        errorMessage = "";
        clearContainer();
        cleanupScript();

        try {
            /** @type {CmsWagerLaunchResponse} */
            const response = await ServerConnection.game.openCmsWagerGame(
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

            cmswScriptElement = await loadProviderScript(params.scriptUrl);
            if (currentRequest !== requestVersion) return;
            await tick();

            if (
                !window.cmsSportbook ||
                typeof window.cmsSportbook.startSportbook !== "function"
            ) {
                console.error("CMSWager script loaded without cmsSportbook.startSportbook");
                errorMessage =
                    "CMSWager cargó el script, pero el bootstrap del proveedor no está disponible.";
                return;
            }

            clearContainer();
            window.cmsSportbook.startSportbook(
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
            });
        } catch (error) {
            if (currentRequest !== requestVersion) return;
            console.error("CMSWager launch failed:", error);
            errorMessage =
                "Error al cargar CMSWager. Revisa la conexión o intenta nuevamente.";
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
        const { event: messageEvent } = event.data || {};
        if (messageEvent === "exit") {
            closeModal();
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
        const sessionToken =
            options_launch?.sessionToken || options_launch?.token || options_launch?.gameToken || "";
        const gameId = options_launch?.gameId || options_launch?.gameid || "";
        const mode = options_launch?.mode || options_launch?.deviceMode || options_launch?.viewMode || "";
        const nextLaunchKey = `${open}|${sessionToken}|${gameId}|${mode}`;

        if (open && sessionToken && gameId && mode && nextLaunchKey !== launchKey) {
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
    <div class="modal screenGames" on:touchstart={lockTouchZoom} on:touchmove={lockTouchZoom} on:scroll={resizeHeightModal}>
        <div class="modal-dialog">
            <div class="modal-content" use:watchResize={resizeHeightModal} style="height:{heightModal}px">
                <div class="modal-header {isMobileSafari ? 'safari' : ''}">
                    <div class="screenGames__options">
                        <button class="btn close" on:click={closeModal} />
                        <div />
                    </div>
                    <picture>
                        <source media="(max-width: 1023px)" srcset="{assetsUrl}{platform}/logo_mb.png" />
                        <img src="{assetsUrl}{platform}/logo.png" alt="{platform}-logo" loading="eager" />
                    </picture>
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

    .cmswager-container {
        width: 100%;
        height: 100%;
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
