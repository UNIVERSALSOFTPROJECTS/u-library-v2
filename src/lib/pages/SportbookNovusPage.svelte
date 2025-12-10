<script>
  import { onDestroy, onMount } from "svelte";
  import ut from '../../js/util';
  import backend from '../../js/server'

  export let userState;
  export let active_view
  export let user;
  export let options;
  export let GAMEAPI_URL;
  
  console.log(user,"sportbook");

  let sportbookGameUrl = '';
  let mode = ut.isMobile() ? "mb" : "wb";
  let page = active_view == "sportbooklive" ? "live" : "sport";

  
  const nvb_id = "novusbet";

  const baseUrlNovusbet = `https://www.3p.latinsport21.net/${page}?lang=es-ES`;
  const games = {
    gameid: nvb_id,
    provider: "nvb",
    brand: "Novus Bet",
    mode
  }
  
  onMount(()=>{
    openNovusbet();
  });


  const openNovusbet = async () => {
    console.log("OPTIONS CONTAINS....: ", JSON.stringify(options));
    let url = userState == "loggedIn"? ut.getGameURL(GAMEAPI_URL, games, options.gameToken) : baseUrlNovusbet;
    console.log("ESTA ES LA URL...: ", JSON.stringify(url));
    url += active_view == "sportbooklive" ? "&page=live" : "&page=sport";
    if (userState == "loggedIn"){
      const data = await backend.game.getURL(url);
      url = data.URL
    }
    sportbookGameUrl = url;
  };
  
  onDestroy(async () => {
    let {data} = await backend.users.getBalance(user.agregatorToken);
    user.balance = data.balance;
    document.body.style.overflow="scroll";
  });
</script>

<div class="sportbook-content">
  <iframe class="sportbook-iframe" id="sportbook-iframe" title="" src={sportbookGameUrl} frameborder="0" />
</div>

<style>
  @media only screen and (max-width: 1199px) {
    .sportbook-content{
      width: 100%;
    }
    .sportbook-iframe {
      height: 100vh;
      width: 100%;
    } 
  }
  @media only screen and (min-width: 1200px) {
    .sportbook-content{
      width: 98.9vw;
    }
    .sportbook-iframe {
      width: 100%;    
      height: 100vh;
    }
  }
</style>
