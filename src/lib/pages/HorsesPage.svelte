<script>
    import { onDestroy, onMount } from "svelte";
    import { watchResize } from "svelte-watch-resize";

    export let user;
    export let theme;
    export let t;

    let heightModal;
    let heightBlockSum = 0;
    let loadIframe = true;

    function detectBlockSum() {
        let header = document.getElementById("user-header");
        let navbar = document.getElementById("navbar-container");
        if (header && navbar) {
            heightBlockSum =  header.offsetHeight + navbar.offsetHeight;
        }else {
            heightBlockSum = 164;
        }
        return heightBlockSum;
    }

    if (!user) {
        window.location.href = `${window.location.protocol}//${window.location.hostname}`;
    }


    const resizeHeightModal = () => { heightModal = visualViewport.height - detectBlockSum(); }// header + menucategory

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