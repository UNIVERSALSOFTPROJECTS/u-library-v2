<script>
  // @ts-nocheck
  //https://test.apiuniversalsoft.com/api/launch?gameid=1002&p=ho&b=UniversalRace&m=wb&sessionid=80bd03b3b056e9fac1967e114e5689ac7ec6a57063960789ec165917464b72816c6f48e6c281520fb9d48411c2c12eaa9535740132cc299bc10d4f76682d1ad6
  import { onDestroy, onMount } from "svelte";
  import ut from '../../js/util';
  import backend from '../../js/server'

  export let userState;
  export let active_view
  export let user;
  export let options;
  export let GAMEAPI_URL;
  //export let clientCode;
  export let lang = 'es';

  let esportsGameUrl = '';
  let mode = ut.isMobile() ? "mb" : "wb";
  let deviceiframe = mode;
  let sport_view = active_view == "esports" ? "e-sports" : "";
  const pnc_id = "902-pinnacle";
  const guestURLpinnacle = "https://fv-wngcxtx.oreo88.com/es/esports-hub/"
  const games = {
    'pinnacle':{
      gameid: pnc_id,
      provider: "pnc",
      brand: "Pinnacle",
      mode,
      id: 124761
    },
  }

  $: {
    openSport();
  }

  async function openSport() {
    if (options.gameid == pnc_id) openPinnacle();
  }

  const openPinnacle = async () => { 
    let url =userState == "loggedIn"? ut.getGameURLTest(GAMEAPI_URL, games.pinnacle, options.gameToken) : guestURLpinnacle;
    if (userState == "loggedIn"){
      url += active_view == "esports" ? "&sport_view=e-sports" : "";
      const data = await backend.game.getURL(url);
      url = data.url
    }
    esportsGameUrl = url;
  }

  onDestroy(async () => {
    if (userState == "loggedIn"){
        let {data} = await backend.getBalance(user.agregatorToken);
        user.balance = data.balance;
    }
  })
  
</script>

<div class="esports-content">
    <iframe class="esports-iframe" id="esports-iframe" title="" src={esportsGameUrl} frameborder="0" />
</div>

<style>
  @media only screen and (max-width: 1200px) {
  .esports-content{
    width: 100%;
  }
  .esports-iframe {
    height: calc(100vh - 14.9vh);
    width: 100vw;
  }
}

@media only screen and (min-width: 1200px) {
  .esports-content{
    width: 100%;
  }
  .esports-iframe {
    height: calc(100vh - 120px) !important;
    width: 100vw;
  }
}
</style>
