<script>
  import { onMount } from "svelte";
  import EventManager from "../../js/EventManager";
  import notify from "../../js/notify";
  import backend from "../../js/server";

  export let open;
  export let color='dark';
  export let userGateway="neco";

  let forgotPass = {}
  let isEmail;

  onMount(() => {
    notify.setEM(EventManager);
   });

  const closeModal = () => {
    open = false;
  };

  

  const recoverPass = async() => {
    if(!forgotPass.email) return notify.error("Ingrese su correo");
    if (!isEmail) return notify.error("Su correo tiene el formato incorrecto");
    try {
        let payload = {...forgotPass}
        const {data} = (userGateway=='neco')? 
                    await backend.users.resetPassword(payload):
                    await backend.u_user.recoverPassword(payload)

        if(data && data.response_code && data.response_code=='ERR_US') {
          notify.error("Fallo recuepracion");
        }else{
          notify.success("Un mensaje fue enviado a su telefono");
          closeModal();
        }
        
        
        

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

<div style="padding:10px;">
  <div class="recoverpass-body" style="margin-top:20px;">
    
    <div>
       <input bind:value={forgotPass.email} on:blur={validateEmail} class="ipt" type="email" placeholder="Ingrese su correo electronico" />
        
       <p style="color:#fff; line-height:1.2em; margin-top:10px; margin-bottom:10px;">Ingrese el correo correspondiente, proocederemos a enviar un mensaje con la finalidad de cambiar su clave.
        Verificar que su correo se el correcto.
        </p>
        <button on:click={recoverPass} class="btn recoverpass--btn" style="background:#333">Enviar</button>
    </div>
  </div>
</div>

<style>
  
  .ipt{
    border: 1px solid rgb(222, 222, 222);
  }
</style>
