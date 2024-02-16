<script>
    export let userState;
    export let active_view;
  import EventManager from "../js/EventManager";

EventManager.subscribe("duplicated_session", (event) => {
    console.log("SESION DUPLICADA");
    EventManager.publish("notify", { mode: "error", msg: "SESION DUPLICADA! - En breve se cerrara esta ventana." });
      
    userState = "logout";
    active_view = "home";
    sessionStorage.removeItem("user");
    console.log("Reincio del sitio en 3s");
    setTimeout(() => { location.reload();}, 3000);
});
</script>