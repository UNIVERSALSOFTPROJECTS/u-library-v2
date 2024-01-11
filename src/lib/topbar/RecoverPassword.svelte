<script>
  import { onMount } from "svelte";
  import backend from "../../js/server";

  export let userGateway="neco";
  export let open;
  export let t;
  export let onOk;
  export let onError;

  let forgotPass = {}
  let loadRecoverPasword = false;
  let newPassword;
  let redirectURL;
  let codeSms;
  let view = "recover";

  const avoidSubmit = (e) =>{ e.preventDefault(); }
  const justNumbersValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\d]/g, "") }

  const sendRecoverPassword = async() => {
    let isEmailValid = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/.test(forgotPass.email);
    if (!isEmailValid) return onError(t("msg.emailInvalid"));
    try {
      loadRecoverPasword = true;
      let payload = {...forgotPass}
      const {data} = (userGateway=='neco')?await backend.users.resetPassword(payload):await backend.u_user.recoverPassword(payload)
      if (data.response_code=='SUCCESS') {
        onOk(t("msg.sendSms"));
        newPassword = data.data.messages[0].body.match(/password: (.+)$/)[1];
        redirectURL = data.data.messages[0].body.match(/ aqui (.+?) este /)[1];
      }else{
        onError(t("msg.emailInvalid"));
      }
    } catch (error) {
      console.log(error);
      onError(t("msg.contactSupport"));
    }
    loadRecoverPasword = false;
  }
  const validateCodeSMS = () => { newPassword == codeSms? window.location.href = redirectURL : onError(t("msg.incorrectSms")); }

  onMount(async () => {
    let currentUrl = window.location.href;
    if(/resetPassword/.test(currentUrl)) {
      view = "reset";
      try {
         const urlParams =  new URLSearchParams(window.location.search);
         const token = urlParams.get('token');
         const {data} = await backend.users.confirmResetPassword(token);
         if (data.resp == "OK") {
          onOk(t("msg.confirmedChangePassword"));
          let url = new URL(currentUrl);
          let urlOriginal = url.origin;
          setTimeout(() => { window.location.href = urlOriginal;}, 3000);
         }else{
          onError(t("msg.contactSupport"));
         }
       } catch (error) {
        console.log(error);
        onError(t("msg.contactSupport"));
       }
       open = false;
    }
  });
</script>

<div class="modal-body">
    {#if view == "recover"}
      <form class="recoverPassword__form" on:submit={avoidSubmit}>
        {#if newPassword}
          <p>{t("recoverPassword.infoSms")}</p>
          <input type="number" min="0" class="ipt" placeholder="00000000" autocomplete="off" bind:value={codeSms} on:input={justNumbersValidate}>
          <button type="button" class="btn send" on:click={validateCodeSMS}>{t("recoverPassword.send")}</button>
        {:else}
          <p>{t("login.forgetPassword")}</p>
          <p>{t("recoverPassword.info")}</p>
          <input type="email" class="ipt" placeholder={t("recoverPassword.email")} bind:value={forgotPass.email}/>
          <button type="button" class="btn send" on:click={sendRecoverPassword} disabled={!forgotPass.email||loadRecoverPasword }>
            {#if loadRecoverPasword}
              <div class="loading"><p/><p/><p/></div>
            {:else}
              {t("recoverPassword.send")}
            {/if}
          </button>
        {/if}
      </form>
    {:else}
      <div class="recoverPassword__reset">
        <div class="loading">
          <p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>
        </div>
        <p>{t("recoverPassword.confirmingChangePass")}</p>
      </div>
    {/if}
</div>