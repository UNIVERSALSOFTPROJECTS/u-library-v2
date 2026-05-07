<script>
    import { onDestroy } from "svelte";
    import backend from '../../js/server.js';

    export let userState;
    export let user;
    export let gameToken;
    export let GAME_JAVA_API_URL;

    let iframeUrl = '';
    let loading = true;
    let errorMsg = '';
    let isRequestSent = false;
    $: if (GAME_JAVA_API_URL && gameToken && !isRequestSent) {
        initHorsesLaunch();
    }

    async function initHorsesLaunch() {
        isRequestSent = true;
        try {
            loading = true;

            const launchUrl = `${GAME_JAVA_API_URL}/api/horses/opengame?t=${gameToken}&gameid=horses_2026`;
            console.log("🚀 [HorsesPage] Launching via:", launchUrl);
            const response = await backend.game.getURL(launchUrl);
            if (response && response.status === "READY" && response.url) iframeUrl = response.url;
            else errorMsg = "URL not received or status not READY";
        } catch (error) {
            console.error("❌ [HorsesPage] Error:", error);
            errorMsg = "Failed to initialize Horses session.";
        } finally {
            loading = false;
        }
    }
    onDestroy(() => {
        document.body.style.overflow = "scroll";
    });
</script>

<div class="horses-content">
    {#if loading}
        <div class="status-container">
            <p>Iniciando Hípicas...</p>
        </div>
    {:else if errorMsg}
        <div class="status-container error">
            <p>{errorMsg}</p>
        </div>
    {:else}
        <iframe
                class="horses-iframe"
                id="horses-iframe"
                title="Horses Game"
                src={iframeUrl}
                frameborder="0"
                allowfullscreen
        ></iframe>
    {/if}
</div>

<style>
    /* Estilos alineados con SportbookPage para asegurar consistencia visual */
    .horses-content {
        position: relative;
        background-color: #1a1a1a;
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100dvh - 3.75rem);
    }

    .status-container {
        color: white;
        font-size: 1.1rem;
    }

    .error {
        color: #ff4444;
    }

    @media only screen and (max-width: 1199px) {
        .horses-content { width: 100%; }
        .horses-iframe { height: 100vh; width: 100%; }
    }

    @media only screen and (min-width: 1200px) {
        .horses-content { width: 98.9vw; }
        .horses-iframe { width: 100%; height: 100vh; }
    }
</style>