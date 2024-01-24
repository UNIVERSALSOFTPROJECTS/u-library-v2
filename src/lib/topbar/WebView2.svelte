<script>
  import { onMount } from "svelte";
  import ServerConnection from "../../js/server";
  import { fly } from "svelte/transition";
  import moment from "moment";
  export let user;
  export let billCollectorActive;
  export let configs=false;

  onMount(() => {
    loadConfigs();
  });

  $: {
    
    if (user && billCollectorActive) {
      sendToWinWebview('setUser', user);
    }
  }

  const onObserverUserLoggin = async (user) => {
    if (billCollectorActive) {
console.log("USUARIO LOGEADO:",user)
      sendToWinWebview('setUser', user);
    }else{
      console.log("Deves activar el billetero Gracias!.");
    }
  };

   const sendToWinWebview = (action, data) => {
    if (window.chrome && window.chrome.webview) {
      data.action = action;
      window.chrome.webview.postMessage(data);
    } else {
      console.log("Disponible: solo pra el billetero Gracia!.");
    }
  }

  const loadConfigs=()=>{
    let configs_ = localStorage.getItem("config");
    if(configs_) {
      configs_ = JSON.parse(configs_);
      configs = configs_;
      console.log("CONFIGS encontrados", configs_);
    }

  }
   
</script>