<script>
    import { watchResize } from "svelte-watch-resize";

    export let open;
    export let platform;
    export let url_game;
    export let updateBalance;

    let loadIframe = true;
    let heightModal;

    const resizeHeightModal = () => { heightModal = visualViewport.height; }
    
    function statusModal(isActive) {
        const body = document.body.classList;
        isActive ? body.add("modal-open"):body.remove("modal-open");
        loadIframe = true;
    }

    const lockTouchZoom = (e) => { if (e.touches.length > 1) e.preventDefault(); }

    const closeModal = () => { updateBalance(); open = false; }

    $: statusModal(open);
</script>
{#if open}
    <div class="modal screenGames" on:touchstart={lockTouchZoom} on:touchmove={lockTouchZoom} on:scroll={resizeHeightModal}>
        <div class="modal-dialog">
            <div class="modal-content" use:watchResize={resizeHeightModal} style="height:{heightModal}px">
                <div class="modal-header">
                    <button class="btn close" on:click={closeModal} />
                    <img src="https://assets.apiusoft.com/{platform}/logo.png" alt="logo-{platform}">
                    <div/>
                </div>
                <div class="modal-body">
                    {#if loadIframe}
                        <b class="loading"><b><b></b></b></b>
                    {/if}
                    <iframe on:load={()=>{loadIframe = false;}} width="100%" height="100%" src={url_game} frameborder="0" title="modalGame"></iframe>
                </div>
            </div>
        </div>
    </div>
{/if}