<script>
    import EventManager from "../js/EventManager";

    export let userState;
    export let active_view;
    export let t;

    let showDisconnectedModal = false;
    let message = "";

    EventManager.subscribe("CASHIER_DISCONNECTED", () => {
        showDisconnectedModal = true;
        EventManager.publish("notify", { mode: "warning", msg: t("msg.duplicatedSession")  });
    
    });
    EventManager.subscribe("CASHIER_CONNECT", () => {
        showDisconnectedModal = false;

    });
</script>

{#if showDisconnectedModal}
<div class="overlay">
    <div class="modal">
        <div class="icon">⚠️</div>

        <h2>{t("alert.title") || "Cajero desconectado"}</h2>

        <p>
            {message || "Se perdió la conexión con el cajero. La aplicación se recargará automáticamente."}
        </p>

        <div class="spinner"></div>
    </div>
</div>
{/if}

<style>
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.65);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999;
}

.modal {
    width: min(420px, 90vw);
    background: white;
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 20px 50px rgba(0,0,0,.35);
}

.icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

h2 {
    color: #d32f2f;
    margin-bottom: .8rem;
}

p {
    margin-bottom: 1.5rem;
    line-height: 1.5;
}

.spinner {
    width: 36px;
    height: 36px;
    margin: auto;
    border: 4px solid #ddd;
    border-top: 4px solid #d32f2f;
    border-radius: 50%;
    animation: spin .8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>