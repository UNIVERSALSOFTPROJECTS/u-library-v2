<script>
    import { onDestroy, onMount } from "svelte";
    import { watchResize } from "svelte-watch-resize";
    import { assetsUrl } from "../../js/utils/assetsUtils";
    import { isMobileSafari } from 'mobile-device-detect';

    export let open;
    export let platform;
    export let url_game;
    export let updateBalance;

    let loadIframe = true;
    let isFullscreen = false;
    let viewIframe = true;
    let heightModal;
    let iframeScreenGame;

    const resizeHeightModal = () => { heightModal = visualViewport.height; }
    
    function statusModal(isActive) {
        const body = document.body.classList;
        isActive ? body.add("modal-open"):body.remove("modal-open");
        loadIframe = true;
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

 

    const reloadIframe = () => { 
        viewIframe = false;
        loadIframe = true;
        setTimeout(() => { viewIframe = true;}, 100);
    }
   
    const toggleFullscreen = () => {
       setTimeout(() => { resizeHeightModal(); }, 100);
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
        if (!iframeScreenGame || !iframeScreenGame.contentWindow || !url_game) {
            return;
        }
        if (event.source !== iframeScreenGame.contentWindow) return;

           const { event: messageEvent } = event.data;

        if (messageEvent === 'exit') {
        console.log('[iframe message] Evento recibido: exit');
        } else if (messageEvent === 'reload') {
        console.log('[iframe message] Evento recibido: reload');
        } else {
        console.log('[iframe message] Evento desconocido:', messageEvent);
        }
    }

    onMount(() => {
        //window.addEventListener('message', receiveMessage, false);
        window.addEventListener('resize', resizeHeightModal); 
        window.addEventListener('message', handleMessage);
    });
    
    onDestroy(() => {
        //window.removeEventListener('message', receiveMessage);
        window.removeEventListener('resize', resizeHeightModal);
        window.removeEventListener('message', handleMessage);
        console.log("Cleaned up event listeners");
    });


    $: statusModal(open);
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
                        <button class="btn reload" on:click={reloadIframe}></button>
                        <button class="btn screen {isFullscreen?'full':''}" on:click={toggleFullscreen} hidden={isMobileSafari}></button>
                    </div>
                </div>
                <div class="modal-body">
                    {#if loadIframe}
                        <b class="loading"><b><b></b></b></b>
                    {/if}
                    {#if viewIframe}
                        <iframe  bind:this={iframeScreenGame}  on:load={()=>{loadIframe = false;}} width="100%" height="100%" src={url_game} frameborder="0" title="modalGame"></iframe>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}