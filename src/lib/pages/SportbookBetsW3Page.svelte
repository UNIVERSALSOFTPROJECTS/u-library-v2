<script>
  import { onDestroy, onMount } from "svelte";
  import ut from '../../js/util';
  import backend from '../../js/server';

  export let userState;
  export let active_view
  export let user;
  export let options;
  export let GAMEAPI_URL;
  export let lang = 'es';
  export let CLIENT_CODE;
  export let sportbookGameUrl = "";
  

  const domain = window.location.hostname;

  // let sportbookGameUrl = '';
  let mode = ut.isMobile() ? "mb" : "wb";

 
    const bw3_id = "betsw3_2024";
    const bw3_v2_id = "betsw3_v2";
    
    const guestURLbt1Live="https://sports2.jcasino.live/?target=86224&name=betsson3#/?target=betsson3-86224-integration&view=live&token=123456789";
    // const guestURLbt1Live="https://sports.jcasino.live/#/live_ecuabets/?target=betsson1-86224-integration&token=123456789";
    const guestURLbt1="https://sports2.jcasino.live/?target=86224&name=betsson3#/?target=betsson3-86224-integration&token=123456789";
    // const guestURLbt1="https://sports.jcasino.live/#/?target=betsson1-86224-integration&token=123456789";

    const guestURLPOIILive="https://sports.jcasino.live/?target=86224&name=betsson3#/?target=betsson3-86224-integration&view=live";
    const guestURLPOII="https://sports.jcasino.live/?target=86224&name=betsson3#/?target=betsson3-86224-integration&view=prematch";

    const guestURLPROW = "https://sports.jcasino.live/?target=86224&name=betsson2#/?target=betsson2-86224-integration&view=live";
    const guestURLPROWLive = "https://sports.jcasino.live/?target=86224&name=betsson2#/?target=betsson2-86224-integration&view=live";

    const guestURLPROG = "https://sports2.jcasino.live/?target=86224&name=betsamerica#/?target=betsamerica-86224-integration&token=123456789";
    const guestURLPROGLive = "https://sports2.jcasino.live/?target=86224&name=betsamerica#/?target=betsamerica-86224-integration&token=123456789";

    const guestURLLJ = "https://betsamerica.betsw3.win/#/sport/?lang=spa&auth_token=78140-504cb28edad6ad2f4fcff5d0b4b9&type=0";
    const guestURLLJLive ="https://betsamerica.betsw3.win/#/sport/?lang=spa&auth_token=78140-504cb28edad6ad2f4fcff5d0b4b9&type=1";

    const guestURL = "https://sports.jbets.online/?target=86224&name=bets365#/?target=bets365-86224-integration&token=123456789";
    const guestURLLive = "https://sports.jbets.online/?target=86224&name=bets365#/live_ecuabets/?target=bets365-86224-integration&token=123456789";

    const guestURLurco ="https://sports2.jcasino.live/?target=86224&name=couniversalrace#/?target=couniversalrace-86224-integration&token=123456789"
    const guestURLurcoLive ="https://sports2.jcasino.live/?target=86224&name=couniversalrace#/live_ecuabets/?target=couniversalrace-86224-integration&token=123456789"

    const guestURLacpe1 ="https://sports-frontend.jbets.online/?platformId=6a7f36588bda1906f6e6a993&template=retail1_premium#/?platformId=6a7f36588bda1906f6e6a993&playerToken=&playerId=&userId=6a751396fe02c88d2ac8568f&language=es&platformSkinId=6a7f3e5a8bda1906f6e6a996&userMode=retail"
    const guestURLacpeLive1 ="https://sports-frontend.jbets.online/?platformId=6a7f36588bda1906f6e6a993&template=retail1_premium#/?platformId=6a7f36588bda1906f6e6a993&playerToken=&playerId=&userId=6a751396fe02c88d2ac8568f&language=es&platformSkinId=6a7f3e5a8bda1906f6e6a996&userMode=retail&view=live"
    const guestURLacec1 ="https://sports-frontend.jbets.online/?platformId=6a7f35c28bda1906f6e6a992&template=retail1_premium#/?platformId=6a7f35c28bda1906f6e6a992&playerToken=&playerId=&userId=6a751396fe02c88d2ac8568f&language=es&platformSkinId=6a7f37a58bda1906f6e6a994&userMode=retail"
    const guestURLacecLive1 ="https://sports-frontend.jbets.online/?platformId=6a7f35c28bda1906f6e6a992&template=retail1_premium#/?platformId=6a7f35c28bda1906f6e6a992&playerToken=&playerId=&userId=6a751396fe02c88d2ac8568f&language=es&platformSkinId=6a7f37a58bda1906f6e6a994&userMode=retail&view=live"

    const guestURLacpe2 ="https://sports-frontend.jbets.online/?platformId=6a7f36588bda1906f6e6a993&template=retail2_premium#/?platformId=6a7f36588bda1906f6e6a993&playerToken=&playerId=&userId=6a751396fe02c88d2ac8568f&language=es&platformSkinId=6a7f3e738bda1906f6e6a997&userMode=retail"
    const guestURLacpeLive2 ="https://sports-frontend.jbets.online/?platformId=6a7f36588bda1906f6e6a993&template=retail2_premium#/?platformId=6a7f36588bda1906f6e6a993&playerToken=&playerId=&userId=6a751396fe02c88d2ac8568f&language=es&platformSkinId=6a7f3e738bda1906f6e6a997&userMode=retail&view=live"
    const guestURLacec2 ="https://sports-frontend.jbets.online/?platformId=6a7f35c28bda1906f6e6a992&template=retail2_premium#/?platformId=6a7f35c28bda1906f6e6a992&playerToken=&playerId=&userId=6a751396fe02c88d2ac8568f&language=es&platformSkinId=6a7f37b48bda1906f6e6a995&userMode=retail"
    const guestURLacecLive2 ="https://sports-frontend.jbets.online/?platformId=6a7f35c28bda1906f6e6a992&template=retail2_premium#/?platformId=6a7f35c28bda1906f6e6a992&playerToken=&playerId=&userId=6a751396fe02c88d2ac8568f&language=es&platformSkinId=6a7f37b48bda1906f6e6a995&userMode=retail&view=live"

    const guestURLs = {
      BPEN: {
        live: guestURLLive,
        default: guestURL,
      },
      BUSD: {
        live: guestURLLive,
        default: guestURL,
      },
      POII: {
        live: guestURLPOIILive,
        default: guestURLPOII,
      },
      PROW:{
        live: guestURLPROWLive,
        default: guestURLPROW,
      },
      PROG: {
        live: guestURLPROGLive,
        default: guestURLPROG,
      },
      PRLS: {
        live: guestURLbt1Live,
        default: guestURLbt1,
      },
      BSPE: {
        live: guestURLbt1Live,
        default: guestURLbt1,
      },
      URCO:{
        live: guestURLurcoLive,
        default: guestURLurco,
      },
      ACPE:{
        live: guestURLacpeLive1,
        default: guestURLacpe1,
      },
      ACEC:{
        live: guestURLacecLive1,
        default: guestURLacec1,
      },
      default: {
        live: guestURLLJLive,
        default: guestURLLJ
        },
  
    };

    const resolveGuestURL = (clientCode, view, mode) => {
        const clientURLs = guestURLs[clientCode] || guestURLs.default;
        if (clientURLs.live && view === "sportbooklive") {
            return clientURLs.live[mode] || clientURLs.live;
        }
        return clientURLs.default[mode] || clientURLs.default;
    };

    const games = {
      'BetW3':{
        gameid: bw3_id,
        provider: "betsw3",
        brand: "BETSW3",
        mode,
        id: 125072
      }
    };

    const isBetsw3GameId = (gameid) => [bw3_id, bw3_v2_id].includes(gameid);
    const getBetsw3Game = () => ({
        ...games.BetW3,
        gameid: isBetsw3GameId(options?.gameid) ? options.gameid : games.BetW3.gameid,
    });
    const betsw3GuestUrlsByClient = {
        BUSD: { live: guestURLLive, default: guestURL },
        BPEN: { live: guestURLLive, default: guestURL },
        POII: { live: guestURLPOIILive, default: guestURLPOII },
        PROW: { live: guestURLPROWLive, default: guestURLPROW },
        PROG: { live: guestURLPROGLive, default: guestURLPROG },
        PRLS: { live: guestURLbt1Live, default: guestURLbt1 },
        BSPE: { live: guestURLbt1Live, default: guestURLbt1 },
        URCO: { live: guestURLurcoLive, default: guestURLurco },
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
    const resolveBetsw3GuestUrl = (gameid, clientCode, view) => {
        const normalizedClientCode = String(clientCode ?? "").trim().toUpperCase();
        const isLiveView = view === "sportbooklive";
        const normalizedSkin =
            String(localStorage.getItem("sportbookversion") || "").trim() === "2" ? "2" : "1";

        const v2Entry =
            gameid == bw3_v2_id
                ? betsw3V2GuestUrlsByClient[normalizedClientCode]?.[normalizedSkin]
                : null;
        if (v2Entry) {
            return isLiveView ? v2Entry.live : v2Entry.default;
        }

        const legacyEntry = betsw3GuestUrlsByClient[normalizedClientCode] || guestURLs[normalizedClientCode];
        if (legacyEntry) {
            return isLiveView ? legacyEntry.live : legacyEntry.default;
        }

        return isLiveView ? guestURLs.default.live : guestURLs.default.default;
    };
  
  onMount(()=>{
    console.log("CLIENT_CODE", CLIENT_CODE);
  });

  $: {
    openSport();
  }

    async function openSport() {
        openBetsW3();
    }

    const RESELLER = ()=> {
        console.log("RESELLER enviando");
    }

    const openBetsW3 = async () => {
      let url;
      console.log(mode, "mode");
      try {
        if (userState === "loggedIn") {
          url = ut.getGameURL(GAMEAPI_URL, getBetsw3Game(), options.gameToken);
          url += active_view === "sportbooklive" ? "&sport_view=live" : "&sport_view=sport";
          url += `&lang=${lang}&r=url`;  
          if (CLIENT_CODE == 'PRLS') url += `&game_multiple=true`;
          //const data = await backend.game.getURL(url);
          let data;
          if (CLIENT_CODE === 'JU02') {
            data = await backend.game.getURLDemo(url);
          } else {
            data = await backend.game.getURL(url);
          }
          url = data.url;
        } else {
            url = resolveBetsw3GuestUrl(options?.gameid, CLIENT_CODE, active_view);
        }
        if (!domain.includes('terminal') || domain.includes('vista') ) RESELLER();
        sportbookGameUrl = url;
      } catch (error) {
          console.log("Sportbook Error",error);  
      }
    };



 
  onDestroy(async () => {
    // solo actualizaremos el balance si el usuario está logueado
    if(user.agregatorToken){
      let {data} = await backend.users.getBalance(user.agregatorToken);
      user.balance = data.balance;
    }
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
