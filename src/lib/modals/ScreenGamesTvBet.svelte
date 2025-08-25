<script>
    import { onDestroy, onMount } from "svelte";
    import { watchResize } from "svelte-watch-resize";
    import { assetsUrl } from "../../js/utils/assetsUtils";
    import { isMobileSafari } from 'mobile-device-detect';

    export let open;
    export let platform;
    export let updateBalance;
   
    export let options_launch;

    let loadTvbetFrame = true;
    let isFullscreen = false;
    let viewTvbetFrame = true;
    let heightModal;
    let tvbetFrameContainer;
    let tvbetFrameInstance;
   
    let tv_language;
    let tv_clientId;
    let tv_token;
    let tv_server;
    let tv_gameId;

    const resizeHeightModal = () => { heightModal = visualViewport.height; }
    
    function statusModal(isActive) {
        const body = document.body.classList;
        isActive ? body.add("modal-open"):body.remove("modal-open");
        loadTvbetFrame = true;
    }

    const lockTouchZoom = (e) => { if (e.touches.length > 1) e.preventDefault(); }

    function receiveMessage(event) {
        console.log("Received message from origin:", event.origin);
        if (event.data === "luckyspins_exit_game" || event.data === "adm_exit_game") {
            closeModal();
        } else {
            console.log("Unknown message received:", event.data);
        }
    }


    const closeModal = () => { 
        console.log("Closing modal");
        try {
            updateBalance();
            console.log("Balance updated");
            if (document.fullscreenElement != null) {
                console.log("Exiting fullscreen");
                toggleFullscreen();
            }
            open = false;
            console.log("Modal closed");
        } catch (error) {
            console.error("Error closing modal:", error);
        }
    };

 

    const reloadTvbetFrame = () => { 
        console.log('Reloading TvbetFrame...');
        viewTvbetFrame = false;
        loadTvbetFrame = true;
        
        if (tvbetFrameContainer) {
            // Destruir la instancia actual y limpiar completamente el contenedor
            tvbetFrameContainer.innerHTML = '';
        }
        
        if (tvbetFrameInstance) {
            tvbetFrameInstance = null;
        }
        
        setTimeout(() => { 
            viewTvbetFrame = true;
            setTimeout(() => {
                initTvbetFrame();
            }, 100);
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

    function handleMessage(event) {
        // Manejar mensajes de TvbetFrame si es necesario
        const { event: messageEvent } = event.data;

        if (messageEvent === 'exit') {
            console.log('[TvbetFrame message] Evento recibido: exit');
            closeModal();
        } else if (messageEvent === 'reload') {
            console.log('[TvbetFrame message] Evento recibido: reload');
        } else {
            console.log('[TvbetFrame message] Evento desconocido:', messageEvent);
        }
    }

    function initTvbetFrame() {
        // @ts-ignore
        if (tvbetFrameContainer && window.TvbetFrame) {
            loadTvbetFrame = true;
            
            // Limpiar contenedor antes de inicializar
            tvbetFrameContainer.innerHTML = '';
            
            // @ts-ignore
            tvbetFrameInstance = new window.TvbetFrame({
                lng: tv_language,
                clientId: tv_clientId,
                tokenAuth: tv_token,
                server: tv_server,
                singleGame: tv_gameId
            });
            
            // Observar cambios en el contenedor para aplicar estilos cuando se cree el iframe
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        const iframes = tvbetFrameContainer.querySelectorAll('iframe');
                        //const divs = tvbetFrameContainer.querySelectorAll('div');
                        
                        // Aplicar estilos a todos los iframes
                        iframes.forEach(iframe => {
                            iframe.style.width = '50%';
                            iframe.style.height = '100%';
                            iframe.style.border = 'none';
                            // iframe.style.position = 'relative';
                            // iframe.style.zIndex = '1';
                            // iframe.style.maxWidth = '100%';
                            // iframe.style.maxHeight = '100%';
                        });
                        
                        // Aplicar estilos a divs contenedores
                        // divs.forEach(div => {
                        //     if (div !== tvbetFrameContainer) {
                        //         div.style.width = '100%';
                        //         div.style.height = '100%';
                        //         div.style.position = 'relative';
                        //         div.style.overflow = 'hidden';
                        //         div.style.maxWidth = '100%';
                        //         div.style.maxHeight = '100%';
                        //     }
                        // });
                        
                        if (iframes.length > 0) {
                            loadTvbetFrame = false;
                            observer.disconnect();
                        }
                    }
                });
            });
            
            observer.observe(tvbetFrameContainer, {
                childList: true,
                subtree: true
            });
            
            // Timeout de seguridad para desconectar el observer
            setTimeout(() => {
                observer.disconnect();
                loadTvbetFrame = false;
            }, 5000);
        }
    }

    function loadTvbetFrameScript() {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            if (window.TvbetFrame) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://tvbetframe27.com/assets/frame.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    onMount(async () => {
        tv_language = options_launch.options.language || 'en';
        tv_clientId = options_launch.options.clientId;
        tv_token = options_launch.options.token;
        tv_server = options_launch.options.server;
        tv_gameId = options_launch.options.gameId;

        console.log("Mounting ScreenGamesTvBet modal",options_launch);
        window.addEventListener('resize', resizeHeightModal); 
        window.addEventListener('message', handleMessage);
        
        // Cargar el script de TvbetFrame
        try {
            await loadTvbetFrameScript();
            if (open) {
                initTvbetFrame();
            }
        } catch (error) {
            console.error('Error loading TvbetFrame script:', error);
        }
    });
    
    onDestroy(() => {
        window.removeEventListener('resize', resizeHeightModal);
        window.removeEventListener('message', handleMessage);
        if (tvbetFrameInstance) {
            // Limpiar la instancia de TvbetFrame si tiene un método de limpieza
            tvbetFrameContainer.innerHTML = '';
        }
        console.log("Cleaned up event listeners and TvbetFrame instance");
    });


    $: statusModal(open);
    // @ts-ignore
    $: if (open && window.TvbetFrame && tvbetFrameContainer) {
        initTvbetFrame();
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
                        <button class="btn reload" on:click={reloadTvbetFrame}></button>
                        <button class="btn screen {isFullscreen?'full':''}" on:click={toggleFullscreen} hidden={isMobileSafari}></button>
                    </div>
                </div>
                <div class="modal-body">
                    {#if loadTvbetFrame}
                        <b class="loading"><b><b></b></b></b>
                    {/if}
                    {#if viewTvbetFrame}
                        <div bind:this={tvbetFrameContainer} class="tvbet-container"></div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    /* Estilos para asegurar que TvbetFrame ocupe solo el espacio del modal-body */
    :global(.modal.screenGames) {
        z-index: 9999 !important;
    }
    
    :global(.modal.screenGames .modal-dialog) {
        position: relative !important;
        z-index: 10000 !important;
    }
    
    :global(.modal.screenGames .modal-content) {
        position: relative !important;
        z-index: 10001 !important;
        display: flex !important;
        flex-direction: column !important;
    }
    
    :global(.modal.screenGames .modal-header) {
        position: relative !important;
        z-index: 10002 !important;
        flex-shrink: 0 !important;
    }
    
    :global(.modal.screenGames .modal-body) {
        position: relative !important;
        z-index: 10001 !important;
        flex: 1 !important;
        overflow: hidden !important;
        padding: 0 !important;
    }
    
    .tvbet-container {
        width: 100% !important;
        height: 100% !important;
        position: relative !important;
        overflow: hidden !important;
    }
    
    /* Estilos específicos para elementos internos de TvbetFrame */
    :global(.modal.screenGames .modal-body iframe) {
        width: 100% !important;
        height: 100% !important;
        border: none !important;
        position: relative !important;
        z-index: 1 !important;
    }
    
    /* Asegurar que cualquier elemento creado por TvbetFrame no escape del contenedor */
    :global(.tvbet-container *) {
        max-width: 100% !important;
        max-height: 100% !important;
    }
     
    /* Prevenir que elementos con position fixed escapen del modal */
    :global(.tvbet-container [style*="position: fixed"]) {
        position: absolute !important;
    }
</style>
