<script>
    import { onDestroy, onMount } from "svelte";
    import { watchResize } from "svelte-watch-resize";
    import { assetsUrl } from "../../js/utils/assetsUtils";
    import { isMobileSafari } from 'mobile-device-detect';

    export let open;
    export let platform;
    export let updateBalance;
   
    export let options_launch;

    let loadTomHornGame = true;
    let isFullscreen = false;
    let viewTomHornGame = true;
    let heightModal;
    let tomHornContainer;
    let tomHornInstance;

    const resizeHeightModal = () => { heightModal = visualViewport.height; }
    
    function statusModal(isActive) {
        const body = document.body.classList;
        isActive ? body.add("modal-open"):body.remove("modal-open");
        loadTomHornGame = true;
    }

    const lockTouchZoom = (e) => { if (e.touches.length > 1) e.preventDefault(); }

    function receiveMessage(event) {
        if (event.data === "luckyspins_exit_game" || event.data === "adm_exit_game") {
            closeModal();
        } else {
        }
    }


    const closeModal = () => { 
        try {
            updateBalance();
            if (document.fullscreenElement != null) {
                toggleFullscreen();
            }
            open = false;
        } catch (error) {
            console.error("Error closing modal:", error);
        }
    };

 

    const reloadTomHornGame = () => { 
        viewTomHornGame = false;
        loadTomHornGame = true;
        setTimeout(() => { 
            viewTomHornGame = true;
            initTomHornGame();
        }, 100);
    }
   
    const toggleFullscreen = () => {
       setTimeout(() => { resizeHeightModal(); }, 100);
        if (!isFullscreen) {
            const e = document.body;
            if (e.requestFullscreen) e.requestFullscreen();
            // @ts-ignore
            else if (e.mozRequestFullScreen) e.mozRequestFullScreen();
            // @ts-ignore
            else if (e.webkitRequestFullscreen) e.webkitRequestFullscreen();
            // @ts-ignore
            else if (e.msRequestFullscreen) e.msRequestFullscreen();
            isFullscreen = true;
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
            // @ts-ignore
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            // @ts-ignore
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            // @ts-ignore
            else if (document.msExitFullscreen) document.msExitFullscreen();
            isFullscreen = false;
        }
    }

    function initTomHornGame() {
        // @ts-ignore
        if (tomHornContainer && window.renderClient) {
            loadTomHornGame = true;
            
            // Limpiar contenedor antes de inicializar
            tomHornContainer.innerHTML = '';
            
            try {
                // Crear el div placeholder
                const placeholder = document.createElement('div');
                placeholder.id = 'gameClientPlaceholder';
                tomHornContainer.appendChild(placeholder);
                
                // Configurar parámetros desde options_launch
                const params = {
                    'width': options_launch.options.params.width || '100%',
                    'height': options_launch.options.params.height || '100%',
                    'param:base': options_launch.options.params.base,
                    'var:auth': options_launch.options.params.auth,
                    'var:moneyType': options_launch.options.params.moneyType,
                    'channel': options_launch.options.params.channel || options_launch.options.params.chanel,
                    'var:gameKey': options_launch.options.params.gameKey,
                    'var:gameAddress': options_launch.options.params.gameAddress,
                    'var:gameVersion': options_launch.options.params.gameVersion,
                    'var:gameName': options_launch.options.params.gameName,
                    'var:lang': options_launch.options.params.lang,
                    'var:fastUrl': options_launch.options.params.fastURL
                };
                
                // @ts-ignore
                window.renderClient(params, 'gameClientPlaceholder');                
                // Dar tiempo para que se cree el juego y luego ocultar loading
                setTimeout(() => {
                    loadTomHornGame = false;
                }, 2000);
                
            } catch (error) {
                console.error("Error creating TomHorn game instance:", error);
                loadTomHornGame = false;
            }
        } else {
            console.warn("TomHorn initialization failed - missing dependencies:", {
                container: !!tomHornContainer,
                renderClient: !!window.renderClient
            });
        }
    }

    function loadTomHornScripts() {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            if (window.renderClient) {
                resolve();
                return;
            }
            
            const baseUrl = options_launch.options.url || options_launch.options.base || '';
            
            // Cargar ClientUtils.js
            const clientUtilsScript = document.createElement('script');
            clientUtilsScript.src = `${baseUrl}ClientUtils.js`;
            clientUtilsScript.type = 'text/javascript';
            
            // Cargar swfobject.js
            const swfObjectScript = document.createElement('script');
            swfObjectScript.src = `${baseUrl}swfobject.js`;
            swfObjectScript.type = 'text/javascript';
            
            let scriptsLoaded = 0;
            const totalScripts = 2;
            
            const onScriptLoad = () => {
                scriptsLoaded++;
                if (scriptsLoaded === totalScripts) {
                    resolve();
                }
            };
            
            const onScriptError = (error) => {
                console.error('Error loading TomHorn script:', error);
                reject(error);
            };
            
            clientUtilsScript.onload = onScriptLoad;
            clientUtilsScript.onerror = onScriptError;
            
            swfObjectScript.onload = onScriptLoad;
            swfObjectScript.onerror = onScriptError;
            
            document.head.appendChild(clientUtilsScript);
            document.head.appendChild(swfObjectScript);
        });
    }

    onMount( async() => {       
        window.addEventListener('resize', resizeHeightModal); 
        window.addEventListener('message', receiveMessage);        
        // Cargar los scripts de TomHorn
        try {
            await loadTomHornScripts();
            if (open) {
                initTomHornGame();
            }
        } catch (error) {
            console.error("Error loading TomHorn scripts:", error);
        }
    });
    
    onDestroy(() => {
        window.removeEventListener('resize', resizeHeightModal);
        window.removeEventListener('message', receiveMessage);
        
        if (tomHornContainer) {
            tomHornContainer.innerHTML = '';
        }
    });


    $: statusModal(open);
    // @ts-ignore
    $: if (open && window.renderClient && tomHornContainer) {
        initTomHornGame();
    }
