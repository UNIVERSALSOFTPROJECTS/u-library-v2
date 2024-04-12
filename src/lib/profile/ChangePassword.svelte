<script>
    import InputPassword from "../input/InputPassword.svelte";

    export let ServerConnection;
    export let user;
    export let onOk;
    export let onError;
    export let t;

    let loadChangePass;
    let password;
    let newPassword;
    let repeatNewPassword;

    const avoidSubmit = (e) =>{ e.preventDefault(); }

    const changePassword = async() => {
        if (!password || !newPassword || !repeatNewPassword) return onError(t("msg.allObligatory"));
        if (newPassword.length < 5 || repeatNewPassword.length < 5) return onError(t("msg.passwordMin5"));
        if (newPassword != repeatNewPassword) return onError(t("msg.passwordNotMatch"));
        try {
            loadChangePass = true;
            const response = await ServerConnection.users.changePassword(user.token,newPassword,password);
            if (response.data.username == user.username) {
                password = "";
                newPassword = "";
                repeatNewPassword = "";
                onOk(t("msg.changePassSuccess"));
            }else{
                throw new Error();
            }
        } catch (error) {
            if (error.response.data.message.includes("Token Incorrecto")) error =  t("msg.incorrectPass");
            else error = t("msg.contactSupport");
            return onError(error);
        }
        finally{
            loadChangePass = false;
        }
    }
</script>

<form class="changePassword" on:submit={avoidSubmit}>
    <p>{t("profile.currentPass")}</p>
    <div class="changePassword__ipt">
        <InputPassword bind:password {t}/>
    </div>
    <p>{t("profile.newPass")}</p>
    <div class="changePassword__ipt">
        <InputPassword bind:password={newPassword} {t}/>
    </div>
    <p>{t("profile.confirmNewPass")}</p>
    <div class="changePassword__ipt">
        <InputPassword bind:password={repeatNewPassword} {t}/>
    </div>
    <div></div>
    <button type="button" class="btn save" on:click={changePassword} disabled={loadChangePass}>
    {#if loadChangePass}
        <div class="loading"><p></p><p></p><p></p></div>
    {:else}
        {t("profile.save")}
    {/if}
    </button>
</form>