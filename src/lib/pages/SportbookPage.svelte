<script>
	import DigtainSportBook from './../sportbooks/DigtainSportBook.svelte';
  import { onDestroy, onMount } from "svelte";
  import ut from '../../js/util';
  import backend from '../../js/server'

  export let userState;
  export let active_view
  export let user;
  export let options;
  export let loginModalOpen;
  export let GAMEAPI_URL;
  export let clientCode;

  let sportbookGameUrl = '';
  let mode = ut.isMobile() ? "mb" : "wb";
  let deviceiframe = mode;
  let page = active_view == "sportbooklive" ? "live" : "sport";
  let internalPage = active_view == "sportbooklive" ? "live" : "preMatch"

  const edg_id = "8042022_digitain";
  const wt_id = "wintech_gaming";
  const nvb_id = "novusbet";
  const guestURLdigtain = `${GAMEAPI_URL}/e-digtain/init?t=-&lang=es&gameid=${edg_id}&m=${deviceiframe}&skin=generic`;
  const baseUrlWintech ='https://betslip.sportsapi.la/mainbk/betslip';
  const baseUrlNovusbet = `https://www.3p.latinsport21.net/${page}?lang=es-ES`;
  const games = {
    'digtain':{
      provider: "edg",
      brand: "Digtain Sports Book",
      gameid: edg_id,
      mode,
    },
    'wintech':{
      gameid: wt_id,
      provider: "wt",
      brand: "WinTech",
      mode,
      page:active_view
    },
    'novusbet':{
      gameid: nvb_id,
      provider: "nvb",
      brand: "Novus Bet",
      mode
    }

  }
  
  onMount(()=>{
    window.addEventListener("message", receiveMessage, false);
    document.body.style.overflow="hidden";
  });

  $: {
    openSport();
  }

  const receiveMessage = (event) => {
    if (event.data == "onNologinBet") {
      loginModalOpen = true;
    }
  };

  async function openSport() {
    if (options.gameid == edg_id)openDigtain();
    else if (options.gameid == wt_id) openWintech();
    else if (options.gameid == nvb_id) openNovusbet();
  }

   const openDigtain = async () => {
    let url =userState == "loggedIn"? ut.getGameURL(GAMEAPI_URL, games.digtain, options.gameToken) : guestURLdigtain;
    url += active_view == "sportbooklive" ? "&currentgame=live" : "&currentgame=PreMatch";
    if(options.eventInfo){
      const eventInfo=JSON.stringify(mode == "wb"?options.eventInfo:options.eventInfo.Id);
      url += "&eventInfo=" +eventInfo;
    }
    sportbookGameUrl = url;
  };

  const openWintech = async () => {
    let url = userState == "loggedIn"? ut.getGameURL(GAMEAPI_URL, games.wintech, options.gameToken) : baseUrlWintech;
    url += active_view == "sportbooklive" ? "&currentgame=live" : "";
    sportbookGameUrl = url;
  };

  const openNovusbet = async () => {
    let url = userState == "loggedIn"? ut.getGameURL(GAMEAPI_URL, games.novusbet, options.gameToken) : baseUrlNovusbet;
    url += active_view == "sportbooklive" ? "&page=live" : "&page=sport";
    if (userState == "loggedIn"){
      const {data} = await backend.game.getURLNovus(url);
      url = data.url
    }
    console.log("sportbookNovus: ", url);
    sportbookGameUrl = url;
  };
  
  onDestroy(async () => {
    let {data} = await backend.users.getBalance(user.agregatorToken);
    user.balance = data.balance;
    document.body.style.overflow="scroll";
  })

</script>

<div class="sportbook-content">
  {#if options.gameid == edg_id}
    <DigtainSportBook
      {user}
      bind:loginModalOpen
      bind:clientCode
      bind:options
      bind:internalPage
    />
  {:else}
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