</script>

{#if open}
    <div class="modal screenGames" on:touchstart={lockTouchZoom} on:touchmove={lockTouchZoom} on:scroll={resizeHeightModal}>
        <div class="modal-dialog">
            <div class="modal-content" use:watchResize={resizeHeightModal} style="height:{heightModal}px">
                <div class="modal-header {isMobileSafari?'safari':''}">
                    <div class="screenGames__options">
                        <button class="btn close" on:click={closeModal} />
                        <div/>
                    </div>
                    <picture>
                        <source media="(max-width: 1023px)" srcset="{assetsUrl}{platform}/logo_mb.png">
                        <img src="{assetsUrl}{platform}/logo.png" alt="{platform}-logo" loading="eager">
                    </picture>
                    <div class="screenGames__options">
                        <button class="btn reload" on:click={reloadTomHornGame}></button>
                        <button class="btn screen {isFullscreen?'full':''}" on:click={toggleFullscreen} hidden={isMobileSafari}></button>
                    </div>
                </div>
                <div class="modal-body">
                    {#if loadTomHornGame}
                        <b class="loading"><b><b></b></b></b>
                    {/if}
                    {#if viewTomHornGame}
                        <div bind:this={tomHornContainer} class="tomhorn-game-container" id="tomhorn-game"></div>
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

    /* Estilos básicos para el iframe */
    :global(.modal.screenGames .modal-body iframe) {
        width: 100% !important;
        height: 100% !important;
        border: none !important;
        position: relative !important;
        z-index: 1 !important;
    }

    #tomhorn-game {
        border: 1px solid #ff6b35 !important;
        width: 100% !important;
        height: 100% !important;
    }
    
    .tomhorn-game-container {
        width: 100% !important;
        height: 100% !important;
        overflow: hidden !important;
    }

</style>
