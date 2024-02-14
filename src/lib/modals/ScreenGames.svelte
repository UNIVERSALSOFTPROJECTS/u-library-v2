<script>
    import { watchResize } from "svelte-watch-resize";
    import ServerConnection from "../../js/server";
    export let open;
    export let platform;
    export let user;

    let loadIframe = true;
      
    let heightModal;

    const resizeHeightModal = () => { heightModal = visualViewport.height; }
    

    function statusModal(isActive) {
        const body = document.body.classList;
        isActive ? body.add("modal-open"):body.remove("modal-open");
        loadIframe = true;
    }

    const lockTouchZoom = (e) => { if (e.touches.length > 1) e.preventDefault(); }

    $: statusModal(open);
    const getTokenagg = async () =>{
        console.log("A");
        if (user != null) {
            let gameToken = await ServerConnection.game.authInGame(user.agregatorToken);
            console.log("screenn gamedd", gameToken);
        }
    }
 
    getTokenagg();
</script>
{#if open}
    <div class="modal screenGames" on:touchstart={lockTouchZoom} on:touchmove={lockTouchZoom} on:scroll={resizeHeightModal}>
        <div class="modal-dialog">
            <div class="modal-content" use:watchResize={resizeHeightModal} style="height:{heightModal}px">
                <div class="modal-header">
                    <button class="btn close" on:click={() => (open = false)} />
                    <img src="https://assets.apiusoft.com/{platform}/logo.png" alt="{platform}-logo">
                    <div/>
                </div>
                <div class="modal-body">
                    {#if loadIframe}
                        <b class="loading"><b><b></b></b></b>
                    {/if}
                    <iframe on:load={()=>{loadIframe = false;}} width="100%" height="100%" src="https://apiuniversalsoft.com/api/launch?gameid=vs20fruitsw&p=pg&b=Pragmatic Play&m=wb&sessionid=5276417596997c3wyynru44fx9ra7fphczgeoeq9x9ybrjfkegyi4d171pk2iy4sitvedpfjcb4h4netehivyqlfaoqhjnrexmsbrp5fkoctgy2yfyunfnt39oardicajvtgrq5qkucna" frameborder="0" title="juego"></iframe>
                </div>
            </div>
        </div>
    </div>
{/if}