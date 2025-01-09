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
  

  const domain = window.location.hostname;

  let sportbookGameUrl = '';
  let mode = ut.isMobile() ? "mb" : "wb";

 
    const bw3_id = "betsw3_2024";
    
    const guestURLbt1Live="https://sports.jcasino.live/#/live_ecuabets/?target=betsson1-86224-integration&token=123456789";
    const guestURLbt1="https://sports.jcasino.live/#/?target=betsson1-86224-integration&token=123456789";

    const guestURLPOIILive="https://sports.jcasino.live/?target=86224&name=betsson3#/?target=betsson3-86224-integration&view=live";
    const guestURLPOII="https://sports.jcasino.live/?target=86224&name=betsson3#/?target=betsson3-86224-integration&view=prematch";

    const guestURLPROW = "https://sports.jcasino.live/?target=86224&name=betsson2#/?target=betsson2-86224-integration&view=live";
    const guestURLPROWLive = "https://sports.jcasino.live/?target=86224&name=betsson2#/?target=betsson2-86224-integration&view=live";

    const guestURLPROG = "https://sports.jcasino.live/?target=86224&name=betsamerica#/?target=betsamerica-86224-integration";
    const guestURLPROGLive = "https://sports.jcasino.live/?target=86224&name=betsamerica#/?target=betsamerica-86224-integration&view=live";

    const guestURLLJLiveMobile ="https://mbetsamerica.betsw3.win/live/Soccer/?auth_token=78140-504cb28edad6ad2f4fcff5d0b4b9";
    const guestURLLJMobile= "https://mbetsamerica.betsw3.win/prematch/Soccer/?auth_token=78140-504cb28edad6ad2f4fcff5d0b4b9";

    const guestURLLJ = "https://betsamerica.betsw3.win/#/sport/?lang=spa&auth_token=78140-504cb28edad6ad2f4fcff5d0b4b9&type=0";
    const guestURLLJLive ="https://betsamerica.betsw3.win/#/sport/?lang=spa&auth_token=78140-504cb28edad6ad2f4fcff5d0b4b9&type=1";

    const guestURL = "https://sports.jbets.online/?target=86224&name=bets365#/?target=bets365-86224-integration&token=123456789";
    const guestURLLive = "https://sports.jbets.online/?target=86224&name=bets365#/live_ecuabets/?target=bets365-86224-integration&token=123456789";

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
      default: {
        live: {
          mb: guestURLLJLiveMobile,
          wb: guestURLLJLive,
        },
        default: {
          mb: guestURLLJMobile,
          wb: guestURLLJ,
        },
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
  }
  
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
          url = ut.getGameURL(GAMEAPI_URL, games.BetW3, options.gameToken);
          url += active_view === "sportbooklive" ? "&sport_view=live" : "&sport_view=sport";
          url += `&lang=${lang}&r=url`;
          if (CLIENT_CODE == 'BSPE') url += `&window_multiple=true`;
          const data = await backend.game.getURL(url);
          url = data.url;
        } else {
            url = resolveGuestURL(CLIENT_CODE, active_view, mode);
        }
        if (!domain.includes('terminal') || domain.includes('vista') ) {
            RESELLER();
            console.log("===================> RESELEER EXISTE");
            
        }
        sportbookGameUrl = url;
      } catch (error) {
          console.log("Sportbook Error",error);  
      }
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
