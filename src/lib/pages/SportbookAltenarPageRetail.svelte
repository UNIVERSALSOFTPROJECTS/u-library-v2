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
  const SUPPORTED_CLIENT_CODES = ["DEEU37", "DECC35","LAEU47"];

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
  const guestURLdteu3 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6adbbc5d43044376a5c402a5&platformUrl=https%3A%2F%2Fec.deportetotal.bet&url=deportetotal.bet#/overview?playerToken=&playerId=&userMode=retail"
  const guestURLdteuLive3 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6adbbc5d43044376a5c402a5&platformUrl=https%3A%2F%2Fec.deportetotal.bet&url=deportetotal.bet#/live?playerToken=&playerId=&userMode=retail"
  const guestURLdecc3 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6adbbc5d43044376a5c402a5&platformUrl=https%3A%2F%2Fco.deportetotal.bet&url=deportetotal.bet#/overview?playerToken=&playerId=&userMode=retail"
  const guestURLdeccLive3 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6adbbc5d43044376a5c402a5&platformUrl=https%3A%2F%2Fco.deportetotal.bet&url=deportetotal.bet#/live?playerToken=&playerId=&userMode=retail"


  const guestURLLAEU47 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6af4c4d1df2b76b76ef79b12&platformUrl=https%3A%2F%2Flatinosport.bet&url=latinosport.bet#/overview"
  const guestURLLAEU47Live ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6af4c4d1df2b76b76ef79b12&platformUrl=https%3A%2F%2Flatinosport.bet&url=latinosport.bet#/live"
 
  // Organizaciones habilitadas para BetsW3 skin 3.
  const betsw3GuestUrlsByClient = {
    DEEU37: {
      live: guestURLdteuLive3,
      default: guestURLdteu3,
    },
    DECC35: {
      live: guestURLdeccLive3,
      default: guestURLdecc3,
    },
    LAEU47: {
      live: guestURLLAEU47Live,
      default: guestURLLAEU47,
    },
  };

  let readyDispatched = false;
  let lastLaunchKey = "";
  let launchRequestId = 0;

  // Cada vista conserva su propia URL.
  let sportbookUrls = {
    sport: "",
    live: "",
  };

  let loadingViews = {
    sport: false,
    live: false,
  };

  // Evita que una vista con error intente ejecutar el launch repetidamente.
  let failedViews = {
    sport: false,
    live: false,
  };

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
   * Identifica cuándo cambia la sesión y es necesario
   * limpiar las URLs almacenadas.
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
   * Primera carga y cambios de sesión.
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

        // Limpiar las URLs de la sesión anterior.
        sportbookUrls = {
          sport: "",
          live: "",
        };

        loadingViews = {
          sport: false,
          live: false,
        };

        failedViews = {
          sport: false,
          live: false,
        };

        readyDispatched = false;

        launchRequestId++;

        // Cargar inicialmente la vista activa.
        const initialView =
          active_view === "sportbooklive" ? "live" : "sport";

        openBetsW3(initialView);
      }
    } else if (lastLaunchKey) {
      lastLaunchKey = "";
      launchRequestId++;

      sportbookUrls = {
        sport: "",
        live: "",
      };

      loadingViews = {
        sport: false,
        live: false,
      };

      failedViews = {
        sport: false,
        live: false,
      };

      readyDispatched = false;
    }
  }

  /**
   * Detecta los cambios entre Deportes y En Vivo.
   *
   * Si la URL ya existe, la reutiliza.
   * Si todavía no existe, ejecuta el launch correspondiente.
   */
  $: if (lastLaunchKey && isSupportedClient) {
    active_view;

    const view = active_view === "sportbooklive" ? "live" : "sport";

    if (!sportbookUrls[view] && !loadingViews[view] && !failedViews[view]) {
      openBetsW3(view);
    }
  }

  /**
   * Obtiene la URL de invitados para la vista solicitada.
   */
  function getGuestUrl(view) {
    const clientUrls = betsw3GuestUrlsByClient[normalizedClientCode];
    
    if (!clientUrls) return "";
    
    return view === "live"
      ? clientUrls.live
      : clientUrls.default;
  }

  /**
   * Ejecuta el launch únicamente si la vista todavía
   * no tiene una URL almacenada.
   */
  async function openBetsW3(view = "sport") {
    if (
      loadingViews[view] ||
      sportbookUrls[view] ||
      failedViews[view]
    ) {
      return;
    }

    const requestId = launchRequestId;

    loadingViews = {
      ...loadingViews,
      [view]: true,
    };

    try {
      let url = "";

      if (userState === "loggedIn") {
        url = ut.getGameURL(
          GAMEAPI_URL,
          getBetsw3Game(),
          options.gameToken
        );

        url += view === "live"
          ? "&sport_view=live"
          : "&sport_view=sport";

        url += `&lang=${lang}&skin=${SPORTBOOK_SKIN}&r=url`;

        const response = await backend.game.getURL(url);

        if (requestId !== launchRequestId) return;

        url = response?.url || "";
      } else {
        url = getGuestUrl(view);
      }

      if (requestId !== launchRequestId) return;

      if (!url) {
        console.error(
          "No se encontró una URL de BetsW3 skin 3 para:",
          normalizedClientCode
        );

        failedViews = {
          ...failedViews,
          [view]: true,
        };

        return;
      }

      // Guardar la URL para reutilizarla posteriormente.
      sportbookUrls = {
        ...sportbookUrls,
        [view]: url,
      };
    } catch (error) {
      if (requestId !== launchRequestId) return;

      console.error(`BetsW3 ${view} launch error:`, error);

      failedViews = {
        ...failedViews,
        [view]: true,
      };
    } finally {
      if (requestId === launchRequestId) {
        loadingViews = {
          ...loadingViews,
          [view]: false,
        };
      }
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
   * Avisa al componente padre cuando el iframe terminó de cargar.
   */
  function onIframeLoad() {
    if (!readyDispatched) {
      readyDispatched = true;
      dispatch("ready");
    }
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
  {#if sportbookUrls.sport}
    <iframe
      class="sportbook-iframe"
      class:inactive-iframe={active_view !== "sportbook"}
      title="BetsW3 Deportes"
      allow="fullscreen; picture-in-picture"
      src={sportbookUrls.sport}
      frameborder="0"
      on:load={() => onIframeLoad("sport")}
    />
  {/if}

  {#if sportbookUrls.live}
    <iframe
      class="sportbook-iframe"
      class:inactive-iframe={active_view !== "sportbooklive"}
      title="BetsW3 En Vivo"
      allow="fullscreen; picture-in-picture"
      src={sportbookUrls.live}
      frameborder="0"
      on:load={() => onIframeLoad("live")}
    />
  {/if}
</div>

<style>
  @media only screen and (max-width: 1199px) {
    .sportbook-content {
      position: relative;
      width: 100%;
      height: 100vh;
    }
    
    .sportbook-iframe {
      width: 100%;
      height: 100%;
      border: 0;
      margin-top: 8px;
    }
    
    .inactive-iframe {
      display: none !important;
    }
  }

  @media only screen and (min-width: 1200px) {
    .sportbook-content {
      position: relative;
      width: 100%;
      height: 100vh;
    }

    .sportbook-iframe {
      width: 100%;
      height: 100%;
      border: 0;
      margin-top: 8px;
    }

    .inactive-iframe {
      display: none !important;
    }
  }
</style>