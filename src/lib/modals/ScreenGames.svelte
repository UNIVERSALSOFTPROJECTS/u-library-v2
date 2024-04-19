<script>
    import { onDestroy, onMount } from "svelte";
    import { watchResize } from "svelte-watch-resize";
    import { isMobileSafari } from 'mobile-device-detect';

    export let open;
    export let platform;
    export let url_game;
    export let updateBalance;

    let loadIframe = true;
    let isFullscreen = false;
    let heightModal;

    const resizeHeightModal = () => { heightModal = visualViewport.height; }
    
    function statusModal(isActive) {
        const body = document.body.classList;
        isActive ? body.add("modal-open"):body.remove("modal-open");
        loadIframe = true;
    }

    const lockTouchZoom = (e) => { if (e.touches.length > 1) e.preventDefault(); }

    const closeModal = () => { 
        updateBalance();
        if (document.fullscreenElement != null) toggleFullscreen();
        open = false;
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

    onMount(() => { window.addEventListener('resize', resizeHeightModal); });
    onDestroy(() => { window.removeEventListener('resize', resizeHeightModal); });

    $: statusModal(open);
</script>
{#if open}
    <div class="modal screenGames" on:touchstart={lockTouchZoom} on:touchmove={lockTouchZoom} on:scroll={resizeHeightModal}>
        <div class="modal-dialog">
            <div class="modal-content {isFullscreen?'fullscreen':''}" use:watchResize={resizeHeightModal} style="height:{heightModal}px">
                <div class="modal-header">
                    <button class="btn close" on:click={closeModal} />
                    <img src="https://assets.apiusoft.com/{platform}/logo.png" alt="logo-{platform}">
                    <button class="btn screen {isFullscreen?'full':''}" on:click={toggleFullscreen} hidden={isMobileSafari}></button>
                </div>
                <div class="modal-body">
                    {#if loadIframe}
                        <b class="loading"><b><b></b></b></b>
                    {/if}
                    <!-- <iframe on:load={()=>{loadIframe = false;}} width="100%" height="100%" src={url_game} frameborder="0" title="modalGame"></iframe> -->
                    <iframe on:load={()=>{loadIframe = false;}} width="100%" height="100%" src="https://apiuniversalsoft.com/api/launch?gameid=vs25wolfgold&p=pg&b=Pragmatic Play&m=wb&sessionid=1744573509896c0n3s2rpqqjnlorjyqm3a0zrtqohgj8ocxsaiisdtrfdcaa1ll44ayics1ymocgdd1epmvhwqwfyrksmapexkp3x38qbdo9o6pvtqk78nuu3bj6ugmpbzwfnpecrf38x" frameborder="0" title="modalGame"></iframe>
                </div>
            </div>
        </div>
    </div>
    {/if}