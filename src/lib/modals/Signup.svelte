<script>
    import ServerConnection from "../../js/server";
    import inputUtils from "../../js/utils/inputUtils";
    import DropdowPrefix from '../dropdown/DropdowPrefix.svelte';
    import DropdownDate from '../dropdown/DropdownDate.svelte';
    import DropdownCurrencies from '../dropdown/DropdownCurrencies.svelte';
    import InputPassword from '../input/InputPassword.svelte';
    import { onMount } from 'svelte';

    export let onOpenLogin;
    export let configSignup;
    export let onOk;
    export let onError;
    export let t;

    let platform = configSignup.platform;
    let typeSignup = configSignup.typeSignup;
    let userType = configSignup.userType;
    let countries = configSignup.countries;
    let currencies = configSignup.currencies;
    let agentCodeType = configSignup.agentCodeType || 'codeAgent';
    let preRegister = configSignup.preRegister == undefined?true:false;//solo si falla el proveedor de sms
    let isCodeAgenteSwitch = configSignup.isCodeAgenteSwitch || false;
    let isCheckedAfiliated = isCodeAgenteSwitch;
    //loading
    let loadSms;
    let loadSignup;
    //contador de 2 min
    let activeSMS;
    let minutes;
    let seconds;
    //registro
    let codeAgent;
    let usernameAgent;
    let country;
    let name;
    let username;
    let date;
    let email;
    let password;
    //este se detecta al enviar codigo de agente por sendSMS
    let phone;
    let smscode;
    let doctype;
    let document;
    let term_conditions;
    let currency;

    //validations imput -utils JS
    const inputJustText = inputUtils.justTextValidator;
    const inputJustNumbers = inputUtils.justNumbersValidator;
    const notWhiteSpace = inputUtils.notWhiteSpace;

    function counterResendSms() {
        onOk(t("msg.sendSms"));
        activeSMS = true;
        minutes = 2;
        seconds = 0;
        const timer = setInterval(() => {
            if (seconds === 0 && minutes !== 0) {
                seconds = 59;
                minutes -= 1;
            } else if (minutes === 0 && seconds === 0) {
                activeSMS = false;
                loadSms = false;
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
            let {data} = await ServerConnection.users.preRegister(username.trim(), email, country+phone, platform);
            preRegister ? counterResendSms() : smscode = data.smscode;
        } catch (error) {
            if(error.response.data.message == 'El telefono ya existe') error = t("msg.phoneExist");
            else if(error.response.data.message == 'PHONE_FORMAT_FAILED') error = t("msg.phoneFormat");
            else if(error.response.data.message == 'El usuario  ya existe' || error.response.data.message == '{resp=Err, Id=1, Msg=Usuario ya Exite}') error = t("msg.userExist");
            else if(error.response.data.message == 'El usuario u correo ya existe' || error.response.data.message == '{resp=Err, Id=2, Msg=El correo o el Usuario ya Exite}') error = t("msg.emailExist");
            else error = t("msg.contactSupport");
            onError(error);
            loadSms = false;
        }
    }

    async function getCurrencyId() {
        try {
            let data = await ServerConnection.users.getCurrencyIdByCodeAgent(codeAgent);
            if (data.data[0].id) {
                currency = data.data[0].id; 
                userType = "X";      
            }
        } catch (error) {
            onError(t("msg.incorrectCodeAgent"));
            loadSignup = false;
        }
    }

    async function registerClick(){
        if(!name || !date || !email || !username || !password || !phone) return onError(t("msg.allObligatory"));
        if (email) {
            let emailvalid = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/.test(email);
            if (!emailvalid) return onError(t("msg.emailInvalid"));
        }
        if (password.length < 5) return onError(t("msg.passwordMin5"));
        if(!smscode && preRegister){
            return onError(t("msg.codeVerification"));
        }else if(!preRegister){
            loadSignup = true;
            await preRegisterClick();
            loadSignup = false;
        }
        if(!term_conditions) return onError(t("msg.acceptTandC"));
        if (!codeAgent) { 
            if (typeSignup === "mixed") {//just if not have codeagent       
                codeAgent = currencies[0].agent;
                currency = currencies[0].id;
            }else{
                return onError(t("msg.incorrectCodeAgent"));
            }
         }
        try {
            loadSignup = true;
            if(typeSignup === "codeAgent"){
                codeAgent = agentCodeType == 'nameAfiliated'?"@"+codeAgent:codeAgent;
                await getCurrencyId();//Just if add codeagent
            }
            const {data} = await ServerConnection.users.register(username.trim(),name,country,country+phone, email, password, date, codeAgent,smscode,userType,platform,currency,doctype,document);
            data.username = username;
            data.password = password;
            onOk(data);
        } catch (error) {
            console.log(error);
            if(error.response.data.message == 'SMS invalid') error = t("msg.incorrectSms");
            else if(error.response.data.message == '{resp=Err, Id=1, Msg=Usuario ya Exite}') error = t("msg.userExist");
            else if(error.response.data.message == '{resp=Err, Id=2, Msg=El correo o el Usuario ya Exite}') error = t("msg.emailExist");
            else if(error.response.data.message == '{resp=Err, Id=21, Msg=No existe ese id de grupo}') error = t("msg.incorrectCodeAgent");
            else error = t("msg.contactSupport");
            onError(error);
            loadSignup = false;
        }
    }
    const toggleAgentCodeType = () =>{ 
        agentCodeType = agentCodeType == "codeAgent"?"nameAfiliated":"codeAgent";
        codeAgent = "";
     }
    const avoidSubmit = (e) =>{ e.preventDefault(); }

    onMount(()=>{
        let currentUrl = window.location.href;
        const numbersUrl = currentUrl.match(/\d+$/);
        if (numbersUrl) {
            codeAgent = numbersUrl[0];
            agentCodeType = "url";
            typeSignup = "codeAgent";
        }
    });
</script>
<form class="modal-body" on:submit={avoidSubmit}>
    <b>{t("signup.infoPersonal")}</b>
    <form><input type="text" class="ipt icon--user" placeholder={t("signup.nameLastname")} autocomplete="off" bind:value={name} on:input={inputJustText}></form>
    <div class="signup__container--date">
        <p>{t("signup.birthday")}</p>
        <div class="signup__date">
            <DropdownDate bind:date/>
        </div>
    </div>
    <b>{t("signup.dataAccess")}</b>
    <p class="signup__text--resalt">{t("signup.loguedEmailUser")}</p>
    <form><input type="email" class="ipt icon--email" placeholder={t("signup.email")} autocomplete="off" bind:value={email}></form>
    <form><input type="text" class="ipt icon--user" autocapitalize="off" placeholder={t("signup.username")} autocomplete="off" bind:value={username} on:input={notWhiteSpace}></form>
    <div class="signup__container--pass">
        <InputPassword bind:password t={t}/>
    </div>
    <b>{t("signup.validation")}</b>
    {#if typeSignup === "mixed"}
        <div class="signup__mixed">
            <!-- svelte-ignore a11y-click-events-have-key-events --> <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="signup__mixed--check" on:click={()=>typeSignup = "codeAgent"}>
                <input type="checkbox">
                <label for="">{t("signup.haveCodeAgent")}</label>
            </div>
        </div>
    {:else if typeSignup === "selectCurrency"}
        <DropdownCurrencies {currencies} bind:currency bind:codeAgent t={t}/>
    {:else if typeSignup === "codeAgent"}
        {#if agentCodeType !='url' && isCodeAgenteSwitch}
            <div>
                <label for="afiliated">{t("signup.agent")}</label>
                <input type="checkbox" id="afiliated" class="switch" bind:checked={isCheckedAfiliated} on:click={toggleAgentCodeType}>
                <label for="afiliated">{t("signup.afiliated")}</label>
            </div>
        {/if}
        <div class="signup__container--agent">
            {#if agentCodeType=='url'}
                <div></div>
            {:else}
                {#if agentCodeType=='codeAgent'}
                    <p>{t("signup.codeAgent")}</p>
                    <div class="signup__codeAgent">
                        <input type="number" class="ipt" min="0" placeholder="0000" autocomplete="off" bind:value={codeAgent} on:input={inputJustNumbers}>
                        <div>-</div>
                        <input type="number" class="ipt" min="0" placeholder="0000" autocomplete="off" on:input={inputJustNumbers}>
                    </div>
                {:else if  agentCodeType=='nameAfiliated'}
                    <p>{t("signup.afiliated")}</p>
                    <input type="text" class="ipt" placeholder={t("signup.nameAfiliated")} autocomplete="off" bind:value={codeAgent}>
                {/if}
            {/if}
        </div>
    {/if}
    <div class="signup__phone">
        <DropdowPrefix {countries} bind:country/>
        <input type="number" class="ipt" min="0" placeholder={t("signup.phone")} autocomplete="off" bind:value={phone}>
    </div>
    {#if preRegister} 
    <div class="signup__sms">
        <button type="button" class="btn validsms" on:click={preRegisterClick} disabled={loadSms}>
            {#if activeSMS}
                {t("signup.newCodeIn")}: <b>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</b>
            {:else}
                {#if loadSms}
                    <div class="loading"><p></p><p></p><p></p></div>
                {:else}
                    {t("signup.generateCode")}
                {/if}
            {/if}
        </button>
        <input type="number" class="ipt" min="0" placeholder={t("signup.code")} autocomplete="off" bind:value={smscode} on:input={inputJustNumbers}>
    </div>
    {/if}
    <div class="signup__conditions">   
        <input type="checkbox" id="chk_conditions" bind:checked={term_conditions}/>
        <label for="chk_conditions"></label> 
        <p>{@html t("signup.acceptPandP", {platform})}</p>
    </div>
    <button type="button" class="btn signup" on:click={registerClick} disabled={loadSignup}>
        {#if loadSignup}
            <div class="loading"><p></p><p></p><p></p></div>
        {:else}
            {t("signup.register")}
        {/if}
    </button>
    <button type="button" on:click={onOpenLogin} class="btn openLogin">{@html t("signup.loginHere")}</button>
</form>