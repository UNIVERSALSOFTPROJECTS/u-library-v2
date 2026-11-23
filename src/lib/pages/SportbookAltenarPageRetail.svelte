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
  const SUPPORTED_CLIENT_CODES = [
    // Producción
    "DEEU37", "DECC35", "LAEU47", "DEMM36", "DEDD41", "PNCO", "PNEC", "PNBO", "DTPP",
    // Staging
    "DEPP57", "DEEU53",
  ];

  // Vistas de Altenar: el active_view que la abre, su título y su sport_view en el launch.
  const ALTENAR_VIEWS = {
    sport: { activeView: "sportbook", title: "BetsW3 Deportes" },
    live: { activeView: "sportbooklive", title: "BetsW3 En Vivo" },
    virtual: { activeView: "virtual", title: "BetsW3 Virtuales" },
    esports: { activeView: "esports", title: "BetsW3 E-Sports" },
  };
  const VIEW_NAMES = Object.keys(ALTENAR_VIEWS);
  const viewsWith = (value) => Object.fromEntries(VIEW_NAMES.map((view) => [view, value]));
  const viewOf = (activeView) =>
    VIEW_NAMES.find((view) => ALTENAR_VIEWS[view].activeView === activeView) || "sport";

  const bw3_id = "betsw3_2024";
  const bw3_v2_id = "betsw3_v2";
  const bw3_v2_virtuales_id = "betsw3_v2_virtuales";
  const bw3_v2_esports_id = "betsw3_v2_esports";

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
  // Producción
  const guestURLdteu3 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6adbbc5d43044376a5c402a5&platformUrl=https%3A%2F%2Fec.deportetotal.bet&url=deportetotal.bet#/overview?playerToken=&playerId=&userMode=retail"
  const guestURLdteuLive3 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6adbbc5d43044376a5c402a5&platformUrl=https%3A%2F%2Fec.deportetotal.bet&url=deportetotal.bet#/live?playerToken=&playerId=&userMode=retail"
  const guestURLdecc3 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6adbbc5d43044376a5c402a5&platformUrl=https%3A%2F%2Fco.deportetotal.bet&url=deportetotal.bet#/overview?playerToken=&playerId=&userMode=retail"
  const guestURLdeccLive3 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6adbbc5d43044376a5c402a5&platformUrl=https%3A%2F%2Fco.deportetotal.bet&url=deportetotal.bet#/live?playerToken=&playerId=&userMode=retail"

  const guestURLLAEU47 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6af4c4d1df2b76b76ef79b12&platformUrl=https%3A%2F%2Flatinosport.bet&url=latinosport.bet#/overview"
  const guestURLLAEU47Live ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6af4c4d1df2b76b76ef79b12&platformUrl=https%3A%2F%2Flatinosport.bet&url=latinosport.bet#/live"

  const guestURLDEDD413 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6adbbc5d43044376a5c402a5&platformUrl=https%3A%2F%2Fec.deportetotal.bet&url=deportetotal.bet#/overview?playerToken=&playerId=&userMode=retail"
  const guestURLDEDD41Live3 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6adbbc5d43044376a5c402a5&platformUrl=https%3A%2F%2Fec.deportetotal.bet&url=deportetotal.bet#/live?playerToken=&playerId=&userMode=retail"

  const guestURLDEMM36 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6adbbc5d43044376a5c402a5&platformUrl=https%3A%2F%2Fmxn.deportetotal.bet&url=mxn.deportetotal.bet#/overview"
  const guestURLDEMM36Live ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6adbbc5d43044376a5c402a5&platformUrl=https%3A%2F%2Fmxn.deportetotal.bet&url=mxn.deportetotal.bet#/live"

  const guestURLdpncoLive3 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6af627b652faf6adbb72741d&platformUrl=https%3A%2F%2Fco.playnova.club&url=mxn.playnova.club#/live"
  const guestURLdpnco3 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6af627b652faf6adbb72741d&platformUrl=https%3A%2F%2Fco.playnova.club&url=mxn.playnova.club#/overview"

  const guestURLpnec3 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6af627b652faf6adbb72741d&platformUrl=https%3A%2F%2Fplaynova.club&url=playnova.club#/overview"
  const guestURLpnecLive3 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6af627b652faf6adbb72741d&platformUrl=https%3A%2F%2Fplaynova.club&url=playnova.club#/live"

  const guestURLpnbo3 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6af627b652faf6adbb72741d&platformUrl=https%3A%2F%2Fbob.playnova.club&url=bob.playnova.club#/overview"
  const guestURLpnboLive3 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6af627b652faf6adbb72741d&platformUrl=https%3A%2F%2Fbob.playnova.club&url=bob.playnova.club#/live"

  // Staging
  const guestURLDEPP57 ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6adbbc5d43044376a5c402a5&platformUrl=https%3A%2F%2Fpe.deportetotal.bet&url=pe.deportetotal.bet#/overview"
  const guestURLDEPP57Live ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6adbbc5d43044376a5c402a5&platformUrl=https%3A%2F%2Fpe.deportetotal.bet&url=pe.deportetotal.bet#/live"
  const guestURLDEPP57Virtual ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6adbbc5d43044376a5c402a5&platformUrl=https%3A%2F%2Fpe.deportetotal.bet&url=pe.deportetotal.bet#/virtual"
  const guestURLDEPP57Esports ="https://biahosted.online/altenar_login.html?v=20260422-streaming-login-guard-inline&platformId=6adbbc5d43044376a5c402a5&platformUrl=https%3A%2F%2Fpe.deportetotal.bet&url=pe.deportetotal.bet#/esports"

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
    DEDD41:{
      live: guestURLDEDD41Live3,
      default: guestURLDEDD413,
    },
    DEMM36: {
      live: guestURLDEMM36Live,
      default: guestURLDEMM36,
    },
    DEPP57: {
      live: guestURLDEPP57Live,
      default: guestURLDEPP57,
      virtual: guestURLDEPP57Virtual,
      esports: guestURLDEPP57Esports,
    },
    PNCO: {
      live: guestURLdpncoLive3,
      default: guestURLdpnco3,
    },
    PNEC: {
      live: guestURLpnecLive3,
      default: guestURLpnec3,
    },
    PNBO: {
      live: guestURLpnboLive3,
      default: guestURLpnbo3,
    },
  };

  let readyDispatched = false;
  let lastLaunchKey = "";
  let launchRequestId = 0;

  // Cada vista conserva su propia URL.
  let sportbookUrls = viewsWith("");

  let loadingViews = viewsWith(false);

  // Evita que una vista con error intente ejecutar el launch repetidamente.
  let failedViews = viewsWith(false);

  let normalizedClientCode = "";
  let isSupportedClient = false;

  $: normalizedClientCode = String(clientCode || CLIENT_CODE || "")
    .trim()
    .toUpperCase();

  $: isSupportedClient = SUPPORTED_CLIENT_CODES.includes(normalizedClientCode);

  const isBetsw3GameId = (gameid) =>
    [bw3_id, bw3_v2_id, bw3_v2_virtuales_id, bw3_v2_esports_id].includes(gameid);

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
        sportbookUrls = viewsWith("");
        loadingViews = viewsWith(false);
        failedViews = viewsWith(false);

        readyDispatched = false;

        launchRequestId++;

        // Cargar inicialmente la vista activa.
        const initialView = viewOf(active_view);

        openBetsW3(initialView);
      }
    } else if (lastLaunchKey) {
      lastLaunchKey = "";
      launchRequestId++;

      sportbookUrls = viewsWith("");
      loadingViews = viewsWith(false);
      failedViews = viewsWith(false);

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

    const view = viewOf(active_view);

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

    return clientUrls[view === "sport" ? "default" : view] || "";
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

        url += `&sport_view=${view}`;

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
  {#each VIEW_NAMES as view (view)}
    {#if sportbookUrls[view]}
      <iframe
        class="sportbook-iframe"
        class:inactive-iframe={active_view !== ALTENAR_VIEWS[view].activeView}
        title={ALTENAR_VIEWS[view].title}
        allow="fullscreen; picture-in-picture"
        src={sportbookUrls[view]}
        frameborder="0"
        on:load={() => onIframeLoad(view)}
      />
    {/if}
  {/each}
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