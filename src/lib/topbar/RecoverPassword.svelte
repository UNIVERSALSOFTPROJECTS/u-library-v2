<script>
  import { onMount } from "svelte";
  import notify from "../../js/notify";
  import backend from "../../js/server";

  export let open;
  export let color='dark';
  export let userGateway="neco";

  let forgotPass = {}
  let isEmail;

  onMount(() => {});

  const closeModal = () => {
    open = false;
  };

  

  const recoverPass = async() => {
    if(!forgotPass.email) return notify.error("Ingrese su correo");
    if (!isEmail) return notify.error("Su correo tiene el formato incorrecto");
    try {
        let payload = {...forgotPass}
        if(userGateway=='neco') await backend.users.resetPassword(payload)
        else await backend.u_user.recoverPassword(payload)
        closeModal();
        notify.success("Un mensaje esta siendo enviado a su correo electronico");

    } catch (error) {
      console.log(error);
        notify.error("Surgio un error, contacte a soporte");
    }
    open = false;
  }

  const validateEmail = async() => {
    isEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(forgotPass.email);
    if (!isEmail) return notify.error("Su correo tiene el formato incorrecto")
  }
</script>

<div class="recoverpass modal">
  <div class="recoverpass-body">
 
    
    <div class="recoverpass__body" style="background:#333">
      <div style="display:flex; justify-content:space-between"> <h4 style="margin:0; margin-bottom:10px; font-size:1.5em; color:white;">Recuperar Contraseña</h4>  <button class="btn close" on:click={closeModal} /> </div>
        <input bind:value={forgotPass.email} on:blur={validateEmail} class="ipt" type="email" placeholder="Ingrese su correo electronico" />
        <p style="color:#fff">Ingrese el correo correspondiente, proocederemos a enviar un mensaje con la finalidad de cambiar su clave.
            <br>Verificar que su correo se el correcto.
        </p>
        <button on:click={recoverPass} class="btn recoverpass--btn">Enviar</button>
    </div>
  </div>
</div>

<style>
  
  .ipt{
    border: 1px solid rgb(222, 222, 222);
  }
</style>
