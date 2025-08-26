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
    $: frameId = '';

    let counterSetInterval = 0;

    const resizeHeightModal = () => { heightModal = visualViewport.height; }
    
    function statusModal(isActive) {
        const body = document.body.classList;
        isActive ? body.add("modal-open"):body.remove("modal-open");
        loadTvbetFrame = true;
    }

    const lockTouchZoom = (e) => { if (e.touches.length > 1) e.preventDefault(); }

    function receiveMessage(event) {
        if (event.data === "luckyspins_exit_game" || event.data === "adm_exit_game") {
            closeModal();
        } else {
            console.log("Unknown message received:", event.data);
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

 

    const reloadTvbetFrame = () => { 
        viewTvbetFrame = false;
        loadTvbetFrame = true;
        setTimeout(() => { 
            viewTvbetFrame = true;
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

    function initTvbetFrame() {
        // @ts-ignore
        if (tvbetFrameContainer && window.TvbetFrame) {
            tvbetFrameContainer.innerHTML = '';            
            let params_tvbet = {
                lng: options_launch.options.language || 'en',
                clientId: options_launch.options.clientId,
                tokenAuth: options_launch.options.token,
            };
            if('fast_server' in options_launch.options){
                params_tvbet.floatTop = '#fTop' ;
                params_tvbet.containerId = 'sport-game' ;
                params_tvbet.game_id = options_launch.options.gameId ;
                params_tvbet.server= options_launch.options.fast_server ;
                $: frameId = 'sport-game';
            }else{
                params_tvbet.singleGame= options_launch.options.gameId ;
                params_tvbet.server= options_launch.options.server ;
                $: frameId = 'tvbet-game';
            }
            // @ts-ignore
            tvbetFrameInstance = new window.TvbetFrame(params_tvbet);
            const removeMinHeight = () => {
                const iframe = document.getElementById('tvbet-iframe');
                if (iframe) {
                    iframe.style.minHeight = ''; 
                    counterSetInterval++;  
                    if (counterSetInterval >= 40) clearInterval(intervalId);  
                }
            };
            const intervalId = setInterval(removeMinHeight, 1000);
        }
    }
     function handleMessage(event) {
    
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

    onMount( async() => {       
        window.addEventListener('resize', resizeHeightModal); 
        window.addEventListener('message', handleMessage);        
        // Cargar el script de TvbetFrame
        try {
            await loadTvbetFrameScript();
            if (open) {
                initTvbetFrame();
            }
        } catch (error) {
            console.error("Error loading TvbetFrame script:", error);
        }
    });
    
    onDestroy(() => {
        window.removeEventListener('resize', resizeHeightModal);
        window.removeEventListener('message', handleMessage);
        
        if (tvbetFrameContainer) {
            tvbetFrameContainer.innerHTML = '';
        }
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
                    <div class="iframe-wrapper">
                        {#if frameId === 'sport-game'}
                            <div bind:this={tvbetFrameContainer} on:load={()=>{loadTvbetFrame = false;}} class="tvbet-container" id="sport-game"></div>
                        {:else}
                            <div bind:this={tvbetFrameContainer} on:load={()=>{loadTvbetFrame = false;}} class="tvbet-container" id="tvbet-game"></div>
                        {/if}
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
        overflow: hidden !important; /* asegúrate de que esto esté */
    }
    

    /* Estilos básicos para el iframe */
    :global(.modal.screenGames .modal-body iframe) {
        position: absolute !important;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
        border: none !important;
        z-index: 1 !important;
    }

    .iframe-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .tvbet-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    #tvbet-game,
    #sport-game {
        position: relative !important;
        overflow: hidden !important;
        width: 100% !important;
        height: 100% !important;
        border: 1px solid purple !important;
    }


</style>
