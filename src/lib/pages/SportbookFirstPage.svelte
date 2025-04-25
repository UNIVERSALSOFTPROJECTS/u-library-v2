<script>

  import { onDestroy, onMount } from "svelte";
  import ut from '../../js/util';
  import backend from '../../js/server'

  export let userState;
  export let user;
  export let options;
  export let GAMEAPI_URL;
  export let CLIENT_CODE;

  let sportbookGameUrl = '';
  let mode = ut.isMobile() ? "mb" : "wb";

  const first_id = "first_2024";

  const guestURLs = {
    LATI: "https://prod20370-152474279.freethrow777.com", 
    URCO:"https://prod20370-161019095.freethrow777.com",
    URCL: "https://prod20370-161019764.freethrow777.com",
    default: "https://prod20370-150256248.freethrow777.com",
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
  });
  
  $: {
    openSport();
  }

  async function openSport() {
    openFirst();
  }

  const openFirst = async () => { 
    let url;
    try {
      if (userState == "loggedIn"){
        url = ut.getGameURL(GAMEAPI_URL, games.first, options.gameToken)
        const data = await backend.game.getURL(url);
        url = data.url
      }else{
        url = guestURLs[CLIENT_CODE] || guestURLs.default;
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
