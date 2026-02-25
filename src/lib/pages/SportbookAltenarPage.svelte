<script>
  import { onDestroy, onMount } from "svelte";
  import ut from '../../js/util';
  import backend from '../../js/server'
  import { Client } from '@stomp/stompjs';


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
  console.log(user,"sportbook");
  

  let sportbookGameUrl = '';

  const gameId = "67000_ank";


  
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
    open();
  }

  const open = async () => { 
    let url;
    try {
      if (userState == "loggedIn"){
        url = ut.getGameURLAltenar(GAMEAPI_URL,gameId, options.gameToken)
        const data = await backend.game.getURL(url+"&r=url");
        url = data.url
      // }else if (CLIENT_CODE == 'BPEN'){
      //   url = baseUrlWin365;
      }
      console.log("url => ",url);
      
      sportbookGameUrl = url;
    } catch (error) {
      console.log("Sportbook Error",error);
    }
    console.log("CLIENT_CODE",CLIENT_CODE)
  }

 
function RESELLER (params) {
  console.log("RESELLER enviando");
  
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
