<script>
  import { onMount } from "svelte";
  import ServerConnection from "../../js/server";
  import notify from "../../js/notify";

  export let onOk;
  export let onError;
  export let assetsUrl;
  export let platform;
  export let userGateway = "neco"; //neco/universal
  export let onOpenRecoverPassword;
  export let t;//traduccion
  export let isOauth=false;

  let password = "";
  let username = "";
  let loadLogin = false;
  let showPassword = false;

  let userGmail;

	const dataPassword = (e) =>{ password = e.target.value }
	const togglePasswordHide = () => { showPassword =! showPassword }
  const loginEnter = (e) => { if (e.charCode === 13) loginClick();};

  onMount(() => {
    loadScript("https://accounts.google.com/gsi/client").then( data  => {
      console.log("Script loaded successfully", data);
      setTimeout( ()=>{
        console.log("Goolgle Loaded: " , window.google); 
        window.google.accounts.id.initialize({
        client_id: "632683480398-i9lkrr218mhu4r3dbsq5eq5sai5g6tch.apps.googleusercontent.com",
        callback: handleSigninGoogleOAuth2
      }) 
      window.google.accounts.id.renderButton(document.getElementById("g_id_signin"), {});
      },1000 );
    }).catch( err => { console.error(err); });

  });

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
      //Formatear la propiedad "bonus" con el updatebalance
      if(data.claims){
        let date = new Date();
        date.setDate(date.getDate() + 1);
        data.expireToken = data.claims.exp;
        data.initToken = data.claims.iat;
        data.playerId = data.id;
        delete data.claims;
      }
      let updateBalance = await ServerConnection.users.getBalance(data.agregatorToken);
      const { balance, bonus_global, bonus_horses, bonus_slot, bonus_sportbook } = updateBalance.data;
      data.balance         = balance;
      data.bonus_global    = bonus_global;
      data.bonus_horses    = bonus_horses;
      data.bonus_slot      = bonus_slot;
      data.bonus_sportbook = bonus_sportbook;
      data.bonus_sumTotal  = bonus_global + bonus_horses + bonus_slot + bonus_sportbook;
      sessionStorage.setItem("user", JSON.stringify(data));
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

  const loadScript = (FILE_URL, async = true, type = "text/javascript") => {
    return new Promise((resolve, reject) => {
      try {
        const scriptEle = document.createElement("script");
        scriptEle.type = type;
        scriptEle.async = async;
        scriptEle.defer = true;
        scriptEle.src =FILE_URL;
        scriptEle.addEventListener("load", (ev) => { resolve({ status: true }); });
        scriptEle.addEventListener("error", (ev) => { reject({status: false, message: `Failed to load the script ${FILE_URL}`});});
        document.body.appendChild(scriptEle);
      } catch (error) {
        reject(error);
      }
    });
  };

  const parseJwt = (token)=>{
    return JSON.parse(atob(token.split('.')[1]));
  }

  const handleSigninGoogleOAuth2 = async (event) => {
    try {
      notify.loading("identificando");
      userGmail = parseJwt(event.credential);
      console.log("USUARIO DE GMAIL: " , userGmail);
      username = userGmail.email;
      password = userGmail.sub;
      loginClick();
    } catch (e) {
      let msg = "Error!";
      notify.error(msg);
    }
    notify.loading(false);
  }

  const avoidSubmit = (e) =>{ e.preventDefault(); }
</script>

<div class="modal-body" on:submit={avoidSubmit}>
  <div class="login__title">{t("login.title")}</div>
  <img class="login__logo" src="{assetsUrl}/{platform}/logo.png" alt="logo-{platform}"/>
  <div></div>
  <form class="login__form">
    {#if isOauth}
      <div id="g_id_signin"></div>
    {/if}
    <input type="text" class="ipt icon--user" placeholder={t("login.user")} autocapitalize="off" autocomplete="username" on:keypress={loginEnter} bind:value={username} disabled={userGmail}/>
    <div class="login__ipt--pass">
      <input class="ipt icon--password" type={showPassword ? 'text' : 'password'} autocomplete="current-password"  placeholder={t("login.password")} on:keypress={loginEnter} on:input={dataPassword} disabled={userGmail}>
      <button type="button" class="btn {showPassword ? 'no-eye' : 'eye'}" name="password" on:click={togglePasswordHide}></button>
    </div>
    <button type="button" class="btn login" disabled={loadLogin} on:click={loginClick}>
      {#if loadLogin}
        <div class="loading"><p/><p/><p/></div>
      {:else}
        <p>{t("login.access")}</p>
      {/if}
    </button>
    <button type="button" on:click={onOpenRecoverPassword} class="btn link">{t("login.forgetPassword")}</button>
  </form>
</div>