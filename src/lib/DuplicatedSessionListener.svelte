<script>
    export let userState;
    export let active_view;
    export let t;
    import EventManager from "../js/EventManager";

    EventManager.subscribe("duplicated_session", () => {
        EventManager.publish("notify", { mode: "warning", msg: t("msg.duplicatedSession")  });
        userState = "logout";
        active_view = "home";
        sessionStorage.removeItem("user");
        setTimeout(() => { location.reload();}, 3000);
    });
</script>