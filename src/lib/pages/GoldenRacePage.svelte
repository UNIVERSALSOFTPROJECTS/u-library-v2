<script>
    import { onMount, onDestroy } from "svelte";
    import backend from '../../js/server.js';

    export let userState = "logout";
    export let mode = "online";
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
        if (userState === "loggedIn" && fetchedExtToken) {
            cfg.onlineHash = fetchedExtToken;
        }
        console.log("CONFIG:", cfg);
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
            console.error("Error token:", err);
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
            console.error("Error loader:", e);
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
            console.error("Error onMount:", e);
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
        background-color: #1a1a1a;
    }
    :global(#golden-race-terminal-app iframe),
    :global(#golden-race-cashier-app iframe) {
        width: 100% !important;
        height: 100% !important;
        border: none;
    }
</style>