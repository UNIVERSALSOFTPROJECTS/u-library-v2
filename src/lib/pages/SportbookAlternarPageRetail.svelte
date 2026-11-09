<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import ut from "../../js/util";
  import backend from "../../js/server";

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

  const dispatch = createEventDispatcher();

  const SPORTBOOK_SKIN = "3";
  const SUPPORTED_CLIENT_CODES = ["DEEU37", "DECC35"];

  const bw3_id = "betsw3_2024";
  const bw3_v2_id = "betsw3_v2";

  const GUEST_LAUNCH_IFRAME_URL = "iframe_url";
  const GUEST_LAUNCH_HOSTED_VIEW_URL = "hosted_view_url";

  const mode = ut.isMobile() ? "mb" : "wb";

  const games = {
    BetW3: {
      gameid: bw3_id,
      provider: "betsw3",
      brand: "BETSW3",
      mode,
      id: 125072,
    },
  };

  // URL de invitados para BetsW3 skin 3.
  const guestBetsw3Skin3Url =
    "https://cdn-img.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6adbbc5d43044376a5c402a5&platformUrl=https%3A%2F%2Fec.deportetotal.bett&url=deportetotal.bet#/overview?playerToken=&playerId=&userMode=retail";

  // Organizaciones habilitadas para BetsW3 skin 3.
  const betsw3GuestUrlsByClient = {
    DEEU37: guestBetsw3Skin3Url,
    DECC35: guestBetsw3Skin3Url,
  };

  let sportbookGameUrl = "";
  let sportbookIframeEl = null;

  let readyDispatched = false;
  let lastPostedBetsw3View = "";
  let lastLaunchKey = "";

  let normalizedClientCode = "";
  let isSupportedClient = false;

  $: normalizedClientCode = String(clientCode || CLIENT_CODE || "")
    .trim()
    .toUpperCase();

  $: isSupportedClient = SUPPORTED_CLIENT_CODES.includes(normalizedClientCode);

  const normalizeView = () =>
    active_view === "sportbooklive" ? "live" : "prematch";

  const isBetsw3GameId = (gameid) =>
    [bw3_id, bw3_v2_id].includes(gameid);

  const getBetsw3Game = () => ({
    ...games.BetW3,
    gameid: isBetsw3GameId(options?.gameid)
      ? options.gameid
      : games.BetW3.gameid,
  });

  /**
   * Identifica cuándo es necesario volver a cargar el iframe.
   * Prematch/Live no forma parte de esta clave porque se cambia
   * mediante postMessage.
   */
  function getLaunchKey() {
    return [
      options?.gameid || "",
      userState || "",
      normalizedClientCode,
      options?.gameToken || "",
      GAMEAPI_URL || "",
      lang || "",
      mode,
    ].join("|");
  }

  /**
   * Cambia Prematch/Live dentro del iframe sin recargarlo.
   */
  function changeBetsw3View(view) {
    const win = sportbookIframeEl?.contentWindow;

    if (!win) return;

    win.postMessage(
      {
        action: "change_view",
        view,
      },
      "*"
    );
  }

  /**
   * Primera carga y relanzamientos.
   * Solo permite BetsW3 skin 3 para DEEU37 y DECC35.
   */
  $: if (options?.gameid) {
    options.gameid;
    userState;
    CLIENT_CODE;
    clientCode;
    normalizedClientCode;
    isSupportedClient;
    options?.gameToken;
    GAMEAPI_URL;
    lang;

    if (isSupportedClient && isBetsw3GameId(options.gameid)) {
      const key = getLaunchKey();

      if (key !== lastLaunchKey) {
        lastLaunchKey = key;
        openBetsW3();
      }
    } else {
      lastLaunchKey = "";
      sportbookGameUrl = "";
      readyDispatched = false;
      lastPostedBetsw3View = "";
    }
  }

  /**
   * Alternancia Prematch/Live.
   * Solo funciona para BetsW3 skin 3 y las organizaciones habilitadas.
   */
  $: if (
    isSupportedClient &&
    isBetsw3GameId(options?.gameid) &&
    sportbookGameUrl &&
    readyDispatched
  ) {
    active_view;

    const view = normalizeView();

    if (view !== lastPostedBetsw3View) {
      lastPostedBetsw3View = view;
      changeBetsw3View(view);
    }
  }

  function receiveMessage(event) {
    if (event.data === "onNologinBet") {
      loginModalOpen = true;
    }
  }

  onMount(() => {
    window.addEventListener("message", receiveMessage, false);
  });

  /**
   * Abre BetsW3 skin 3.
   * - Usuario autenticado: obtiene la URL mediante backend.
   * - Invitado: utiliza la URL configurada para su organización.
   */
  async function openBetsW3() {
    console.log("OPEN BETSW3 SKIN 3");

    readyDispatched = false;
    lastPostedBetsw3View = "";
    sportbookGameUrl = "";

    try {
      let url = "";

      if (userState === "loggedIn") {
        url = ut.getGameURL(
          GAMEAPI_URL,
          getBetsw3Game(),
          options.gameToken
        );

        url += active_view === "sportbooklive"
          ? "&sport_view=live"
          : "&sport_view=sport";

        url += `&lang=${lang}&skin=${SPORTBOOK_SKIN}&r=url`;

        const response = await backend.game.getURL(url);

        url = response?.url || "";
      } else {
        url = betsw3GuestUrlsByClient[normalizedClientCode] || "";
      }

      if (!url) {
        console.error(
          "No se encontró una URL de BetsW3 skin 3 para:",
          normalizedClientCode
        );
        return;
      }

      console.log("BetsW3 URL:", url);

      sportbookGameUrl = url;
    } catch (error) {
      console.error("BetsW3 launch error:", error);
      sportbookGameUrl = "";
    }
  }

  /**
   * Avisa al componente padre cuando el iframe terminó de cargar.
   */
  function onIframeLoad() {
    readyDispatched = true;
    dispatch("ready");
  }

  onDestroy(async () => {
    window.removeEventListener("message", receiveMessage);

    if (user?.agregatorToken) {
      try {
        const { data } = await backend.users.getBalance(
          user.agregatorToken
        );

        user.balance = data.balance;
      } catch (error) {
        console.error("Error updating user balance:", error);
      }
    }

    document.body.style.overflow = "scroll";
  });
</script>

<div class="sportbook-content">
  <iframe
    class="sportbook-iframe"
    id="sportbook-iframe"
    bind:this={sportbookIframeEl}
    title="BetsW3"
    allow="fullscreen; picture-in-picture"
    src={sportbookGameUrl}
    frameborder="0"
    on:load={onIframeLoad}
  />
</div>

<style>
  @media only screen and (max-width: 1199px) {
    .sportbook-content {
      width: 100%;
    }

    .sportbook-iframe {
      height: 100vh;
      width: 100%;
    }
  }

  @media only screen and (min-width: 1200px) {
    .sportbook-content {
      width: 98.9vw;
    }

    .sportbook-iframe {
      width: 100%;
      height: 100vh;
    }
  }
</style>