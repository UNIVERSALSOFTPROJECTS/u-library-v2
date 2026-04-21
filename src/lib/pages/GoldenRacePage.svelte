<script>
    // @ts-nocheck
    import { onMount, onDestroy } from "svelte";
    import backend from '../../js/server.js';

    export let userState = "logout";
    export let user = {};
    export let mode = "cashier";      // "terminal" | "cashier"
    export let hwId = "144147";              // para modo read-only sin login
    export let GAME_JAVA_API_URL = "https://api-oci-test.newapiusoft.com/game-api-jv-v2";
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
            return null;
        }
        try {
            const response = await fetch(`${GAME_JAVA_API_URL}/api/goldenrace/opengame`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ t: gameToken })
            });
            const data = await response.json();
            console.log("🟢 [GoldenRace Lib] Respuesta de API Java:", data);
            if (data.status === "READY") return data.onlineHash;
            throw new Error("No se pudo obtener el token de juego");
        } catch (err) {
            console.error("🔴 [GoldenRace Lib] Error en fetch:", err);
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

            loader.start?.();
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
        <div class="gr-loading">
            <span class="gr-spinner"></span>
            <p>Cargando GoldenRace...</p>
        </div>
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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 1rem;
        color: #ccc;
        font-size: 1.1rem;
    }

    .gr-spinner {
        width: 48px;
        height: 48px;
        border: 5px solid rgba(255,255,255,0.2);
        border-top-color: #fff;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

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