<script>
  import { onMount } from "svelte";
  import notify from "../../js/notify";
  import backend from "../../js/server";

  export let open;

  let message = "Confirmando cambio";
  

  onMount(async () => {
    try {
      const urlParams =  new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const {data} = await backend.users.confirmResetPassword(token);
      if(data=="err2") message = "❌ Fallo al Confirmar el cambio. Contacte al adminsitrador";
      else message = "✅ Se ha confirmado el cambio de clave. Intente iniciar sesion nuevamnete con la nueva clave";
    } catch (error) {
      alert("Error al confirmar cambio de clave");
    }

  });

  const closeModal = () => {
    open = false;
  };

  
</script>

<div style="padding:10px;">
  <div class="recoverpass-body">
 
    
    <div class="recoverpass__body">
      
        <span style="color:white;">{message}.</span>
    </div>
  </div>
</div>

<style>
  
</style>
