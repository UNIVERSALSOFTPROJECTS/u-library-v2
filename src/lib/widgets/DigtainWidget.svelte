<script>
  import { onMount } from "svelte";
  //import Configuration from "../../config";

  export let user;
  export let loginModalOpen;
  export let GAMEAPI_URL;
  //export let onCategoryChange;

  //const conf = Configuration.getConfiguration();
  let sportbookWidgetsUrl = `${GAMEAPI_URL}/e-digtain/widget?domain=coliseo&language=es`;
  var regex = /^[a-zA-Z]/;
  //let sportbookWidgetsUrl;


  onMount(() => {
    window.addEventListener("message", receiveMessage, false);
  });
  
  $:{
    if (user && user.agregatorToken) {
      //if (user) sportbookWidgetsUrl += "&token=" + user.agregatorToken;
    }
  }

  const receiveMessage = (event) => {
    if (event.data == "onNologinBet") {
      loginModalOpen = true;
    } else if (event.data.event && !regex.test(event.data.event) ) {
      const eventInfo = event.data.event;
      const sportbookOptions = { gameid: "8042022_digitain", eventInfo };
      //onCategoryChange("sportbook", sportbookOptions);
    }
  };
</script>

<div>
  {#if sportbookWidgetsUrl != ""}
    <iframe
      class="widgets"
      id="widgets-iframe"
      title=""
      src={sportbookWidgetsUrl}
      frameborder="0"
    />
  {/if}
</div>

<style>
  .widgets {
    width: 100%;
    height: 20rem;
    position: relative;
    z-index: 1;
    margin: 3rem 0px;
  }
  @media only screen and (max-width: 1023px) {
    .widgets {
      height: 22rem;
      margin: 0;
    }
  }
</style>
