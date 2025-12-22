<script>
  import { onMount } from "svelte";
  import ServerConnection from "../../js/server";

  export let onOk;
  export let onError;
  export let assetsUrl;
  export let platform;
  export let userGateway = "neco"; //neco/universal
  export let onOpenRecoverPassword;
  export let onOpenSignup;
  export let t; //traduccion

  let password = "";
  let username = "";
  let loadLogin = false;
  let typeView = localStorage.getItem('typeView') || "";
  let autoLogin = localStorage.getItem('autoSaved') ? true : false;
  let isAutoservice = autoLogin && typeView == "autoservice";
  let isAutoserviceError = false;
  let timerLogin;
  let isAutoLoginInProgress = false;
  let typeError = "";

  const loginEnter = (e) => {
    if (e.charCode === 13) loginClick();
  };

  function cancelAutologin(status) {
    if (!status) {
      clearTimeout(timerLogin);
      localStorage.removeItem('autoSaved');
      isAutoLoginInProgress = false;
    }
  }

  async function loginClick() {
    if (!username || !password) return onError(t("msg.allObligatory"));

    try {
      loadLogin = true;
      let data;
      let userType = 1;
      if (location.href.includes("terminal")) {
        userType = 2;
      }
      const response = await ServerConnection.u_user.login(username, password);
      
      // Verificar si la respuesta contiene un error
      if (response.data && response.data.status === 1 && response.data.errorCode) {
        throw { response: { data: response.data } };
      }
      
      data = response.data;
      if (!data || data.username == "") throw "USER_NOT_FOUND";
      if (data.claims) {
        let date = new Date();
        date.setDate(date.getDate() + 1);
        data.expireToken = data.claims.exp;
        data.initToken = data.claims.iat;
        data.playerId = data.id;
        delete data.claims;
      }
      // Guardar credenciales si está marcado recordar contraseña
      if (autoLogin && !localStorage.getItem('autoSaved')) {
        localStorage.setItem('autoSaved', `[{"user":"${username}", "pass":"${password}"}]`);
      }
      if (timerLogin) clearTimeout(timerLogin);
      isAutoLoginInProgress = false;
      //Formatear la propiedad "bonus" con el updatebalance
      loadLogin = false;
      onOk(data);
      
    } catch (error) {
      console.log("error: ", error);
      loadLogin = false;
      isAutoLoginInProgress = false;
      let errorMessage = t("msg.contactSupport");
      
      if (error.message == "Network Error") {
        errorMessage = t("msg.pageMaintenance");
      } else if (error.response && error.response.data) {
        const errorData = error.response.data;
        
        // Manejar estructura de error con errorCode
        if (errorData.errorCode) {
          if (
            errorData.errorCode == "NECO_LOGIN_FAILED" ||
            errorData.errorCode == "LOGIN_ERROR" || 
            errorData.errorCode == "WRONG_LOGIN_CREDENTIALS" 
          ) {
            errorMessage = t("msg.incorrectUserPass");
            typeError = "incorrectUserPass";
          } else if (errorData.message && errorData.message.includes("Connection refused")) {
            errorMessage = t("msg.pageMaintenance");
          }
        } 
        // Manejar estructura de error con message directo
        else if (errorData.message) {
          if (errorData.message.includes("Connection refused")) {
            errorMessage = t("msg.pageMaintenance");
          } else if (
            errorData.message == "NECO_LOGIN_FAILED" ||
            errorData.message == "LOGIN_ERROR" || 
            errorData.message == "WRONG_LOGIN_CREDENTIALS" 
          ) {
            errorMessage = t("msg.incorrectUserPass");
            typeError = "incorrectUserPass";
          }
        }
      }
      onError(errorMessage);
      if (isAutoservice) isAutoserviceError = true;
    }
  }

  onMount(() => {
    if (autoLogin) {
      try {
        let userSaved = JSON.parse(localStorage.getItem('autoSaved'));
        if (userSaved && userSaved[0]) {
          username = userSaved[0].user;
          password = userSaved[0].pass;
          isAutoLoginInProgress = true;
          timerLogin = setTimeout(function() { loginClick(); }, typeView == "autoservice" ? 2000 : 10000);
        }
      } catch (e) {
        console.error("Error loading saved credentials:", e);
        localStorage.removeItem('autoSaved');
        autoLogin = false;
        isAutoLoginInProgress = false;
      }
    }
  });

  $: cancelAutologin(autoLogin);
  $: isAutoservice = autoLogin && typeView == "autoservice";

</script>

{#if isAutoservice}
<div class="modal-body">
  {#if isAutoserviceError}
    <div class="login__autoservice error">
      <p>
        {typeError == 'incorrectUserPass' ? t("msg.incorrectUserPass") : t("login.autoserviceError")}
      </p>
      <button class="btn" on:click={()=>location.reload()}>{t("msg.refresh")}</button>
    </div>
  {:else}
    <div class="login__autoservice">
      <!-- esto de momento es solo para machines -->
      <div class="loading">
        <div>
          <b><b><b><b><b><b><b><b><b><b><b></b></b></b></b></b></b></b></b></b></b></b>
        </div>
      </div>
      <p>{t("lobby.loading")}</p>
    </div>
  {/if}
</div>
{/if}
<div class="modal-body {isAutoservice?'autoservice':''}">
  <div class="login__title">{t("login.title")}</div>
  <img
    class="login__logo"
    src="{assetsUrl}/{platform}/logo.png"
    alt="logo-{platform}"
    loading="eager"
  />
  <div></div>
  <form class="login__form" on:submit|preventDefault>
    <input
      type="text"
      class="ipt icon--user"
      placeholder={t("login.user")}
      autocapitalize="off"
      autocomplete="username"
      on:keypress={loginEnter}
      bind:value={username}
      disabled={autoLogin}
    />
    <input
      class="ipt icon--password"
      type="password"
      autocomplete="current-password"
      placeholder={t("login.password")}
      on:keypress={loginEnter}
      bind:value={password}
      disabled={autoLogin}
    />
    <div class="login__autosaved">
      <input type="checkbox" id="autosaved" bind:checked={autoLogin}>
      <label for="autosaved">{t("login.remember")}</label>
    </div>
    <button
      type="button"
      class="btn login"
      disabled={loadLogin}
      on:click={loginClick}
    >
      {#if loadLogin}
        <div class="loading">
          <p />
          <p />
          <p />
        </div>
      {:else}
        <p>{t("login.access")}</p>
      {/if}
    </button>
    <button type="button" on:click={onOpenSignup} class="btn openSignup"
      >{@html t("login.signupHere")}</button
    >
    <button
      type="button"
      on:click={onOpenRecoverPassword}
      class="btn openForgotPass"
      ><b>{t("login.forgetPassword")}</b></button
    >
  </form>
</div>
