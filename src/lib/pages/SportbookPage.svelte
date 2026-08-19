<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import ScreenGamesCmsWager from "../modals/ScreenGamesCmsWager.svelte";
  import ut from '../../js/util';
  import backend from '../../js/server'


  export let userState;
  export let active_view
  export let user;
  export let options;
  export let loginModalOpen;
  export let GAMEAPI_URL;
  export let GAME_JAVA_API_URL;
  export let lang = 'es';
  export let CLIENT_CODE;
  export let clientCode;

  const dispatch = createEventDispatcher();

  let sportbookskin = localStorage.getItem("sportbookversion") || "";
  console.log(user,"sportbook");
  

  let sportbookGameUrl = '';
  let guestLaunchResponse = null;
  let authenticatedLaunchResponse = null;
  let cmsWagerLaunchOptions = null;
  let guestLaunchError = "";
  let mode = ut.isMobile() ? "mb" : "wb";
  let page = active_view == "sportbooklive" ? "live" : "sport";
  let internalPage = active_view == "sportbooklive" ? "live" : "preMatch"

  const GUEST_LAUNCH_IFRAME_URL = "iframe_url";
  const GUEST_LAUNCH_CMSWAGER = "cmswager_bootstrap";
  const GUEST_LAUNCH_HOSTED_VIEW_URL = "hosted_view_url";

  const edg_id = "8042022_digitain";
  const wt_id = "wintech_gaming";
  const nvb_id = "novusbet";
  const bbq_id = "sport-betbuq";
  const pnc_id = "902-pinnacle";
  const bw3_id = "betsw3_2024";
  const bw3_v2_id = "betsw3_v2";
  const panda_id = "1_SBO_1053_ThirdPartySportsBook";
  const AFB_id = "0_SBO_1015_ThirdPartySportsBook";
  const frst_id = "first_2024";
  const cmsw_id = "sportbook_cmsw";
  //const guestURLbetw3 = "https://sports.jbets.online/#/?target=hipicasbabieca-86224-integration&token=123456789";
  //const guestURLbetw3Live = "https://sports.jbets.online/#/live_ecuabets?target=hipicasbabieca-86224-integration&token=123456789";
  
  const guestURLbetw3bt1Live="https://sports.jcasino.live/#/live_ecuabets/?target=betsson1-86224-integration&token=123456789"
  const guestURLbetw3bt1="https://sports.jcasino.live/#/?target=betsson1-86224-integration&token=123456789"
  const guestURLbetw3GWLive="https://sports.jcasino.live/?target=86224&name=betsson3#/?target=betsson3-86224-integration&view=live"
  const guestURLbetw3GW="https://sports.jcasino.live/?target=86224&name=betsson3#/?target=betsson3-86224-integration&view=prematch"
  const guestURLbetw3LJ = "https://sports2.sw3data.com/?target=86224&name=betsamerica#/live_ecuabets/?target=betsamerica-86224-integration&token=123456789"
  const guestURLbetw3LJLive ="https://sports2.sw3data.com/?target=86224&name=betsamerica#/?target=betsamerica-86224-integration&token=123456789"
  const guestURLbetw3PRLS = "https://sports.jcasino.live/?target=86224&name=parleysport#/?target=parleysport-86224-integration&token=123456789";
  const guestURLbetw3 = "https://sports2.sw3data.com/?target=86224&name=win365us#/?target=win365us-86224-integration&token=123456789";
  const guestURLbetw3LivePRLS = "https://sports.jcasino.live/?target=86224&name=parleysport#/live_ecuabets/?target=parleysport-86224-integration&token=123456789";
  const guestURLbetw3Live = "https://sports2.sw3data.com/?target=86224&name=win365us#/?target=win365us-86224-integration&token=123456789&view=live";
  const guestURLbetw3LAUS = "https://sports2.sw3data.com/?target=86224&name=latinsport21#/?target=latinsport21-86224-integration&token=123456789";
  const guestURLbetw3LAUSlive = "https://sports2.sw3data.com/?target=86224&name=latinsport21#/live_ecuabets/?target=latinsport21-86224-integration&token=123456789"
  const guestURLbetw3GBPE = "https://sports2.sw3data.com/?target=86224&name=ganabet365#/?target=ganabet365-86224-integration&token=123456789"
  const guestURLbetw3GBPELive = "https://sports2.sw3data.com/?target=86224&name=ganabet365#/?target=ganabet365-86224-integration&token=123456789&view=live"
  const guestURLbetwBPEN = "https://sports2.sw3data.com/#/?target=win365-86224-integration&token=123456789"
  const guestURLbetwBPENLive = "https://sports2.sw3data.com/#/?target=win365-86224-integration&token=123456789&view=live"
  const guestURLbetw3BTCO = "https://sports2.sw3data.com/#/?target=win365-86224-integration&token=123456789"
  const guestURLbetw3BTCOLive = "https://sports2.sw3data.com/#/?target=win365-86224-integration&token=123456789&view=live"
  const guestURLbetw3XLIV = "https://sports2.sw3data.com/?target=86224&name=xlive365#/?target=xlive365-86224-integration&token=123456789"
  const guestURLbetw3XLIVLive = "https://sports2.sw3data.com/?target=86224&name=xlive365#/?target=xlive365-86224-integration&view=live&token=123456789"
  const guestURLbetw3XLIVLiveSKIN2 = "https://sports2.sw3data.com/?target=86224&name=xlivev2#/?target=xlivev2-86224-integration&token=123456789"
  const guestURLbetw3BTAR = "https://sports2.sw3data.com/?target=86224&name=win365ar#/?target=win365ar-86224-integration"
  const guestURLbetw3BTARLive = "https://sports2.sw3data.com/?target=86224&name=win365ar#/?target=win365ar-86224-integration&view=live"
  const guestURLbetw3BPEC = "https://sports2.sw3data.com/?target=86224&name=win365ec#/?target=win365ec-86224-integration"
  const guestURLbetw3BPECLive = "https://sports2.sw3data.com/?target=86224&name=win365ec#/?target=win365ec-86224-integration&view=live"
  const guestURLbetw3GBEC = "https://sports2.sw3data.com/?target=86224&name=ganabet365ec#/?target=ganabet365ec-86224-integration"
  const guestURLbetw3GBECLive ="https://sports2.sw3data.com/?target=86224&name=ganabet365ec#/?target=ganabet365ec-86224-integration&view=live"
  const guestURLacpe1 ="https://sports-frontend.jbets.online/?platformId=6a7f36588bda1906f6e6a993&template=retail1_premium#/?platformId=6a7f36588bda1906f6e6a993&playerToken=&playerId=&userId=6a751396fe02c88d2ac8568f&language=es&platformSkinId=6a7f3e5a8bda1906f6e6a996&userMode=retail"
  const guestURLacpeLive1 ="https://sports-frontend.jbets.online/?platformId=6a7f36588bda1906f6e6a993&template=retail1_premium#/?platformId=6a7f36588bda1906f6e6a993&playerToken=&playerId=&userId=6a751396fe02c88d2ac8568f&language=es&platformSkinId=6a7f3e5a8bda1906f6e6a996&userMode=retail&view=live"
  const guestURLacec1 ="https://sports-frontend.jbets.online/?platformId=6a7f35c28bda1906f6e6a992&template=retail1_premium#/?platformId=6a7f35c28bda1906f6e6a992&playerToken=&playerId=&userId=6a751396fe02c88d2ac8568f&language=es&platformSkinId=6a7f37a58bda1906f6e6a994&userMode=retail"
  const guestURLacecLive1 ="https://sports-frontend.jbets.online/?platformId=6a7f35c28bda1906f6e6a992&template=retail1_premium#/?platformId=6a7f35c28bda1906f6e6a992&playerToken=&playerId=&userId=6a751396fe02c88d2ac8568f&language=es&platformSkinId=6a7f37a58bda1906f6e6a994&userMode=retail&view=live"
  const guestURLacpe2 ="https://sports-frontend.jbets.online/?platformId=6a7f36588bda1906f6e6a993&template=retail2_premium#/?platformId=6a7f36588bda1906f6e6a993&playerToken=&playerId=&userId=6a751396fe02c88d2ac8568f&language=es&platformSkinId=6a7f3e738bda1906f6e6a997&userMode=retail"
  const guestURLacpeLive2 ="https://sports-frontend.jbets.online/?platformId=6a7f36588bda1906f6e6a993&template=retail2_premium#/?platformId=6a7f36588bda1906f6e6a993&playerToken=&playerId=&userId=6a751396fe02c88d2ac8568f&language=es&platformSkinId=6a7f3e738bda1906f6e6a997&userMode=retail&view=live"
  const guestURLacec2 ="https://sports-frontend.jbets.online/?platformId=6a7f35c28bda1906f6e6a992&template=retail2_premium#/?platformId=6a7f35c28bda1906f6e6a992&playerToken=&playerId=&userId=6a751396fe02c88d2ac8568f&language=es&platformSkinId=6a7f37b48bda1906f6e6a995&userMode=retail"
  const guestURLacecLive2 ="https://sports-frontend.jbets.online/?platformId=6a7f35c28bda1906f6e6a992&template=retail2_premium#/?platformId=6a7f35c28bda1906f6e6a992&playerToken=&playerId=&userId=6a751396fe02c88d2ac8568f&language=es&platformSkinId=6a7f37b48bda1906f6e6a995&userMode=retail&view=live"


  const guestURLpinnacle = "https://wngcxtx.oreo88.com/en/standard/home";
  const guestURLdigtain = `${GAMEAPI_URL}/e-digtain/init?t=-&gameid=${edg_id}&m=${mode}&skin=generic&`;
  const guestURLBBQ = `${GAME_JAVA_API_URL}/betbuq/opengame?gameid=${bbq_id}&m=${mode}`;
  const baseUrlWintech ='https://betslip.sportsapi.la/mainbk/betslip';
  const baseUrlNovusbet = `https://www.3p.latinsport21.net/${page}?lang=es-ES`;
  const baseUrlWin365 = `https://prod20370-154306407.freethrow777.com`;
  const baseUrlWin365Cl = `https://prod20370-161018313.freethrow777.com`;
  const baseUrlWin365Mx = `https://prod20370-170517448.freethrow777.com`;
  const baseUrlGanawin = `https://prod20370-169234874.freethrow777.com`;
  // const baseUrlGanabet365 = `https://prod20370-169327015.freethrow777.com`;
  const baseUrlParyajKebek = `https://prod20370-171305761.freethrow777.com`;
  const baseUrlBets286 = `https://prod20370-184927999.freethrow777.com`;
  const baseUrlUniversalRaceURVE = `https://prod20370-186229048.freethrow777.com/`;
  const baseUrlWinproxWINP = `https://prod20370-189834269.442hattrick.com/`;
  const baseUrlEcuFlexBetFBET ='https://prod20370-189834999.442hattrick.com/';
  const baseUrlEcuFlexBetMBET ='https://prod20370-191367006.freethrow777.com';

  const baseUrlHipicasBabiecaHBCO = 'https://prod20370-201498456.freethrow777.com';
  const baseUrlHipicasBabiecaHBVE = 'https://prod20370-201498755.freethrow777.com';
  const baseUrlBetSwingBWDA = 'https://prod20370-201479896.freethrow777.com';
  const baseUrlBetSwingBTSW = 'https://prod20370-201497598.freethrow777.com';

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
    'first':{
      gameid: frst_id,
      provider: "first",
      brand: "FIRST",
      mode,
      id:93326
    }
  }

  const isBetsw3GameId = (gameid) => [bw3_id, bw3_v2_id].includes(gameid);
  const getBetsw3Game = () => ({
    ...games.BetW3,
    gameid: isBetsw3GameId(options?.gameid) ? options.gameid : games.BetW3.gameid,
  });
  const betsw3GuestUrlsByClient = {
    BUSD: { live: guestURLbetw3Live, default: guestURLbetw3 },
    BPEN: { live: guestURLbetwBPENLive, default: guestURLbetwBPEN },
    GAWN: { live: guestURLbetw3GWLive, default: guestURLbetw3GW },
    LAUS: { live: guestURLbetw3LAUSlive, default: guestURLbetw3LAUS },
    PRLS: { live: guestURLbetw3bt1Live, default: guestURLbetw3bt1 },
    GBPE: { live: guestURLbetw3GBPELive, default: guestURLbetw3GBPE },
    BTCO: { live: guestURLbetw3BTCOLive, default: guestURLbetw3BTCO },
    BTAR: { live: guestURLbetw3BTARLive, default: guestURLbetw3BTAR },
    BPEC: { live: guestURLbetw3BPECLive, default: guestURLbetw3BPEC },
    GBEC: { live: guestURLbetw3GBECLive, default: guestURLbetw3GBEC },
  };
  const betsw3V2GuestUrlsByClient = {
    ACPE: {
      "1": { live: guestURLacpeLive1, default: guestURLacpe1 },
      "2": { live: guestURLacpeLive2, default: guestURLacpe2 },
    },
    ACEC: {
      "1": { live: guestURLacecLive1, default: guestURLacec1 },
      "2": { live: guestURLacecLive2, default: guestURLacec2 },
    },
  };
  const resolveBetsw3GuestUrl = (gameid, clientCode, view, skin) => {
    const normalizedClientCode = String(clientCode ?? "").trim().toUpperCase();
    const isLiveView = view == "sportbooklive";
    const normalizedSkin = String(skin ?? "").trim() == "2" ? "2" : "1";

    if (normalizedClientCode == "XLIV" && skin == "2") {
      return guestURLbetw3XLIVLiveSKIN2;
    }

    const v2Entry =
      gameid == bw3_v2_id
        ? betsw3V2GuestUrlsByClient[normalizedClientCode]?.[normalizedSkin]
        : null;
    if (v2Entry) {
      return isLiveView ? v2Entry.live : v2Entry.default;
    }

    const legacyEntry = betsw3GuestUrlsByClient[normalizedClientCode];
    if (legacyEntry) {
      return isLiveView ? legacyEntry.live : legacyEntry.default;
    }

    if (normalizedClientCode == "XLIV") {
      return isLiveView ? guestURLbetw3XLIVLive : guestURLbetw3XLIV;
    }

    return isLiveView ? guestURLbetw3LJ : guestURLbetw3LJLive;
  };
  
  onMount(()=>{
    console.log("lang", lang)
    window.addEventListener("message", receiveMessage, false);
    console.log("receiveMessage:", receiveMessage);
  });

  $: if (options?.gameid) {
    options?.gameid;
    active_view;
    userState;
    CLIENT_CODE;
    clientCode;
    sportbookskin;
    options?.gameToken;
    openSport();
  }

  const receiveMessage = (event) => {
    if (event.data == "onNologinBet") {
      loginModalOpen = true;
      
    }
    console.log("estado:", loginModalOpen);
  };

  async function openSport() {
    guestLaunchError = "";
    guestLaunchResponse = null;
    authenticatedLaunchResponse = null;
    cmsWagerLaunchOptions = null;

    const isCmsWagerSportbook = options?.gameid == cmsw_id;

    if (isCmsWagerSportbook) {
      if (userState == "loggedIn") {
        const isAuthenticatedLaunchHandled = await openAuthenticatedSportbook();
        if (isAuthenticatedLaunchHandled) {
          return;
        }
      }

      if (userState != "loggedIn") {
        const isGuestLaunchHandled = await openGuestSportbook();
        if (isGuestLaunchHandled) {
          return;
        }
      }
    }

    if (options.gameid == edg_id)openDigtain();
    else if (options.gameid == wt_id) openWintech();
    else if (options.gameid == nvb_id) openNovusbet();
    else if (options.gameid == bbq_id) openBBQ();
    else if (options.gameid == pnc_id) openPinnacle();
    else if (isBetsw3GameId(options.gameid)) openBetsW3();
    else if (options.gameid == frst_id) openFirst();
    else if (options.gameid == cmsw_id) openCmsWager();
  }

  async function openCmsWager() {
    sportbookGameUrl = "";
    cmsWagerLaunchOptions = {
      sessionToken: user?.aggregator_token || user?.agregatorToken,
      gameId: options?.gameid || cmsw_id,
      mode,
    };
  }

  function handleCmsWagerTerminalEvent(event) {
    if (!event?.detail?.type) return;
    dispatch("terminalEvent", event.detail);
  }

  async function openGuestSportbook() {
    try {
      const response = await backend.game.openGuestSportbook({
        clientCode: clientCode || CLIENT_CODE,
        sportView: active_view == "sportbooklive" ? "live" : "sport",
        lang,
        mode,
        device: ut.isMobile() ? "mobile" : "desktop",
      });

      if (!response?.success || !response?.launchType) {
        throw new Error(response?.message || "Invalid guest sportbook response");
      }

      guestLaunchResponse = response;

      if (
        response.launchType == GUEST_LAUNCH_IFRAME_URL ||
        response.launchType == GUEST_LAUNCH_HOSTED_VIEW_URL
      ) {
        sportbookGameUrl = response?.payload?.url || "";
        return !!sportbookGameUrl;
      }

      if (response.launchType == GUEST_LAUNCH_CMSWAGER) {
        sportbookGameUrl = "";
        return true;
      }

      throw new Error(`Unsupported guest launch type: ${response.launchType}`);
    } catch (error) {
      guestLaunchResponse = null;
      guestLaunchError = error?.message || "Guest sportbook launch failed";
      console.log("Guest sportbook fallback", error);
      return false;
    }
  }

  async function openAuthenticatedSportbook() {
    try {
      const sessionToken = options?.gameToken;
      if (!sessionToken) {
        return false;
      }

      const response = await backend.game.openAuthenticatedSportbook(GAMEAPI_URL, {
        sessionToken,
        sportView: active_view == "sportbooklive" ? "live" : "sport",
        lang,
        mode,
      });

      if (!response?.success || !response?.launchType) {
        throw new Error(response?.message || "Invalid authenticated sportbook response");
      }

      authenticatedLaunchResponse = response;

      if (
        response.launchType == GUEST_LAUNCH_IFRAME_URL ||
        response.launchType == GUEST_LAUNCH_HOSTED_VIEW_URL
      ) {
        sportbookGameUrl = response?.payload?.url || "";
        return !!sportbookGameUrl;
      }

      if (response.launchType == GUEST_LAUNCH_CMSWAGER) {
        sportbookGameUrl = "";
        return true;
      }

      throw new Error(`Unsupported authenticated launch type: ${response.launchType}`);
    } catch (error) {
      authenticatedLaunchResponse = null;
      console.log("Authenticated sportbook fallback", error);
      return false;
    }
  }

  const openFirst = async () => { 
    let url;
    try {
      if (userState == "loggedIn"){
        url = ut.getGameURL(GAMEAPI_URL, games.first, options.gameToken)
        const data = await backend.game.getURL(url+"&r=url");
        url = data.url
      // }else if (CLIENT_CODE == 'BPEN'){
      //   url = baseUrlWin365;
      }
      else if (CLIENT_CODE == 'BTCL') url =baseUrlWin365Cl;
      else if (CLIENT_CODE == 'GAWN' ) url =baseUrlGanawin
      // }else if (CLIENT_CODE == 'GBPE'){
      //   url =baseUrlGanabet365
      else if (CLIENT_CODE == 'BTMX') url =baseUrlWin365Mx
      else if (CLIENT_CODE == 'PJKB') url =baseUrlParyajKebek
      else if (CLIENT_CODE == 'BDOS') url =baseUrlBets286
      else if (CLIENT_CODE == 'URVE') url =baseUrlUniversalRaceURVE
      else if (CLIENT_CODE == 'WINP') url =baseUrlWinproxWINP
      else if (CLIENT_CODE == 'FBET') url =baseUrlEcuFlexBetFBET
      else if (CLIENT_CODE == 'MBET') url =baseUrlEcuFlexBetMBET
      else if (CLIENT_CODE == 'BWDA') url =baseUrlBetSwingBWDA
      else if (CLIENT_CODE == 'HBVE') url =baseUrlHipicasBabiecaHBVE
      else if (CLIENT_CODE == 'HBCO') url =baseUrlHipicasBabiecaHBCO
      else if (CLIENT_CODE == 'BTSW') url =baseUrlBetSwingBTSW
      else url = baseUrlGanawin
      sportbookGameUrl = url;
    } catch (error) {
      console.log("Sportbook Error",error);
    }
    console.log("CLIENT_CODE",CLIENT_CODE)
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
function RESELLER (params) {
  console.log("RESELLER enviando");
  
}
  const openBetsW3 = async () => { 
    let url;
    if (userState == "loggedIn") {
      url = ut.getGameURL(GAMEAPI_URL, getBetsw3Game(), options.gameToken); 
      url += active_view == "sportbooklive" ? "&sport_view=live" : "&sport_view=sport";
      url += `&lang=${lang}&r=url`;
      sportbookskin?url += `&skin=${sportbookskin}`: ""; // just for xlive365
      let data;
      if (clientCode === 'JU02') {
            data = await backend.game.getURLDemo(url);
          } else {
            data = await backend.game.getURL(url);
      }
      url = data.url;      
    } else  {
      url = resolveBetsw3GuestUrl(options?.gameid, CLIENT_CODE, active_view, sportbookskin);
      if (CLIENT_CODE == "PRLS") RESELLER();
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
      console.log("urlNovus", url);
    }
    sportbookGameUrl = url;
    console.log("urlNovus", sportbookGameUrl);
  };
  
  onDestroy(async () => {
    if (user?.agregatorToken) {
      let {data} = await backend.users.getBalance(user.agregatorToken);
      user.balance = data.balance;
    }
    document.body.style.overflow="scroll";
  });
</script>

{#if authenticatedLaunchResponse?.launchType == GUEST_LAUNCH_CMSWAGER}
  <ScreenGamesCmsWager
    open={true}
    platform={authenticatedLaunchResponse?.provider || "cmswager"}
    options_launch={{}}
    launchDescriptor={authenticatedLaunchResponse}
    updateBalance={() => {}}
    on:terminalEvent={handleCmsWagerTerminalEvent}
  />
{:else if userState != "loggedIn" && guestLaunchResponse?.launchType == GUEST_LAUNCH_CMSWAGER}
  <ScreenGamesCmsWager
    open={true}
    platform={guestLaunchResponse?.provider || "cmswager"}
    options_launch={{}}
    launchDescriptor={guestLaunchResponse}
    updateBalance={() => {}}
    on:terminalEvent={handleCmsWagerTerminalEvent}
  />
{:else if cmsWagerLaunchOptions}
  <ScreenGamesCmsWager
    open={true}
    platform={"cmswager"}
    options_launch={cmsWagerLaunchOptions}
    updateBalance={() => {}}
    on:terminalEvent={handleCmsWagerTerminalEvent}
  />
{:else}
  <div class="sportbook-content">
    <iframe class="sportbook-iframe" id="sportbook-iframe" title="" src={sportbookGameUrl} frameborder="0" />
  </div>
{/if}

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
