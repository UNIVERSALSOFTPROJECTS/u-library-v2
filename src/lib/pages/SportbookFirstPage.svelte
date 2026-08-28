<script>

  import { onDestroy, onMount } from "svelte";
  import ut from '../../js/util';
  import backend from '../../js/server'

  export let userState;
  export let user;
  export let locale = "es";
  export let options;
  export let GAMEAPI_URL;
  export let CLIENT_CODE;
  export let mode_bussines;

  let sportbookGameUrl = '';
  let viewSportbook = true;
  let mode = ut.isMobile() ? "mb" : "wb";
  let mounted = false;
  let previousLocale = locale;

  const first_id = "first_2024";

  const guestURLs = {
    LATI: "https://prod20370-152474279.freethrow777.com", 
    URCO:"https://prod20370-161019095.freethrow777.com",
    URCL: "https://prod20370-161018822.freethrow777.com",
    MPCO: "https://prod20370-161019095.freethrow777.com",
    URVE:"https://prod20370-161019095.freethrow777.com",
    HBCO: "https://prod20370-201498456.freethrow777.com",
    HBVE: "https://prod20370-201498755.freethrow777.com",
    BTSW: "https://prod20370-201497598.freethrow777.com",
    BWDA: "https://prod20370-201479896.freethrow777.com",
    HBEC: "https://prod20370-201498456.freethrow777.com",
    HBAR: "https://prod20370-201498456.freethrow777.com",
    HBPA: "https://prod20370-201498456.freethrow777.com",
    HBMX: "https://prod20370-201498456.freethrow777.com",
    HBCL: "https://prod20370-204441557.freethrow777.com",
    PNBO: "https://prod20370-205035220.freethrow777.com",
    PNEC: "https://prod20370-205035220.freethrow777.com",
    PNCO: "https://prod20370-205035220.freethrow777.com",
    MSVE: "https://prod20370-206588353.freethrow777.com",
    ALAR: "https://prod20370-206586095.freethrow777.com/",
    default: "https://prod20370-150256248.freethrow777.com",
  };

  const guestURLSRetail = {
    PNBO: "https://prod20370-225939404.freethrow777.com/es/retail", 
    PNEC: "https://prod20370-225939404.freethrow777.com/es/retail", 
    BSVV: "https://prod20370-225938335.freethrow777.com/es/retail", 
    BSVD: "https://prod20370-225938690.freethrow777.com/es/retail",
    FBET: "https://prod20370-225939107.freethrow777.com/es/retail", 
    FBMM: "https://prod20370-225939107.freethrow777.com/es/retail",
    WINP: "https://prod20370-225938029.freethrow777.com/es/retail", 
    PNCO: "https://prod20370-225939404.freethrow777.com/es/retail",
    PNMM: "https://prod20370-225939404.freethrow777.com/es/retail",
    default: "https://prod20370-150256248.freethrow777.com/es/retail",
  };
  
  const games = {
    'first':{
      provider: "first",
      brand: "FIRST",
      gameid: first_id,
      mode,
      id:93326
    }
  }

  onMount(()=>{
    console.log("UserState", userState);
    mounted = true;
  });
  
  $: {
    openSport();
  }

  async function openSport() {
    openFirst();
  }

  const resetSportbook = async(locale) => {
    viewSportbook = false;
    await openSport();
    setTimeout(() => {
      viewSportbook = true;
    }, 100);
  }

  const openFirst = async () => { 
    let url;
    try {
      if (userState == "loggedIn"){
        url = ut.getGameURL(GAMEAPI_URL, games.first, options.gameToken, locale)
        const data = await backend.game.getURL(url);
        url = data.url
      }else{
        if(mode_bussines === 'retail') url = guestURLSRetail[CLIENT_CODE] || guestURLSRetail.default; 
        else url = guestURLs[CLIENT_CODE] || guestURLs.default;
      }
      sportbookGameUrl = url;
    } catch (error) {
      console.log("Sportbook Error",error);
    }
  }

  onDestroy(async () => {
    let {data} = await backend.users.getBalance(user.agregatorToken);
    user.balance = data.balance;
    document.body.style.overflow="scroll";
  });


  $: if (mounted && locale !== previousLocale) {
    previousLocale = locale;
    resetSportbook(locale);
  }
</script>

<div class="sportbook-content">
  {#if viewSportbook}
  <iframe class="sportbook-iframe" id="sportbook-iframe" title="" src={sportbookGameUrl} frameborder="0" />
  {/if}
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
