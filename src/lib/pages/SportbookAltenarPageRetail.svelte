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
  let lastLaunchKey = "";
  let launchRequestId = 0;
  let lastAppliedView = "";

  let normalizedClientCode = "";
  let isSupportedClient = false;

  $: normalizedClientCode = String(clientCode || CLIENT_CODE || "")
    .trim()
    .toUpperCase();

  $: isSupportedClient = SUPPORTED_CLIENT_CODES.includes(normalizedClientCode);

  const isBetsw3GameId = (gameid) =>
    [bw3_id, bw3_v2_id].includes(gameid);

  const getBetsw3Game = () => ({
    ...games.BetW3,
    gameid: isBetsw3GameId(options?.gameid)
      ? options.gameid
      : games.BetW3.gameid,
  });

  /**
   * Identifica cuándo es necesario volver a ejecutar el launch.
   * active_view no forma parte de esta clave porque el cambio
   * entre Deportes y En Vivo se realiza mediante la ruta del iframe.
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
    mode;

    if (isSupportedClient && isBetsw3GameId(options.gameid)) {
      const key = getLaunchKey();

      if (key !== lastLaunchKey) {
        lastLaunchKey = key;
        openBetsW3();
      }
    } else {
      lastLaunchKey = "";
      launchRequestId++;
      sportbookGameUrl = "";
      readyDispatched = false;
      lastAppliedView = "";
    }
  }

  /**
   * Alterna entre Deportes y En Vivo modificando únicamente
   * la ruta del hash y conservando los parámetros del jugador.
   */
  $: if (sportbookGameUrl && readyDispatched) {
    active_view;

    const view = active_view === "sportbooklive" ? "live" : "overview";

    if (view !== lastAppliedView) {
      changeBetsw3View(view);
    }
  }

  function changeBetsw3View(view) {
    if (!sportbookIframeEl) return;

    const route = view === "live" ? "/live" : "/overview";
    const hashIndex = sportbookGameUrl.indexOf("#");

    if (hashIndex === -1) return;

    const hash = sportbookGameUrl.substring(hashIndex);
    const updatedHash = hash.replace(/^#\/[^?]*/, `#${route}`);

    if (hash === updatedHash) {
      lastAppliedView = view;
      return;
    }

    sportbookIframeEl.contentWindow.location.hash =
      updatedHash.substring(1);

    lastAppliedView = view;
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
    const requestId = ++launchRequestId;

    readyDispatched = false;
    lastAppliedView = "";
    sportbookGameUrl = "";

    try {
      let url = "";

      if (userState === "loggedIn") {
        url = ut.getGameURL(
          GAMEAPI_URL,
          getBetsw3Game(),
          options.gameToken
        );

        url += `&lang=${lang}&skin=${SPORTBOOK_SKIN}&r=url`;

        const response = await backend.game.getURL(url);

        if (requestId !== launchRequestId) return;

        url = response?.url || "";
      } else {
        url = betsw3GuestUrlsByClient[normalizedClientCode] || "";
      }

      if (requestId !== launchRequestId) return;

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
      if (requestId !== launchRequestId) return;

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
    launchRequestId++;

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
