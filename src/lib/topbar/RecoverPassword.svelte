<script>
  import { onMount } from "svelte";
  import notify from "../../js/notify";
  import backend from "../../js/server";

  export let open;

  let forgotPass = {}

  onMount(() => {});

  const closeModal = () => {
    console.log("cerrando");
    open = false;
  };

  

  const recoverPass = async() => {
    try {
        let payload = {...forgotPass}
        await backend.u_user.recoverPassword(payload)
        notify.success("Un mensaje esta siendo enviado a su correo electronico")
    } catch (error) {
        notify.error("Surgio un error, contacte a soporte");
    }
    open = false;
  }
</script>

<div class="recoverpass modal">
  <div class="recoverpass-body">
    <div class="recoverpass__header">
        <span>Ingrese su correo electronico</span>
        <button class="btn close" on:click={closeModal} />
    </div>
    <div class="recoverpass__body">
        <input bind:value={forgotPass.email} class="ipt" type="email" placeholder="Ingrese su correo electronico" />
        <p>Al correo ingresado se le enviara un mensaje con la opcion de cambiar su clave.
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
