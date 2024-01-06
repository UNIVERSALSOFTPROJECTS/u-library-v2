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
      else message = "✅ Se ha confirmado el cambio de clave";
    } catch (error) {
      alert("Error al confirmar cambio de clave");
    }

  });

  const closeModal = () => {
    open = false;
  };

  
</script>

<div class="recoverpass modal">
  <div class="recoverpass-body">
 
    
    <div class="recoverpass__body" style="background:#333">
      <div style="display:flex; justify-content:space-between"> <h4 style="margin:0; margin-bottom:10px; font-size:1.5em; color:white;">Confirmar cambio contraseña</h4>  <button class="btn close" on:click={closeModal} /> </div>
        <span style="color:white;">{message}.</span>
    </div>
  </div>
</div>

<style>
  
</style>
