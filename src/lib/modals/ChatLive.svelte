<script>
    export let chatLiveUrl;
    let loadIframe = true;
</script>
<div class="modal-body">
    {#if loadIframe}
    <div class="loading"><p/><p/><p/></div>
    {/if}
    <iframe style="display:{loadIframe?'none':'block'}" src={chatLiveUrl} frameborder="0" title="Chat Live" on:load={()=>{loadIframe = false;}}></iframe>
</div>
