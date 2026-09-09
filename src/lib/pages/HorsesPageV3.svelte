<script>
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import backend from '../../js/server.js';

    const dispatch = createEventDispatcher();

    export let user;
    export let gameToken;
    export let GAMEAPI_URL;
    export let visualCurrency = "";
    let iframeUrl = '';
    let loading = true;
    let errorMsg = '';
    let isRequestSent = false;

    $: if (GAMEAPI_URL && gameToken && !isRequestSent) {
        initHorsesLaunch();
    }
    async function initHorsesLaunch() {
        isRequestSent = true;
        try {
            loading = true;
            const launchUrl = `${GAMEAPI_URL}/launch?gameid=horses_2026&p=horses&b=UniversalRace&m=wb&sessionid=${gameToken}&r=url`;
            const response = await backend.game.getURL(launchUrl);
            if (response && response.status === "READY" && response.url) {
                iframeUrl = response.url + '&theme=shopretail' + (visualCurrency ? `&visualCurrency=${visualCurrency}` : '');
            } else {
                errorMsg = "URL not received or status not READY";
            }
        } catch (error) {
            console.error("Horses Error:", error);
            errorMsg = "Failed to initialize Horses session.";
        } finally {
            loading = false;
        }
    }
    // Avisa al padre cuando termina el launch (éxito o error).
    $: if (!loading && isRequestSent) {
        dispatch('ready');
    }
    onDestroy(() => {
        document.body.style.overflow = "scroll";
    });
    onMount(() => {
        document.body.style.overflow = "";
    });
</script>

<div class="horses-content">
    {#if loading}
        <div class="status-container"></div>
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
    .horses-content {
        position: relative;
        background-color: #1a1a1a;
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100dvh - 3.75rem);
        width: 100%;
    }
    .status-container {
        color: white;
        font-size: 1.1rem;
    }
    .error {
        color: #ff4444;
    }
    .horses-iframe {
        border: none;
        display: block;
        width: 100%;
        height: 100%;
    }
</style>