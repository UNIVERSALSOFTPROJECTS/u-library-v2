<script>
  import { onDestroy, onMount } from "svelte";

  export let userState;
  export let sportbookGameUrl = "";
  export let active_view
  export let user;
  export let options;
  export let loginModalOpen;
  export let GAMEAPI_URL;
  export let GAME_TOKEN;
  export let getGameUrl
  export let mode;

  let deviceiframe = mode;
  let page = active_view == "sportbooklive" ? "live" : "sport";

  const edg_id = "8042022_digitain";
  const wt_id = "wintech_gaming";
  const nvb_id = "novusbet";
  const baseUrlDigtain = `${GAMEAPI_URL}/e-digtain/init?t=-&lang=es&gameid=8042022_digitain&m=${deviceiframe}`;
  const baseUrlWintech ='https://betslip.sportsapi.la/mainbk/betslip';
  const baseUrlNovusbet = `https://www.3p.latinsport21.net/${page}?lang=es-ES`;
  
  onMount(()=>{
    window.addEventListener("message", receiveMessage, false);
    document.body.style.overflow="hidden";
  });

  $: {
    openSport();
  }

  async function openSport() {
    if (options.gameid == edg_id)openDigtainSportbook();
    else if (options.gameid == wt_id) openWintechSportbook();
    else if (options.gameid == nvb_id) openNovusbetSportbook();
    console.log("openSport:", sportbookGameUrl);
  }

  const receiveMessage = (event) => {
    if (event.data == "onNologinBet") {
      loginModalOpen = true;
    }
  };

  const openDigtainSportbook = async () => {

    const game = {
      provider: "edg",
      brand: "Digtain Sports Book",
      gameid: edg_id,
      mode: mode,
    };
    
    let url = baseUrlDigtain;
    if (userState == "loggedIn") {
    let gameToken = GAME_TOKEN;
    console.log("gameToken:", gameToken);
    url = getGameUrl;
    if (active_view == "sportbook")url += active_view == "sportbook" ? "&currentgame=preMatch" : "";
    else if (active_view == "sportbooklive")url += active_view == "sportbooklive" ? "&currentgame=live" : "";
    if (options.eventInfo && mode == "wb")url += "&eventInfo=" + JSON.stringify(options.eventInfo);
    else if (options.eventInfo && mode == "mb")url += "&eventInfo=" + JSON.stringify(options.eventInfo.Id);
    } else {
      if (active_view == "sportbooklive")url += active_view == "sportbooklive" ? "&currentgame=live" : "&currentgame=Home";
    }
    sportbookGameUrl = url;
  };

  const openWintechSportbook = async () => {
    const game = {
      gameid: wt_id,
      provider: "wt",
      brand: "WinTech",
      mode: mode,
      page:active_view
    };
    let url = baseUrlWintech;
    if (userState == "loggedIn") {
      let gameToken = GAME_TOKEN;
      url = getGameUrl;
      if (active_view == "sportbook")url += active_view == "sportbook" ? "&currentgame=preMatch" : "";
      else if (active_view == "sportbooklive")url += active_view == "sportbooklive" ? "&currentgame=live" : "";
    } else {
      if (active_view == "sportbooklive")url += active_view == "sportbooklive" ? "&currentgame=live" : "&currentgame=Home";
    }
    sportbookGameUrl = url;
  };

  const openNovusbetSportbook = async () => {
    const game = {
      gameid: nvb_id,
      provider: "nvb",
      brand: "Novus Bet",
      mode: mode,
    };
    let url = baseUrlNovusbet;
    if (userState == "loggedIn") {
      let gameToken = GAME_TOKEN;
      url = getGameUrl;
      if (active_view == "sportbook")url += active_view == "sportbook" ? "&currentgame=preMatch" : "";
      else if (active_view == "sportbooklive")url += active_view == "sportbooklive" ? "&currentgame=live" : "";
    } else {
      if (active_view == "sportbooklive")url += active_view == "sportbooklive" ? "&currentgame=live" : "&currentgame=Home";
    }
    sportbookGameUrl = url;
  };
  
  onDestroy(async () => {
    //let data = await backend.getBalance(user.agregatorToken);
    //user.balance = data.balance;
  })

</script>

<div class="sportbook-content">
  {#if sportbookGameUrl != ""}
    <iframe class="sportbook-iframe" id="sportbook-iframe" title="" src={sportbookGameUrl} frameborder="0" />
  {/if}
</div>

<style>
  @media only screen and (max-width: 1200px) {
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
      width: 100vw;
    }
    .sportbook-iframe {
      width: 100vw;    
      height: 100vh;
    }
  }
</style>
