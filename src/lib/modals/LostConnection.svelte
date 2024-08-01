<script>
    import Modal from "../Modal.svelte";
    export let t;
    let disconnectModalOpen = false;
    let subModalOpened = "disconnect";

    function handleOffline() {
        disconnectModalOpen = true;
    }

    window.addEventListener("offline", handleOffline);
</script>

<Modal bind:open={disconnectModalOpen} bind:subModalOpened>
    <div class="modal-body">
        <svg
            width="4rem"
            height="4rem"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M21 3L15.6 3C15.2686 3 15 3.26863 15 3.6V3.6L15 9"
                stroke="#fff"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M15.5 3.5C18.7983 4.80851 21 8.29825 21 12C21 16.8715 16.9706 21 12 21C7.02944 21 3 16.8715 3 12C3 8.73514 4.80989 5.52512 7.5 4"
                stroke="#fff"
                stroke-width="3"
                stroke-linecap="round"
            />
        </svg>
        <b class="disconnect_tittle">{t("msg.lostConnection")}</b>
        <button
            class="btn disconnect__btn"
            on:click={() => {
                location.reload();
            }}>{t("msg.refresh")}</button
        >
    </div>
</Modal>
