<script>
  import { onDestroy, onMount } from "svelte";
  import ut from "../../js/util";
  import backend from "../../js/server";
  import AltenarLanguageSelector from "../components/AltenarLanguageSelector.svelte";
  import { Client } from "@stomp/stompjs";

  export let userState;
  export let active_view;
  export let user;
  export let options;
  export let loginModalOpen;
  export let GAMEAPI_URL;
  export let GAME_JAVA_API_URL;
  export let lang = "es";
  export let CLIENT_CODE;
  export let clientCode;
  console.log(user, "sportbook");

  let sportbookGameUrl = "";

  const gameId = "67000_ank";
  const GUEST_URL =
    "https://srv-prod.newapiusoft.com/game-api-jv/api/anakatech/opengame";

  onMount(() => {
    console.log("lang", lang);
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

  function shouldShowAltenarLanguageSelector() {
    return `${CLIENT_CODE || clientCode || ""}`.trim().toUpperCase() == "BDBR";
  }

  async function openSport() {
    open();
  }

  const open = async () => {
    let url;
    try {
      if (userState == "loggedIn") {
        url = ut.getGameURLAltenar(
          GAMEAPI_URL,
          gameId,
          options.gameToken,
          lang,
          options?.page
        );
        const data = await backend.game.getURL(url + "&r=url");
        url = data.url;
      } else {
        url = ut.getGameURLAltenar(GUEST_URL, gameId, "123456789", lang, options?.page);
        const data = await backend.game.getURL(url + "&r=url");
        url = data.url;
      }
      console.log("url => ", url);

      sportbookGameUrl = url;
    } catch (error) {
      console.log("Sportbook Error", error);
    }
    console.log("CLIENT_CODE", CLIENT_CODE);
  };

  onDestroy(async () => {
    let { data } = await backend.users.getBalance(user.agregatorToken);
    user.balance = data.balance;
    document.body.style.overflow = "scroll";
  });
</script>

<div class="sportbook-content">
  {#if shouldShowAltenarLanguageSelector()}
    <AltenarLanguageSelector />
  {/if}
  <iframe
    class="sportbook-iframe"
    id="sportbook-iframe"
    title=""
    src={sportbookGameUrl}
    frameborder="0"
  />
</div>

<style>
  @media only screen and (max-width: 1199px) {
    .sportbook-content {
      position: relative;
      width: 100%;
    }
    .sportbook-iframe {
      height: 100vh;
      width: 100%;
    }
  }
  @media only screen and (min-width: 1200px) {
    .sportbook-content {
      position: relative;
      width: 98.9vw;
    }
    .sportbook-iframe {
      width: 100%;
      height: 100vh;
    }
  }
</style>
