<script>

  import ServerConnection from "../../js/server";
  import InputPassword from "../input/InputPassword.svelte";
  export let onOk;
  export let onError;
  export let assetsUrl;
  export let platform;
  export let userGateway = "neco"; //neco/universal
  export let onOpenRecoverPass;
  export let t;//traduccion

  let password;
  let username;
  let loadLogin = false;
  
  const loginEnter = (e) => { if (e.charCode === 13) loginClick();};

  async function loginClick() {
    if (!username || !password)
      return onError(t("msg.allObligatory"));
    try {
      loadLogin = true;
      let data;
      if (userGateway == "neco")
        data = await ServerConnection.users.login(username, password);
      else data = await ServerConnection.u_user.login(username, password);
      data = data.data;
      if (data.username == "") throw "USER_NOT_FOUND";
      //Formatear la propiedad "bonus"
      const formattedBonus = [];
      for (const type in data.bonus) {
        if (data.bonus.hasOwnProperty(type)) {
          const currency = Object.keys(data.bonus[type])[0];
          const amount = data.bonus[type][currency];

          formattedBonus.push({
            type: type,
            currency: currency,
            amount: amount
          });
        }
      }
      if(data.claims){
        let date = new Date();
        date.setDate(date.getDate() + 1);
        data.expireToken = data.claims.exp;
        data.playerId = data.id;
        delete data.claims;
      }
      data.bonus = formattedBonus;
      sessionStorage.setItem("user", JSON.stringify(data));
      console.log("Donde esta la info", data);
      onOk(data);
    } catch (error) {
      console.log("error: ", error);
      if (error.message == "Network Error" || error.response.data.message.includes("Connection refused"))
        error = t("msg.pageMaintenance");
      else if (error.response.data.message == "NECO_LOGIN_FAILED")
        error = t("msg.incorrectUserPass");
      else error = t("msg.contactSupport");//si aparece esto, es un tipo de error nuevo y se tieneque debbugear
      onError(error);
      loadLogin = false;
    }
  }
</script>

<div class="modal-body">
  <div class="login__title">{t("login.title")}</div>
  <img class="login__logo" src="{assetsUrl}/{platform}/logo.png" alt="logo-{platform}"/>
  <div></div>
  <div class="login__form">
    <input type="text" class="ipt" placeholder={t("login.user")} autocapitalize="off" on:keypress={loginEnter} bind:value={username}/>
    <div class="login__ipt--pass">
      <InputPassword bind:password {loginEnter} t={t} />
    </div>
    <button type="button" class="btn login" disabled={loadLogin} on:click={loginClick}>
      {#if loadLogin}
        <div class="loading"><p/><p/><p/></div>
      {:else}
        <p>{t("login.access")}</p>
      {/if}
    </button>
    <button on:click={onOpenRecoverPass} class="btn link">{t("login.forgetPassword")}</button>
  </div>
</div>