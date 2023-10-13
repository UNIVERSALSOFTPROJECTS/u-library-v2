<script>
  import EventManager from "../../js/EventManager";
  import backend from "../../js/server";
  export let showPasswordChangeModal;
  export let user;

  let securityData = {};
  securityData.current_password = "";
  securityData.new_password = "";

  const cleanInputs = () => {
    securityData.current_password = "";
    securityData.new_password = "";
    securityData.newpassword = "";
  };

  const changePassword = async () => {
    if (!securityData.current_password || securityData.current_password == "") {
      EventManager.publish("notify", {
        mode: "error",
        msg: "Ingrese la contraseña actual",
      });
      return;
    }
    if (
      securityData.new_password.length < 6 ||
      securityData.new_password == ""
    ) {
      EventManager.publish("notify", {
        mode: "error",
        msg: "Mínimo 6 caracteres para las contraseñas",
      });
      return;
    }
    if (securityData.new_password != securityData.newpassword) {
      EventManager.publish("notify", {
        mode: "error",
        msg: "La nueva contraseña no coincide",
      });
      return;
    }
    try {
      let response = await backend.u_user.changePassword(
        user.token,
        securityData.newpassword,
        securityData.current_password
      );
      console.log("resp: ", response);
      /*if (response.errorCode == "CHANGE_PASSWORD_FAILED") {
        EventManager.publish("notify", {
          mode: "error",
          msg: "Contraseña actual incorrecta",
        });
      } else {
        EventManager.publish("notify", {
          mode: "error",
          msg: "Contraseña cambiada exitosamente",
        });
        cleanInputs();
      }*/
    } catch (error) {
      console.log(error);
    }
    close();
  };
  const close = () => {
    showPasswordChangeModal = false;
  };
</script>

<form
  class="u-form"
  autocomplete="off"
  method="post"
  on:submit={(e) => {
    e.preventDefault();
  }}
>
  <div class="form-container">
    <label for="sec-pass">Contraseña Actual</label>
    <input
      type="password"
      class="ipt"
      autocomplete="off"
      bind:value={securityData.current_password}
    />

    <label for="">Nueva Contraseña</label>
    <input
      type="password"
      class="ipt"
      autocomplete="off"
      bind:value={securityData.new_password}
    />

    <label for="">Repetir Contraseña</label>
    <input
      type="password"
      class="ipt"
      autocomplete="false"
      bind:value={securityData.newpassword}
    />
    <button class="ipt btn-save" on:click={changePassword}>Guardar</button>
  </div>
</form>

<style>
  .btn-save {
    background-color: #c4b103;
    cursor: pointer;
  }
  @media only screen and (max-width: 1200px) {
    .u-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      width: 100%;
    }
    .form-container{
      align-items: center;
      width: 50%;
      color: #000;
      padding: 0.5rem;
      margin: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 0.5rem;
    }
    .ipt {
      border: 1px solid rgb(208 206 206);
      color: #000;
    }
  }
  @media only screen and (min-width: 1201px) {
    .u-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      width: 100%;
    }
    .form-container{
      align-items: center;
      width: 60%;
      color: #000;
      padding: 0.5rem;
      margin: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 0.5rem;
    }
    .ipt {
      border: 1px solid rgb(208 206 206);
      color: #000;
    }
  }
</style>
