<script>

//ESTE SE ELIMINARA ES SOLO PARA JETBET HASTA QUE NECO ME PASE EL ENDPOINT QUE FALTA !!!!
    //ESTE CAJERO ES OPERACION genereica
    // EL MISMO CLIENTE , les da cajas a otrod clientes suyo para que cada uno de manera independiente se maneje por codigo de agente, aqui se mustra el codigo de agente



    import { onMount } from 'svelte';
    import ServerConnection from "../../js/server";
    import DropdowPrefix from '../dropdown/DropdowPrefix.svelte';
    import DropdownDate from '../dropdown/DropdownDate.svelte';
    import DropdownCurrencies from '../dropdown/DropdownCurrencies.svelte';
    import InputPassword from '../input/InputPassword.svelte';

    export let onOk;
    export let onError;
    export let platform;
    export let usertype;
    export let countries;
    export let openPrivacyPolicies;//pilitcas de privacidad
    export let t;

    //loading
    let loadSms;
    let loadSingup;
    //contador de 2 min
    let activeSMS;
    let minutes;
    let seconds;
    //registro
    let codeAgent;//solo si se validara cuando se ingrese el mismo y se igualara    
    let country;
    let name;
    let username;
    let date;
    let email;
    let password;
    let operatorId;
    export let currency;//este se detecta al enviar codigo de agente por sendSMS
    let phone;
    let smscode;
    let doctype;
    let document;
    let term_conditions;
   

    //operatorId = code agent, in usertype

    //validations imput -utils JS
    const justTextValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\p{L}\s]/gu, "") }
    const justNumbersValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\d]/g, "") }
    const notWhiteSpace = (e) =>{ e.target.value = e.target.value.replace(/[^\S+$]/g, "") }

    function counterResendSms() {
        activeSMS = true;
        minutes = 2;
        seconds = 0;
        const timer = setInterval(() => {
        if (seconds === 0 && minutes !== 0) {
            seconds = 59;
            minutes -= 1;
        } else if (minutes === 0 && seconds === 0) {
            activeSMS = false;
            clearInterval(timer);
        } else {
            seconds -= 1;
        }
        }, 1000);
    }

    async function preRegisterClick(){
        if(!name || !date || !email || !username || !password || !phone) return onError(t("msg.allObligatory"));
        try {
            loadSms = true;
            await ServerConnection.users.preRegister(username.trim(), email, country+phone, platform);
            onOk(t("msg.sendSms"));
            counterResendSms();
        } catch (error) {
            if(error.response.data.message == 'El telefono ya existe') error = t("msg.phoneExist");
            else if(error.response.data.message == 'PHONE_FORMAT_FAILED') error = t("msg.phoneFormat");
            else if(error.response.data.message == 'El usuario  ya existe') error =  t("msg.userExist");
            else if(error.response.data.message == 'El usuario u correo ya existe') error =   t("msg.emailExist");
            else error = t("msg.contactSupport");
            onError(error);
            loadSms = false;
        }
    }

    async function registerClick(){
        if(!name || !date || !email || !username || !password || !phone || !codeAgent) return onError(t("msg.allObligatory"));
        if (password.length <= 5) return onError(t("msg.passwordMin5"));
        if(!smscode) return onError(t("msg.codeVerification"));
        if(!term_conditions) return onError(t("msg.acceptTandC"));
        try {
            loadSingup = true;
            //operatorId = codeAgent.slice(0, 4); // esto es para texto XD
            operatorId = Math.floor(codeAgent / 10000);//en algun moneto seran 5 digitos y necesita el - si o si para detectar la diferencia
            const {data} = await ServerConnection.users.register(username.trim(),name,country,country+phone, email, password, date, operatorId,smscode,usertype,platform,currency,doctype,document);
            data.username = username;
            data.password = password;
            onOk(data);
        } catch (error) {
            console.log(error);
            if(error.response.data.message == 'SMS invalid') error = t("msg.incorrectSms");
            else error = t("msg.contactSupport");
            onError(error);
            loadSingup = false;
        }
    }
</script>
  
<form class="modal-body">
    <input type="text" class="ipt" placeholder={t("signup.nameLastname")} autocomplete="off" bind:value={name} on:input={justTextValidate}>
    <div class="singup__form--date">
        <p>{t("signup.birthday")}</p>
        <div class="singup__date">
            <DropdownDate bind:date/>
        </div>
    </div>

    <input type="email" class="ipt" placeholder={t("signup.email")} autocomplete="off" bind:value={email}>
    <input type="text" class="ipt" placeholder={t("signup.username")} autocomplete="off" bind:value={username} on:input={notWhiteSpace}>
    <div class="singup__form--pass">
        <InputPassword bind:password t={t}/>
    </div>
    <input type="number" class="ipt" min="0" placeholder={t("signup.codeAgent")} autocomplete="off" bind:value={codeAgent} on:input={justNumbersValidate}>
    <div class="singup__phone">
        <DropdowPrefix {countries} bind:country/>
        <input type="number" class="ipt" min="0" placeholder={t("signup.phone")} autocomplete="off" bind:value={phone}>
    </div>
    <div class="singup__sms">
        <button type="button" class="btn validsms" on:click={preRegisterClick} disabled={loadSms}>
            {#if !activeSMS}
                {#if loadSms}
                    <div class="loading"><p></p><p></p><p></p></div>
                    {:else}
                    {t("signup.generateCode")}
                {/if}
            {:else}
                Nuevo código en: <b>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</b>
            {/if}
        </button>
        <input type="number" class="ipt" min="0" placeholder={t("signup.code")} autocomplete="off" bind:value={smscode} on:input={justNumbersValidate}>
    </div>
    <div class="singup__conditions">   
        <input type="checkbox" id="chk_conditions" bind:checked={term_conditions}/>
        <label for="chk_conditions"></label> 
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div on:click="{openPrivacyPolicies}">{@html t("signup.acceptPandP", {platform })}</div>
    </div>
    <button type="button" class="btn singup" on:click={registerClick} disabled={loadSingup}>
        {#if loadSingup}
            <div class="loading"><p></p><p></p><p></p></div>
            {:else}
            {t("signup.register")}
        {/if}
    </button>
</form>