<script>
    import ServerConnection from "../../js/server";
    import DropdowPrefix from '../dropdown/DropdowPrefix.svelte';
    import DropdownDate from '../dropdown/DropdownDate.svelte';
    import DropdownCurrencies from '../dropdown/DropdownCurrencies.svelte';
    import InputPassword from '../input/InputPassword.svelte';

    export let configSignup;
    export let onOk;
    export let onError;
    export let openPrivacyPolicies;
    export let t;

    let platform = configSignup.platform;
    let typeSignup = configSignup.typeSignup;
    let userType = configSignup.userType;
    let countries = configSignup.countries;
    let currencies = configSignup.currencies;
    let agentCodeType = configSignup.agentCodeType||'numeric';

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

    let cashierAgentList= [
        { code:123, username:'steve123'},
    ];

    

    //validations imput -utils JS
    const justTextValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\p{L}\s]/gu, "") }
    const justNumbersValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\d]/g, "") }
    const notWhiteSpace = (e) =>{ e.target.value = e.target.value.replace(/[^\S+$]/g, "") }

    const setCodeAgent=()=>{
        
        let cashier = cashierAgentList.find(e=>e.username == usernameAgent);
        if(cashier) codeAgent = cashier.code;
        else alert("Este Agente no existe.");
    }
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
            await ServerConnection.users.preRegister(username.trim(), email, country+phone, platform);
            onOk(t("msg.sendSms"));
            counterResendSms();
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
            let data = await ServerConnection.users.getCurrencyIdByCodeAgent(codeAgent)
            if (data.data[0].id) {
                currency = data.data[0].id; 
                userType = "X";
                console.log(data);
            }else{
                let error = data.data.error == "NO_HAY_INFORM"?t("msg.incorrectCodeAgent"):t("msg.contactSupport");
                return onError(error);
            }
        } catch (error) {
            console.log(error);//error descconicido de momento
            onError(t("msg.contactSupport"));
        }
    }

    async function registerClick(){
        if(!name || !date || !email || !username || !password || !phone || !codeAgent) return onError(t("msg.allObligatory"));
        if (email) {
            let emailvalid = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/.test(email);
            if (!emailvalid) return onError(t("msg.emailInvalid"));
        }
        if (password.length <= 5) return onError(t("msg.passwordMin5"));
        if(!smscode) return onError(t("msg.codeVerification"));
        if(!term_conditions) return onError(t("msg.acceptTandC"));
        try {
            loadSignup = true;
            if(typeSignup != "selectCurrency") await getCurrencyId();//Just if add codeagent
            const {data} = await ServerConnection.users.register(username.trim(),name,country,country+phone, email, password, date, codeAgent,smscode,userType,platform,currency,doctype,document);
            console.log("userType",userType);
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
    const avoidSubmit = (e) =>{ e.preventDefault(); }
</script>
  
<form class="modal-body" on:submit={avoidSubmit}>
    <p>{t("signup.infoPersonal")}</p>
    <input type="text" class="ipt icon--user" placeholder={t("signup.nameLastname")} autocomplete="off" bind:value={name} on:input={justTextValidate}>
    <div class="signup__container--date">
        <p>{t("signup.birthday")}</p>
        <div class="signup__date">
            <DropdownDate bind:date/>
        </div>
    </div>
    <p>{t("signup.dataAccess")}</p>
    <p class="signup__text--resalt">{t("signup.loguedEmailUser")}</p>
    <input type="email" class="ipt icon--email" placeholder={t("signup.email")} autocomplete="off" bind:value={email}>
    <input type="text" class="ipt icon--user" autocapitalize="off" placeholder={t("signup.username")} autocomplete="off" bind:value={username} on:input={notWhiteSpace}>
    <div class="signup__container--pass">
        <InputPassword bind:password t={t}/>
    </div>
    <p>{t("signup.validation")}</p>
    {#if typeSignup === "mixed"}
        <div class="signup__mixed">
            <p>{t("signup.haveCodeAgent")}</p>
            <!-- svelte-ignore a11y-click-events-have-key-events --> <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={()=>typeSignup = "codeAgent"}>
                <input type="checkbox">
                <label for="">{t("signup.yes")}</label>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events --> <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={()=>typeSignup = "selectCurrency"}>
                <input type="checkbox">
                <label for="">{t("signup.no")}</label>
            </div>
        </div>
    {:else if typeSignup === "selectCurrency"}
        <DropdownCurrencies {currencies} bind:currency bind:codeAgent t={t}/>
    {:else if typeSignup === "codeAgent"}
        <div class="signup__container--agent">
            {#if agentCodeType=='numeric'}
            <p>{t("signup.codeAgent")}</p>
            <div class="signup__codeAgent">
                <input type="number" class="ipt" min="0" placeholder="0000" autocomplete="off" bind:value={codeAgent} on:input={justNumbersValidate}>
                <div>-</div>
                <input type="number" class="ipt" min="0" placeholder="0000" autocomplete="off" on:input={justNumbersValidate}>
            </div>
            {:else}
            <p>{t("signup.codeAgent")} {codeAgent?`(${codeAgent})`:''}</p>
            <div class="signup__codeAgent">
                <input type="text" class="ipt" autocomplete="off" bind:value={usernameAgent} on:blur={setCodeAgent}> 
            </div>
            {/if}
        </div>
    {/if}

    <div class="signup__phone">
        <DropdowPrefix {countries} bind:country/>
        <input type="number" class="ipt" min="0" placeholder={t("signup.phone")} autocomplete="off" bind:value={phone}>
    </div>
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
        <input type="number" class="ipt" min="0" placeholder={t("signup.code")} autocomplete="off" bind:value={smscode} on:input={justNumbersValidate}>
    </div>
    <div class="signup__conditions">   
        <input type="checkbox" id="chk_conditions" bind:checked={term_conditions}/>
        <label for="chk_conditions"></label> 
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div on:click={openPrivacyPolicies}>{@html t("signup.acceptPandP", {platform})}</div>
    </div>
    <button type="button" class="btn signup" on:click={registerClick} disabled={loadSignup}>
        {#if loadSignup}
            <div class="loading"><p></p><p></p><p></p></div>
        {:else}
            {t("signup.register")}
        {/if}
    </button>
</form>