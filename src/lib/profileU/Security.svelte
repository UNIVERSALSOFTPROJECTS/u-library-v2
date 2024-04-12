<script>
  import notify from "../../js/notify";
  import backend from "../../js/server";
  export let showPasswordChangeModal;
  export let user;

  let securityData = {
    old_Password: "",
    new_Password: "",
    newpassword: ""
  };

  let showPassword = {
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  };

  const togglePasswordHide = (field) => {
    showPassword[field] = !showPassword[field];
  };

  const cleanInputs = () => {
    securityData.old_Password = "";
    securityData.new_Password = "";
    securityData.newpassword = "";
  };

  const changePassword = async () => {
    if (!securityData.old_Password) return notify.error("Ingrese su clave actual");
    if (securityData.new_Password.length < 6 || securityData.new_Password === "") return notify.error("Ingrese al menos 6 caracteres");
    if (securityData.new_Password !== securityData.newpassword) return notify.error("Las claves deben coincidir");

    try {
      let payload = { ...securityData };
      let response = await backend.u_user.changePassword(user.token, payload);
      console.log("resp: ", response);
    } catch (error) {
      console.log(error);
      notify.error("No se pudo cambiar la clave");
    }
    cleanInputs();
    close();
  };

  const close = () => {
    showPasswordChangeModal = false;
  };

  const oldPassword = (e) => {
    securityData.old_Password = e.target.value;
  };
  const newPassword = (e) => {
    securityData.new_Password = e.target.value;
  };
  const newConfirmPassword = (e) => {
    securityData.newpassword = e.target.value;
  };
</script>

<div class="security">
  <div class="security__ipt--pass">
    Contraseña Actual:
    <input
      type={showPassword.currentPassword ? 'text' : 'password'}
      class="ipt"
      autocomplete="off"
      on:input={oldPassword}
    />
    <button type="button" class="btn {showPassword.currentPassword ? 'no-eye' : 'eye'}" name="password" on:click={() => togglePasswordHide('currentPassword')}></button>
  </div>

  <div class="security__ipt--pass">
    Nueva Contraseña:
    <input
      type={showPassword.newPassword ? 'text' : 'password'}
      class="ipt"
      autocomplete="off"
      on:input={newPassword}
    />
    <button type="button" class="btn {showPassword.newPassword ? 'no-eye' : 'eye'}" name="password" on:click={() => togglePasswordHide('newPassword')}></button>
  </div>

  <div class="security__ipt--pass">
    Repetir Contraseña:
    <input
      type={showPassword.confirmPassword ? 'text' : 'password'}
      class="ipt"
      autocomplete="off"
      on:input={newConfirmPassword}
    />
    <button type="button" class="btn {showPassword.confirmPassword ? 'no-eye' : 'eye'}" name="password" on:click={() => togglePasswordHide('confirmPassword')}></button>
  </div>
  <button class="btn btn-save" on:click={changePassword}>Guardar</button>
</div>

<style>
  .btn-save {
    background-color: #c4b103;
    cursor: pointer;
    width: 60%;
  }
  .security__ipt--pass {
    width: 60%;
    display: grid;
    grid-template-columns: 80px 1fr 40px;
  }
  @media only screen and (max-width: 1200px) {
    .security {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      width: 100%;
      height: 100%;
      padding: 1rem;
    }
    .ipt {
      border: 1px solid rgb(208 206 206);
      color: #000;
    }
  }
  @media only screen and (min-width: 1201px) {
    .security {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      width: 100%;
      height: 100%;
    }
    .ipt {
      border: 1px solid rgb(208 206 206);
      color: #000;
    }
  }
</style>
