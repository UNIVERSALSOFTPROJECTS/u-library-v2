<script>
    import { onMount, onDestroy } from "svelte";
    import backend from '../../js/server.js';

    export let userState = "logout";
    export let user = {};
    export let mode = "online"; // Recibe 'terminal' o 'cashier' desde App.svelte
    export let GAME_JAVA_API_URL;
    export let GAMEAPI_URL;
    export let gameToken;

    const URLS = {
        terminal: "https://latam-games.virtustec.com/terminal/loader.js",
        cashier:  "https://latam-games.virtustec.com/cashier/loader.js",
    };

    const CONTAINER_IDS = {
        terminal: "golden-race-terminal-app",
        cashier:  "golden-race-cashier-app",
    };

    const SCRIPT_IDS = {
        terminal: "golden-race-terminal-loader",
        cashier:  "golden-race-cashier-loader",
    };

    let loader = null;
    let fetchedExtToken = null;

    $: containerId = CONTAINER_IDS[mode];

    function buildConfig() {
        const cfg = {
            script:    `#${SCRIPT_IDS[mode]}`,
            container: `#${CONTAINER_IDS[mode]}`
        };
        if (mode === "terminal") {
            cfg.hwId = "941eccb3-fd89-470c-87be-128504ac484a";
            if (userState === "loggedIn" && fetchedExtToken) {
                cfg.onlineHash = fetchedExtToken;
            }
        }
        else if (mode === "cashier" && userState === "loggedIn" && fetchedExtToken) {
            cfg.onlineHash = fetchedExtToken;
        }

        console.log("🔥 [GoldenRace Lib] CONFIG FINAL ENVIADA AL SDK:", cfg);
        return cfg;
    }

    async function fetchGoldenRaceToken() {
        if (userState !== "loggedIn" || !gameToken) return null;
        try {
            const launchUrl = `${GAMEAPI_URL}/launch?gameid=grv_2026&p=grv&b=GoldenRace&m=wb&sessionid=${gameToken}&r=url`;
            const launchData = await backend.game.getURL(launchUrl);

            if (launchData.status === "READY" && launchData.onlineHash) {
                return launchData.onlineHash;
            }
            throw new Error("No se recibió un onlineHash válido.");
        } catch (err) {
            console.error("🔴 [GoldenRace Lib] Error obteniendo el hash:", err);
            throw err;
        }
    }

    function initLoader() {
        if (mode !== "terminal" && mode !== "cashier") return;

        try {
            const cfg = buildConfig();

            if (mode === "terminal") {
                loader = window.GR.terminalLoader(cfg);
            } else {
                loader = window.GR.cashierLoader(cfg);
            }

            if (loader && loader.start) loader.start();
        } catch (e) {
            console.error("🔴 [GoldenRace Lib] Error al inicializar el loader:", e);
        }
    }

    function loadScript() {
        if (mode !== "terminal" && mode !== "cashier") return Promise.resolve();

        return new Promise((resolve, reject) => {
            if (document.getElementById(SCRIPT_IDS[mode])) return resolve();
            const script = document.createElement("script");
            script.src = URLS[mode];
            script.id  = SCRIPT_IDS[mode];
            script.onload  = () => resolve();
            script.onerror = () => reject(new Error(`Fallo al cargar script para: ${mode}`));
            document.head.appendChild(script);
        });
    }

    onMount(async () => {
        try {
            fetchedExtToken = await fetchGoldenRaceToken();
            await loadScript();
            initLoader();
        } catch (e) {
            console.error("🔴 [GoldenRace Lib] Error general en onMount:", e);
        }
    });

    onDestroy(() => {
        loader?.stop?.();
    });
</script>

<div class="gr-wrapper">
    {#if mode === "terminal" || mode === "cashier"}
        <div id={containerId} class="gr-container"></div>
    {/if}
</div>

<style>
    .gr-wrapper {
        position: relative;
        width: 100%;
        height: calc(100dvh - 3.75rem);
    }
    .gr-container {
        width: 100%;
        height: 100%;
        /* Aseguramos que tenga un fondo oscuro por si el iframe tarda en cargar */
        background-color: #1a1a1a;
    }
    :global(#golden-race-terminal-app iframe),
    :global(#golden-race-cashier-app iframe) {
        width: 100% !important;
        height: 100% !important;
        border: none;
    }
</style>