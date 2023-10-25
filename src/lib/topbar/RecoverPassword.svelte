<script>
  import { onMount } from "svelte";
  import notify from "../../js/notify";
  import backend from "../../js/server";

  export let open;

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
        notify.success("Un mensaje esta siendo enviado a su correo electronico")
        await backend.u_user.recoverPassword(payload)
    } catch (error) {
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
    <div class="recoverpass__header">
        <span>Ingrese su correo electronico</span>
        <button class="btn close" on:click={closeModal} />
    </div>
    <div class="recoverpass__body">
        <input bind:value={forgotPass.email} on:blur={validateEmail} class="ipt" type="email" placeholder="Ingrese su correo electronico" />
        <p>Ingrese el correo correspondiente, proocederemos a enviar un mensaje con la finalidad de cambiar su clave.
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
