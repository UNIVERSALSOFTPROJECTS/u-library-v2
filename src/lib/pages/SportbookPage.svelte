<script>
	import DigtainSportBook from './../sportbooks/DigtainSportBook.svelte';
  import { onDestroy, onMount } from "svelte";
  import ut from '../../js/util';
  import backend from '../../js/server'
  import { Client } from '@stomp/stompjs';
  import utils from '../../js/util';


  export let userState;
  export let active_view
  export let user;
  export let options;
  export let loginModalOpen;
  export let GAMEAPI_URL;
  export let GAME_JAVA_API_URL;
  export let lang = 'es';
  export let CLIENT_CODE;

  let sportbookGameUrl = '';
  let mode = ut.isMobile() ? "mb" : "wb";
  let deviceiframe = mode;
  let page = active_view == "sportbooklive" ? "live" : "sport";
  let internalPage = active_view == "sportbooklive" ? "live" : "preMatch"

  const edg_id = "8042022_digitain";
  const wt_id = "wintech_gaming";
  const nvb_id = "novusbet";
  const bbq_id = "sport-betbuq";
  const pnc_id = "902-pinnacle";
  const bw3_id = "betsw3_2024";
  const panda_id = "1_SBO_1053_ThirdPartySportsBook";
  const AFB_id = "0_SBO_1015_ThirdPartySportsBook";
  //const guestURLbetw3 = "https://sports.jbets.online/#/?target=hipicasbabieca-86224-integration&token=123456789";
  //const guestURLbetw3Live = "https://sports.jbets.online/#/live_ecuabets?target=hipicasbabieca-86224-integration&token=123456789";
  
  const guestURLbetw3GWLive="https://sports.jcasino.live/?target=86224&name=betsson3#/?target=betsson3-86224-integration&view=live"
  const guestURLbetw3GW="https://sports.jcasino.live/?target=86224&name=betsson3#/?target=betsson3-86224-integration&view=prematch"
  const guestURLbetw3LJLiveMobile ="https://mbetsamerica.betsw3.win/live/Soccer/?auth_token=78140-504cb28edad6ad2f4fcff5d0b4b9"
  const guestURLbetw3LJMobile= "https://mbetsamerica.betsw3.win/prematch/Soccer/?auth_token=78140-504cb28edad6ad2f4fcff5d0b4b9"
  const guestURLbetw3LJ = "https://betsamerica.betsw3.win/#/sport/?lang=spa&auth_token=78140-504cb28edad6ad2f4fcff5d0b4b9&type=0"
  const guestURLbetw3LJLive ="https://betsamerica.betsw3.win/#/sport/?lang=spa&auth_token=78140-504cb28edad6ad2f4fcff5d0b4b9&type=1"
  const guestURLbetw3PRLS = "https://sports.jcasino.live/?target=86224&name=parleysport#/?target=parleysport-86224-integration&token=123456789";
  const guestURLbetw3 = "https://sports.jbets.online/?target=86224&name=bets365#/?target=bets365-86224-integration&token=123456789";
  const guestURLbetw3LivePRLS = "https://sports.jcasino.live/?target=86224&name=parleysport#/live_ecuabets/?target=parleysport-86224-integration&token=123456789";
  const guestURLbetw3Live = "https://sports.jbets.online/?target=86224&name=bets365#/live_ecuabets/?target=bets365-86224-integration&token=123456789";
  const guestURLpinnacle = "https://wngcxtx.oreo88.com/en/standard/home"
  const guestURLdigtain = `${GAMEAPI_URL}/e-digtain/init?t=-&gameid=${edg_id}&m=${deviceiframe}&skin=generic&`;
  const guestURLBBQ = `${GAME_JAVA_API_URL}/betbuq/opengame?gameid=${bbq_id}&m=${deviceiframe}`;
  const baseUrlWintech ='https://betslip.sportsapi.la/mainbk/betslip';
  const baseUrlNovusbet = `https://www.3p.latinsport21.net/${page}?lang=es-ES`;
  const games = {
    'digtain':{
      provider: "edg",
      brand: "Digtain Sports Book",
      gameid: edg_id,
      mode,
    },
    'bbq':{
      provider: "plq",
      brand: "BetBuq",
      gameid: bbq_id,
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
    },
    'pinnacle':{
      gameid: pnc_id,
      provider: "pnc",
      brand: "Pinnacle",
      mode,
      id: 124761
    },
    'BetW3':{
      gameid: bw3_id,
      provider: "betsw3",
      brand: "BETSW3",
      mode,
      id: 125072
    },
    'PandaSport':{
      gameid: panda_id,
      provider: "sbobet",
      brand: "PANDASPORTS",
      mode,
      id: 21401
    },
    'AFBsports' : {
      gameid: AFB_id,
      provider: "sbobet",
      brand: "AFB SPORTS",
      mode,
      id: 18500
    },
  }
  
  onMount(()=>{
    console.log("lang", lang)
    window.addEventListener("message", receiveMessage, false);
    console.log("receiveMessage:", receiveMessage);
  });

  $: {
    openSport();
  }

  const receiveMessage = (event) => {
    if (event.data == "onNologinBet") {
      loginModalOpen = true;
      
    }
    console.log("estado:", loginModalOpen);
  };

  async function openSport() {
    if (options.gameid == edg_id)openDigtain();
    else if (options.gameid == wt_id) openWintech();
    else if (options.gameid == nvb_id) openNovusbet();
    else if (options.gameid == bbq_id) openBBQ();
    else if (options.gameid == pnc_id) openPinnacle();
    else if (options.gameid == bw3_id) openBetsW3();
    else if (options.gameid == panda_id) openPandaSport();
    else if (options.gameid == AFB_id) openAFBsports();
  }

  const openPinnacle = async () => { 
    let url =userState == "loggedIn"? ut.getGameURLTest(GAMEAPI_URL, games.pinnacle, options.gameToken) : guestURLpinnacle;
    if (userState == "loggedIn"){
      url += active_view == "sportbooklive" ? "&sport_view=" : "&sport_view=sports";
      url += `&lang=${lang}&r=url`;
      const {data} = await backend.game.getURL(url);
      url = data.url
    }
    sportbookGameUrl = url;
  }

  const openBetsW3 = async () => { 
    let url;
    console.log(CLIENT_CODE,"code");
    if (userState == "loggedIn") {
      url = ut.getGameURL(GAMEAPI_URL, games.BetW3, options.gameToken); 
      url += active_view == "sportbooklive" ? "&sport_view=live" : "&sport_view=sport";
      url += `&lang=${lang}&r=url`;
      const data = await backend.game.getURL(url);
      url = data.url;      
    } else  {
      if (CLIENT_CODE == 'BPEN'|| CLIENT_CODE == 'BUSD') {
        url = active_view == "sportbooklive" ? guestURLbetw3Live : guestURLbetw3; 
        }
        else if (CLIENT_CODE == "GAWN") {
          console.log("sportbookliveGANW");
          
          url = active_view == "sportbooklive" ? guestURLbetw3GWLive : guestURLbetw3GW;
        }
        else if (CLIENT_CODE == "PRLS") {
        url = active_view == "sportbooklive" ? guestURLbetw3LivePRLS : guestURLbetw3PRLS;
      }
      else{
        if(utils.isMobile()){
          url=active_view == "sportbooklive" ? guestURLbetw3LJLiveMobile: guestURLbetw3LJMobile;
        } else {
          url =active_view == "sportbooklive" ? guestURLbetw3LJLive: guestURLbetw3LJ;
        } 

      }
      console.log("url",url);
      
    }
    console.log("Sportbook", url);
    sportbookGameUrl = url;
  }

  const openBBQ = async () => { 
    let url =userState == "loggedIn"? ut.getGameURL(GAMEAPI_URL, games.bbq, options.gameToken) : guestURLBBQ;
    url += active_view == "sportbooklive" ? "&page=live" : "&page=sport";
    url += `&lang=${lang}&r=url`;
    const {data} = await backend.game.getURL(url);
    url = data.url 
    sportbookGameUrl = url;
  }

  const openDigtain = async () => {
    let url =userState == "loggedIn"? ut.getGameURL(GAMEAPI_URL, games.digtain, options.gameToken) : guestURLdigtain;
    url += active_view == "sportbooklive" ? "&currentgame=live" : "&currentgame=PreMatch";
    url += `&lang=${lang}`;
    console.log("openDigtainOptions", options);
    if(options.eventInfo){
      const eventInfo=JSON.stringify(mode == "wb"?options.eventInfo:options.eventInfo.Id);
      url += "&eventInfo=" +eventInfo;
    }
    sportbookGameUrl = url;
    console.log("url", sportbookGameUrl);
    
  };

  const openWintech = async () => {
    let url = userState == "loggedIn"? ut.getGameURL(GAMEAPI_URL, games.wintech, options.gameToken) : baseUrlWintech;
    url += active_view == "sportbooklive" ? "&currentgame=live" : "";
    if (userState == "loggedIn"){
      const {data} = await backend.game.getURL(url);
      url = data.url
    }
   sportbookGameUrl = url;
  };

  const openNovusbet = async () => {
    let url = userState == "loggedIn"? ut.getGameURL(GAMEAPI_URL, games.novusbet, options.gameToken) : baseUrlNovusbet;
    url += active_view == "sportbooklive" ? "&page=live" : "&page=sport";
    if (userState == "loggedIn"){
      const data = await backend.game.getURL(url);
      url = data.url
    }
    sportbookGameUrl = url;
  };
  
  onDestroy(async () => {
    let {data} = await backend.users.getBalance(user.agregatorToken);
    user.balance = data.balance;
    document.body.style.overflow="scroll";
  })
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
