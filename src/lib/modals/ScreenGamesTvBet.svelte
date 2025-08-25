<script>
    import { onDestroy, onMount } from "svelte";
    import { watchResize } from "svelte-watch-resize";
    import { assetsUrl } from "../../js/utils/assetsUtils";
    import { isMobileSafari } from 'mobile-device-detect';

    export let open;
    export let platform;
    export let updateBalance;
    
    // Props para TvBet - puedes usarlas directamente o a través de options_launch
    export let language = 'en';
    export let clientId = '';
    export let token = '';
    export let server = '';
    export let gameId = '';
    export let options_launch = null;

    let loadTvbetFrame = false;
    let isFullscreen = false;
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
            loadTvbetFrame = false;
            
            // Limpiar instancia y contenedor
            if (tvbetFrameContainer) {
                tvbetFrameContainer.innerHTML = '';
            }
            if (tvbetFrameInstance) {
                tvbetFrameInstance = null;
            }
            
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
        loadTvbetFrame = true;
        
        if (tvbetFrameContainer) {
            tvbetFrameContainer.innerHTML = '';
        }
        
        if (tvbetFrameInstance) {
            tvbetFrameInstance = null;
        }
        
        setTimeout(() => {
            initTvbetFrame();
        }, 200);
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
        } else if (messageEvent === 'reload') {
            console.log('[TvbetFrame message] Evento recibido: reload');
        } else {
            console.log('[TvbetFrame message] Evento desconocido:', messageEvent);
        }
    }

    function initTvbetFrame() {
        // @ts-ignore
        if (tvbetFrameContainer && window.TvbetFrame && tv_clientId && tv_token) {
            console.log("Initializing TvbetFrame...");
            loadTvbetFrame = true;
            
            // Limpiar contenedor antes de inicializar
            tvbetFrameContainer.innerHTML = '';
            
            try {
                // @ts-ignore
                tvbetFrameInstance = new window.TvbetFrame({
                    lng: tv_language,
                    clientId: tv_clientId,
                    tokenAuth: tv_token,
                    server: tv_server,
                    singleGame: tv_gameId
                });
                
                console.log("TvbetFrame instance created successfully");
                
                // Dar tiempo para que se cree el iframe y luego ocultar loading
                setTimeout(() => {
                    loadTvbetFrame = false;
                }, 1000);
                
            } catch (error) {
                console.error("Error creating TvbetFrame instance:", error);
                loadTvbetFrame = false;
            }
        } else {
            console.warn("TvbetFrame initialization failed - missing dependencies:", {
                container: !!tvbetFrameContainer,
                TvbetFrame: !!window.TvbetFrame,
                clientId: !!tv_clientId,
                token: !!tv_token
            });
        }
    }

    function loadTvbetFrameScript() {
        console.log("Loading TvbetFrame script...--------------------");
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
        // Configurar variables desde props directas o options_launch
        if (options_launch) {
            tv_language = options_launch.options.language || 'en';
            tv_clientId = options_launch.options.clientId;
            tv_token = options_launch.options.token;
            tv_server = options_launch.options.server;
            tv_gameId = options_launch.options.gameId;
        } else {
            tv_language = language || 'en';
            tv_clientId = clientId;
            tv_token = token;
            tv_server = server;
            tv_gameId = gameId;
        }
        
        console.log("TvbetFrame config:", { tv_language, tv_clientId, tv_server, tv_gameId });
        window.addEventListener('resize', resizeHeightModal); 
        window.addEventListener('message', handleMessage);
        
        // Cargar el script de TvbetFrame
        try {
            console.log("Loading TvbetFrame script...");
            await loadTvbetFrameScript();
        } catch (error) {
            console.error('Error loading TvbetFrame script:', error);
        }
    });
    
    onDestroy(() => {
        window.removeEventListener('resize', resizeHeightModal);
        window.removeEventListener('message', handleMessage);
        
        // Limpiar completamente
        if (tvbetFrameContainer) {
            tvbetFrameContainer.innerHTML = '';
        }
        if (tvbetFrameInstance) {
            tvbetFrameInstance = null;
        }
        
        console.log("Cleaned up event listeners and TvbetFrame instance");
    });

    // Reactive statement para inicializar TvbetFrame cuando el modal se abre
    $: statusModal(open);
    $: if (open && tvbetFrameContainer && window.TvbetFrame && !tvbetFrameInstance) {
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
                        <div class="loading-container">
                            <b class="loading"><b><b></b></b></b>
                            <p>Cargando juego...</p>
                        </div>
                    {/if}
                    <div bind:this={tvbetFrameContainer} class="tvbet-container" id="tvbet-game"></div>
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

    #tvbet-game {
        border: 1px solid purple !important;
        width: 100% !important;
        height: 100% !important;
    }
    
    .loading-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        z-index: 10;
    }

</style>
