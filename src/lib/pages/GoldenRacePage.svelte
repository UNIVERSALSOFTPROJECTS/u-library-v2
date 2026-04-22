<script>
    // @ts-nocheck
    import { onMount, onDestroy } from "svelte";
    import backend from '../../js/server.js';

    export let userState = "logout";
    export let user = {};
    export let mode = "cashier";      // "terminal" | "cashier"
    export let hwId = "144147";              // para modo read-only sin login
    export let GAME_JAVA_API_URL = "https://api-oci-test.newapiusoft.com/game-api-jv-v2";
    export let GAMEAPI_URL;
    export let gameToken;

    $: console.log("🔵 [GoldenRace Lib] Props actuales -> userState:", userState, "| gameToken:", gameToken);
    // ── URLs ────────────────────────────────────────────────────────────────────
    const URLS = {
        terminal: "https://latam-games.virtustec.com/terminal/loader.js",
        cashier:  "https://latam-games.virtustec.com/cashier/loader.js",
    };

    const CONTAINER_IDS = {
        terminal: "golden-race-terminal-app",
        cashier:  "golden-race-cashier-app",
    };

    const SCRIPT_IDS = {
        terminal: "golden-race-terminal-script",
        cashier:  "golden-race-cashier-script",
    };

    // ── Estado ──────────────────────────────────────────────────────────────────
    let loader = null;
    let loading = true;
    let error = null;
    let fetchedExtToken = null;

    $: containerId = CONTAINER_IDS[mode];

    // ── Config ──────────────────────────────────────────────────────────────────
    function buildConfig() {
        const cfg = {
            script:    `#${SCRIPT_IDS[mode]}`,
            container: `#${CONTAINER_IDS[mode]}`,
            lang: "es",
        };
        if (userState === "loggedIn" && fetchedExtToken) {
            cfg.onlineHash = fetchedExtToken;
        } else if (hwId) {
            cfg.hwId = hwId;
        }
        console.log("🔥 [GoldenRace Lib] CONFIG FINAL ENVIADA AL SDK:", cfg);
        return cfg;
    }

    async function fetchGoldenRaceToken() {
        console.log("🟡 [GoldenRace Lib] Iniciando fetch... userState es:", userState);
        if (userState !== "loggedIn") {
            console.log("🟠 [GoldenRace Lib] Usuario no logueado. Abortando fetch.");
            return null;
        }
        if (!gameToken) {
            console.error("🔴 [GoldenRace Lib] Error: gameToken (Pase VIP) está vacío o indefinido.");
            throw new Error("Falta el token de autorización (gameToken)");
        }
        try {
            console.log("🟡 [GoldenRace Lib] Paso 1: Solicitando /launch a Node.js para guardar la sesión...");
            const launchUrl = `${GAMEAPI_URL}/launch?gameid=grv_2026&p=grv&b=GoldenRace&m=wb&sessionid=${gameToken}`;
            console.log("   -> URL generada para Node:", launchUrl);
            const launchResponse = await fetch(launchUrl);
            const launchData = await launchResponse.json();
            console.log("🟢 [GoldenRace Lib] Paso 1 Completado. Respuesta de Node.js:", launchData);
            if (!launchData || !launchData.url) {
                throw new Error("Node.js no devolvió la URL de Java en el atributo 'url'");
            }
            console.log("🟡 [GoldenRace Lib] Paso 2: Consumiendo URL de Java devuelta por Node...");
            console.log("   -> URL de Java a consumir:", launchData.url);
            const javaResponse = await fetch(launchData.url);
            const javaData = await javaResponse.json();
            console.log("🟢 [GoldenRace Lib] Paso 2 Completado. Respuesta de API Java:", javaData);
            if (javaData.status === "READY" && javaData.onlineHash) {
                console.log("🚀 [GoldenRace Lib] Hash obtenido con éxito. Listo para inicializar SDK.");
                return javaData.onlineHash;
            }
            throw new Error("Java devolvió un estado inesperado o no devolvió el onlineHash");
        } catch (err) {
            console.error("🔴 [GoldenRace Lib] Error crítico en la cadena de peticiones:", err);
            throw err;
        }
    }
    // ── Init ────────────────────────────────────────────────────────────────────
    function initLoader() {
        try {
            const cfg = buildConfig();
            const callbacks = {
                onLogin(account, balances, content, user, sessionContext) {
                    console.log(`[GoldenRace ${mode}] onLogin`, account, balances);
                    loading = false;
                },
                onLogout() { console.log(`[GoldenRace ${mode}] onLogout`); },
                onUpdateWallet(walletStatus) { console.log(`[GoldenRace ${mode}] onUpdateWallet`, walletStatus); },
                onGameSelected(playlist) { console.log(`[GoldenRace ${mode}] onGameSelected`, playlist); },
            };
            if (mode === "terminal") {
                loader = window.GR.terminalLoader(cfg, callbacks);
            } else {
                loader = window.GR.cashierLoader(cfg, callbacks);
            }
            if (loader && loader.start) {
                loader.start();
            }
            loading = false;
        } catch (e) {
            console.error(`[GoldenRace ${mode}] Error:`, e);
            error = e.message || "Error al cargar GoldenRace";
            loading = false;
        }
    }

    // ── Script loader ───────────────────────────────────────────────────────────
    function loadScript() {
        return new Promise((resolve, reject) => {
            if (document.getElementById(SCRIPT_IDS[mode])) return resolve();
            const script = document.createElement("script");
            script.src = URLS[mode];
            script.id  = SCRIPT_IDS[mode];
            script.onload  = () => resolve();
            script.onerror = () => reject(new Error(`No se pudo cargar el script (${mode})`));
            document.head.appendChild(script);
        });
    }

    // ── Ciclo de vida ───────────────────────────────────────────────────────────
    onMount(async () => {
        try {
            fetchedExtToken = await fetchGoldenRaceToken();
            await loadScript();
            initLoader();
        } catch (e) {
            error = e.message;
            loading = false;
        }
    });

    onDestroy(() => {
        loader?.stop?.();
    });
</script>

<div class="gr-wrapper">
    {#if loading}
        <div class="gr-loading"></div>
    {/if}
    {#if error}
        <div class="gr-error">
            <p>⚠️ {error}</p>
        </div>
    {/if}
    <div id={containerId} class="gr-container" class:gr-hidden={loading}></div>
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
    }
    :global(#golden-race-terminal-app iframe),
    :global(#golden-race-cashier-app iframe) {
        width: 100% !important;
        height: 100% !important;
        border: none;
    }

    .gr-hidden { display: none; }
    .gr-loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #1a1a1a;
        z-index: 10;
    }
    .gr-error {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #f87171;
        font-size: 1.1rem;
    }
    @media only screen and (max-width: 1199px) {
        .gr-wrapper { height: 100vh; }
    }
</style>