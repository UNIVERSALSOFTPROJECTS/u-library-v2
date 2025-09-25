<script>
    export let user;
    export let theme;
    export let idiom;

    console.log("user horses",user);
    
    let loadIframe = true;
    let url = `https://universalrace.net/new/cliente_api/apisoft_home.php?tk=${user.token}&ba=${user.balance}&lang=${idiom}&theme=${theme}`;

</script>

<div class="horses-page">
{#if loadIframe}
    <b class="loading"><b><b></b></b></b>   
{/if}
    <iframe on:load={()=>{loadIframe = false;}}  src={url}  width="100%" frameborder="0" title="horsesIframe"></iframe>
</div>