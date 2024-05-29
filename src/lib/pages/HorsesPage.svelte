<script>
    import { onDestroy, onMount } from "svelte";
    import { watchResize } from "svelte-watch-resize";

    export let user;
    export let theme;
    export let t;

    let heightModal;
    let loadIframe = true;

    const resizeHeightModal = () => { heightModal = visualViewport.height - 164; }// header + menucategory

    let url = `https://universalrace.net/new/cliente_api/apisoft_home.php?tk=${user.token}&ba=${user.balance}&lang=${t("idiom")}&theme=${theme}`;

    onMount(() => { window.addEventListener('resize', resizeHeightModal); });
    onDestroy(() => { window.removeEventListener('resize', resizeHeightModal); });
</script>

<div class="page" use:watchResize={resizeHeightModal}>
{#if loadIframe}
    <b class="loading"><b><b></b></b></b>
{/if}
    <iframe on:load={()=>{loadIframe = false;}} style="height:{heightModal+"px"}"  src={url}  width="100%" frameborder="0" title="horsesIframe"></iframe>
</div>