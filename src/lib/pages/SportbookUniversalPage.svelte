<script>
  import backend from "../../js/server";
  import util from "../../js/util";
  import SportbookAltenarPage from "./SportbookAltenarPage.svelte";
  import SportbookPage from "./SportbookPage.svelte";

  export let userState;
  export let active_view;
  export let user;
  export let options = {};
  export let loginModalOpen;
  export let GAMEAPI_URL;
  export let CLIENT_CODE;
  export let locale = "es";

  let sportbookGameUrl = "";
  let useLegacyFallback = false;
  let loading = false;
  let requestKey = "";

  const LAUNCH_IFRAME_URL = "iframe_url";
  const LAUNCH_HOSTED_VIEW_URL = "hosted_view_url";

  function getSportView() {
    return active_view == "sportbooklive" ? "live" : "sport";
  }

  function getMode() {
    return util.isMoble() ? "mb" : "wb";
  }

  function shouldUseLegacyAltenar() {
    return options?.legacyGameid?.includes("ank");
  }

  async function launchSportbook() {
    const nextKey = `${userState}|${active_view}|${options?.gameToken || ""}|${CLIENT_CODE}|${GAMEAPI_URL}`;
    if (!GAMEAPI_URL || requestKey == nextKey) return;
    requestKey = nextKey;

    sportbookGameUrl = "";
    useLegacyFallback = false;
    loading = true;

    try {
      let response;

      if (userState == "loggedIn" && !options?.gameToken) {
        return;
      }

      if (userState == "loggedIn") {
        response = await backend.game.openAuthenticatedSportbook(GAMEAPI_URL, {
          sessionToken: options.gameToken,
          sportView: getSportView(),
          lang: locale || "es",
          mode: getMode(),
        });
      } else {
        response = await backend.game.openGuestSportbook({
          clientCode: CLIENT_CODE,
          sportView: getSportView(),
          lang: locale || "es",
          mode: getMode(),
          device: util.isMoble() ? "mobile" : "desktop",
        });
      }

      if (
        response?.success &&
        (response?.launchType == LAUNCH_IFRAME_URL ||
          response?.launchType == LAUNCH_HOSTED_VIEW_URL) &&
        response?.payload?.url
      ) {
        sportbookGameUrl = response.payload.url;
        return;
      }

      throw new Error(response?.message || "Invalid sportbook launch response");
    } catch (error) {
      console.log("Sportbook universal fallback", error);
      useLegacyFallback = true;
    } finally {
      loading = false;
    }
  }

  $: launchSportbook();
</script>

{#if sportbookGameUrl}
  <div class="sportbook-content">
    <iframe
      class="sportbook-iframe"
      id="sportbook-iframe"
      title=""
      src={sportbookGameUrl}
      frameborder="0"
    />
  </div>
{:else if useLegacyFallback}
  {#if shouldUseLegacyAltenar()}
    <SportbookAltenarPage
      bind:userState
      bind:user
      options={options}
      gameid={options.legacyGameid}
      usertoken={user?.agregatorToken}
      bind:loginModalOpen
      GAME_JAVA_API_URL={GAMEAPI_URL}
      GAMEAPI_URL={GAMEAPI_URL}
      CLIENT_CODE={CLIENT_CODE}
      clientCode={CLIENT_CODE}
      lang={locale}
    />
  {:else}
    <SportbookPage
      bind:userState
      bind:active_view
      bind:user
      bind:options
      bind:loginModalOpen
      bind:GAMEAPI_URL
      bind:CLIENT_CODE
    />
  {/if}
{:else if loading}
  <div class="sportbook-loading"></div>
{/if}

<style>
  .sportbook-content {
    width: 100%;
  }

  .sportbook-iframe {
    width: 100%;
    height: 100vh;
  }

  .sportbook-loading {
    min-height: 60vh;
  }
</style>
