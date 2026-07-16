<script>
    import ServerConnection from "../../js/server";
    import inputUtils from "../../js/utils/inputUtils";
    import DropdowPrefix from '../dropdown/DropdowPrefix.svelte';
    // import DropdownDate from '../dropdown/DropdownDate.svelte'; // temporal: fecha de nacimiento oculta
    import DropdownCurrencies from '../dropdown/DropdownCurrencies.svelte';
    import InputPassword from '../input/InputPassword.svelte';
    import { detectIdiomPage } from "../../js/utils/formatUtils";
    import { assetsPDF } from "../../js/utils/assetsUtils";
    import { onMount } from 'svelte';

    export let onOpenLogin;
    export let configSignup;
    export let onOk;
    export let onError;
    export let t;

    export let refreshConf;

    let platform = configSignup.platform;
    let typeSignup = configSignup.typeSignup;
    const isMixedConfig = configSignup.typeSignup === "mixed";
    let userType = configSignup.userType;
    let countries = configSignup.countries;
    let currencies = configSignup.currencies;
    let agentCodeType = configSignup.agentCodeType || 'codeAgent';
    let preRegister = configSignup.preRegister == undefined?true:false;//solo si falla el proveedor de sms
    let isCodeAgentSwitch = configSignup.isCodeAgentSwitch || false;
    let isMultipleCurrencies = configSignup.isMultipleCurrencies || false;
    let isCheckedAfiliated = isCodeAgentSwitch;
    let hasPromoCode = false;
    const isBetwsingDomain = window.location.hostname.includes("betswing") || window.location.hostname.includes("xuperparley");
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
    let name = "ganabet365";
    let username;
    let date = "2000-01-01"; // temporal mientras nombre/fecha no se capturan en UI
    let email;
    let password;
    //este se detecta al enviar codigo de agente por sendSMS
    let phone;
    let smscode;
    let doctype = (isMultipleCurrencies && isBetwsingDomain) ? "CI" : "";
    let document;
    let term_conditions;
    let currency;
    let channel = "sms"; // Ganabet365: solo verificación por SMS
    let route = detectIdiomPage(t("idiom"));
    let routePDF = assetsPDF(platform,route);
    let orgMultiCurrency;
    let currencyLocked = false;


    //validations imput -utils JS
    const inputJustText = inputUtils.justTextValidator;
    const inputJustNumbers = inputUtils.justNumbersValidator;
    const notWhiteSpace = inputUtils.notWhiteSpace;

    function counterResendSms() {
        onOk(channel=="sms"?t("msg.sendSms"):t("msg.sendEmail"));
        activeSMS = true;
        minutes = 5;
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

    function getCurrencyPrefixById(currencyId) {
        const currencyPrefixMap = {
            1: "VES",
            3: "USD"
        };
        const prefix = currencyPrefixMap[Number(currencyId)];
        if (!prefix) return onError("La moneda no esta registrada");
        return prefix;
    }

    function onPromoCodeChange() {
        if (!isMixedConfig || agentCodeType === "url") return;
        if (hasPromoCode) {
            typeSignup = "codeAgent";
        } else {
            typeSignup = "mixed";
            codeAgent = "";
        }
    }

    async function preRegisterClick(){
        if(isMultipleCurrencies ){
            if(isBetwsingDomain){
                if(!document || !currency) return onError(t("msg.allObligatory"));
                username = `${getCurrencyPrefixById(currency)}${document}`;
            }
            if (currency) {
                const selectedCurrency = currencies.find(c => c.id == currency);
                orgMultiCurrency = selectedCurrency?.org || "";

                if (orgMultiCurrency) {
                    localStorage.setItem("org", orgMultiCurrency);
                    await refreshConf();
                }
            }
        }
        if(!email || !username || !password || !phone ||
        typeSignup === "codeAgent" && !codeAgent || typeSignup === "selectCurrency" && !codeAgent) return onError(t("msg.allObligatory"));
        try {
            loadSms = true;
            let {data} = await ServerConnection.users.preRegister(username.trim(), email, country+phone, platform,channel, orgMultiCurrency);
            if (typeSignup === "selectCurrency") currencyLocked = true;
            preRegister ? counterResendSms() : smscode = data.code_verify;
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
        if(!email || !username || !password || !phone) return onError(t("msg.allObligatory"));
        if (email) {
            let emailvalid = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/.test(email);
            if (!emailvalid) return onError(t("msg.emailInvalid"));
        }
        if (password.length < 8) return onError(t("msg.passwordMin5"));
        if(!smscode && preRegister){
            return onError(t("msg.codeVerification"));
        }else if(!preRegister){
            loadSignup = true;
            await preRegisterClick();
            loadSignup = false;
        }
        if(!term_conditions) return onError(t("msg.acceptTandC"));
        if (!codeAgent) {
            if (typeSignup === "mixed" || typeSignup == "web") {//just if not have codeagent
                codeAgent = currencies[0].agent;
                currency = currencies[0].id;
            }else{
                return onError(t("msg.incorrectCodeAgent"));
            }
        }
        if(isMultipleCurrencies && isBetwsingDomain && (!document || !currency)) return onError(t("msg.allObligatory"));
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
            hasPromoCode = true;
        }
    });
</script>
<form class="modal-body ganabet365-signup" on:submit={avoidSubmit}>
    <div class="ganabet365-signup__hero">
        <h2 class="ganabet365-signup__title">
            REGÍSTRATE <span>AHORA</span>
            <i class="ganabet365-signup__bolt" aria-hidden="true"></i>
        </h2>
        <p class="ganabet365-signup__subtitle">
            Crea tu cuenta en menos de <span>1 minuto</span>
        </p>
    </div>

    <!-- Temporalmente oculto: nombre y apellido
    <form><input type="text" class="ipt icon--user" placeholder={t("signup.nameLastname")} autocomplete="off" bind:value={name} on:input={inputJustText}></form>
    <div class="signup__container--date">
        <p>{t("signup.birthday")}</p>
        <div class="signup__date">
            <DropdownDate bind:date/>
        </div>
    </div>
    -->

    <div class="ganabet365-signup__field">
        <form class="ganabet365-signup__ipt-icon ganabet365-signup__ipt-icon--user">
            <input
                type="text"
                class="ipt icon--user"
                autocapitalize="off"
                placeholder={t("signup.username")}
                autocomplete="off"
                bind:value={username}
                on:input={notWhiteSpace}
                hidden={isMultipleCurrencies && isBetwsingDomain}
            >
        </form>
        {#if !(isMultipleCurrencies && isBetwsingDomain)}
            <p class="ganabet365-signup__hint">Este será tu usuario para iniciar sesión</p>
        {/if}
    </div>

    {#if isMultipleCurrencies && isBetwsingDomain}
        <div class="ganabet365-signup__field">
            <p class="ganabet365-signup__label">{t("signup.identityCard")}</p>
            <form><input type="text" class="ipt" placeholder={t("signup.identityCard")} autocomplete="off" bind:value={document} on:input={inputJustNumbers}></form>
            <p class="ganabet365-signup__hint">{t("signup.identityCardHint")}</p>
        </div>
    {/if}

    <div class="ganabet365-signup__field">
        <div class="signup__container--pass ganabet365-signup__ipt-icon ganabet365-signup__ipt-icon--password">
            <InputPassword bind:password {t}/>
        </div>
        <p class="ganabet365-signup__hint">Mínimo 8 caracteres con números y letras</p>
    </div>

    <div class="ganabet365-signup__field">
        <form class="ganabet365-signup__ipt-icon ganabet365-signup__ipt-icon--email">
            <input type="email" class="ipt icon--email" placeholder={t("signup.email")} autocomplete="off" bind:value={email}>
        </form>
        <p class="ganabet365-signup__hint">Te enviaremos información importante</p>
    </div>

    {#if isMixedConfig && agentCodeType != "url"}
        <div class="ganabet365-signup__promo">
            <i class="ganabet365-signup__promo-icon" aria-hidden="true"></i>
            <p class="ganabet365-signup__promo-text">
                Si tienes un código de <span>agente</span> marca está opción
            </p>
            <input
                type="checkbox"
                class="switch"
                bind:checked={hasPromoCode}
                on:change={onPromoCodeChange}
                aria-label={t("signup.haveCodeAgent")}
            >
        </div>
    {/if}

    {#if typeSignup === "selectCurrency"}
        <DropdownCurrencies {currencies} bind:currency bind:codeAgent t={t} disabled={currencyLocked}/>
    {:else if typeSignup === "codeAgent"}
        {#if agentCodeType !='url' && isCodeAgentSwitch}
            <div class="ganabet365-signup__afiliated">
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
    {:else if typeSignup === "web"}
        <div></div>
    {/if}

    <div class="ganabet365-signup__field">
        <div class="signup__phone ganabet365-signup__ipt-icon ganabet365-signup__ipt-icon--phone">
            <DropdowPrefix {countries} bind:country/>
            <input type="number" class="ipt icon--phone" min="0" placeholder="Número de teléfono" autocomplete="off" bind:value={phone} on:input={inputJustNumbers}>
        </div>
        <p class="ganabet365-signup__hint">Te enviaremos tu código de verificación por SMS</p>
    </div>

    {#if preRegister}
    <div class="ganabet365-signup__field">
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
    </div>
    {/if}

    <div class="signup__conditions">
        <input type="checkbox" id="chk_conditions_ganabet" bind:checked={term_conditions}/>
        <label for="chk_conditions_ganabet"></label>
        <p>{@html t("signup.acceptPandP", {routePDF,platform})}</p>
    </div>

    <button type="button" class="btn signup" on:click={registerClick} disabled={loadSignup}>
        {#if loadSignup}
            <div class="loading"><p></p><p></p><p></p></div>
        {:else}
            {t("signup.register")}
        {/if}
    </button>

    <div class="ganabet365-signup__benefits">
        <div class="ganabet365-signup__benefit">
            <i class="ganabet365-signup__benefit-icon ganabet365-signup__benefit-icon--secure" aria-hidden="true"></i>
            <b>100% Seguro</b>
            <span>Tus datos protegidos</span>
        </div>
        <div class="ganabet365-signup__benefit">
            <i class="ganabet365-signup__benefit-icon ganabet365-signup__benefit-icon--fast" aria-hidden="true"></i>
            <b>Registro rápido</b>
            <span>Menos de 1 minuto</span>
        </div>
        <div class="ganabet365-signup__benefit">
            <i class="ganabet365-signup__benefit-icon ganabet365-signup__benefit-icon--bonus" aria-hidden="true"></i>
            <b>Bonos exclusivos</b>
            <span>Por ser nuevo miembro</span>
        </div>
    </div>

</form>

<style>
    .ganabet365-signup {
        --gb-bg: #000;
        --gb-surface: #1a1a1a;
        --gb-border: #333;
        --gb-green: #00c714;
        --gb-yellow: #ffcc00;
        --gb-yellow-focus: #8a7520;
        --gb-text: #fff;
        --gb-muted: #9a9a9a;
        --gb-radius: 0.65rem;

        display: grid;
        gap: 0.75rem;
        padding: 0.5rem 0.25rem 1.25rem;
        color: var(--gb-text);
        background: var(--gb-bg);

    }

    .ganabet365-signup__hero {
        text-align: center;
        margin-bottom: 0.35rem;
    }

    .ganabet365-signup__title {
        margin: 0;
        font-size: 1.45rem;
        font-weight: 800;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        color: var(--gb-text);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.35rem;
        flex-wrap: wrap;
    }

    .ganabet365-signup__title span {
        color: var(--gb-green);
    }

    .ganabet365-signup__bolt {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background: center / contain no-repeat
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffcc00'%3E%3Cpath d='M13 2 3 14h8l-1 8 11-14h-8l1-6z'/%3E%3C/svg%3E");
    }

    .ganabet365-signup__subtitle {
        margin: 0.4rem 0 0;
        font-size: 0.9rem;
        color: var(--gb-text);
    }

    .ganabet365-signup__subtitle span {
        color: var(--gb-yellow);
        font-weight: 700;
    }

    .ganabet365-signup__field {
        display: grid;
        gap: 0.3rem;
    }

    .ganabet365-signup__label {
        margin: 0;
        font-size: 0.85rem;
        color: var(--gb-muted);
    }

    .ganabet365-signup__hint {
        margin: 0;
        padding-left: 0.15rem;
        font-size: 0.72rem;
        color: var(--gb-muted);
        line-height: 1.3;
    }

    .ganabet365-signup :global(.ipt),
    .ganabet365-signup :global(.slc) {
        background-color: var(--gb-surface) !important;
        border: 1px solid var(--gb-border) !important;
        color: var(--gb-text) !important;
        border-radius: var(--gb-radius) !important;
        min-height: 2.75rem;
        outline: none !important;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }

    .ganabet365-signup :global(.ipt:focus),
    .ganabet365-signup :global(.ipt:focus-visible),
    .ganabet365-signup :global(.slc:focus),
    .ganabet365-signup :global(.slc:focus-visible) {
        border-color: var(--gb-yellow-focus) !important;
        box-shadow: 0 0 0 1px rgba(255, 204, 0, 0.25) !important;
    }

    .ganabet365-signup :global(.ipt::placeholder) {
        color: #7a7a7a;
    }

    .ganabet365-signup :global(.ipt:-webkit-autofill),
    .ganabet365-signup :global(.ipt:-webkit-autofill:hover),
    .ganabet365-signup :global(.ipt:-webkit-autofill:focus),
    .ganabet365-signup :global(.ipt:-webkit-autofill:active) {
        -webkit-text-fill-color: var(--gb-text) !important;
        caret-color: var(--gb-text);
        box-shadow: 0 0 0 1000px var(--gb-surface) inset !important;
        transition: background-color 99999s ease-in-out 0s;
        border: 1px solid var(--gb-border) !important;
        border-radius: var(--gb-radius) !important;
        background-image: none !important;
    }

    .ganabet365-signup :global(.ipt:-webkit-autofill:focus) {
        border-color: var(--gb-yellow-focus) !important;
        box-shadow: 0 0 0 1000px var(--gb-surface) inset, 0 0 0 1px rgba(255, 204, 0, 0.25) !important;
    }

    /* Iconos fuera del input para que el autofill no los tape */
    .ganabet365-signup__ipt-icon {
        position: relative;
    }

    .ganabet365-signup__ipt-icon::before {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        z-index: 3;
        pointer-events: none;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    .ganabet365-signup__ipt-icon--user::before {
        left: 0.85rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300c714' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E");
    }

    .ganabet365-signup__ipt-icon--email::before {
        left: 0.85rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300c714' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'/%3E%3Cpolyline points='22,6 12,13 2,6'/%3E%3C/svg%3E");
    }

    .ganabet365-signup__ipt-icon--password::before {
        left: 0.85rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300c714' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='11' width='18' height='11' rx='2' ry='2'/%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'/%3E%3C/svg%3E");
    }

    .ganabet365-signup__ipt-icon--phone::before {
        left: calc(6.5rem + 0.75rem);
        width: 16px;
        height: 16px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300c714' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.35a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.75.34 1.54.57 2.35.7A2 2 0 0 1 22 16.92z'/%3E%3C/svg%3E");
    }

    .ganabet365-signup :global(.ipt.icon--user),
    .ganabet365-signup :global(.ipt.icon--email),
    .ganabet365-signup :global(.ipt.icon--password) {
        background-image: none !important;
        padding-left: 2.6rem !important;
    }

    .ganabet365-signup :global(.ipt.icon--password) {
        border-radius: var(--gb-radius) 0 0 var(--gb-radius) !important;
    }

    .ganabet365-signup :global(.ipt.icon--phone) {
        background-image: none !important;
        padding-left: 2.4rem !important;
        border-radius: 0 var(--gb-radius) var(--gb-radius) 0 !important;
    }

    .ganabet365-signup :global(.signup__container--pass) {
        display: grid;
        grid-template-columns: 1fr 2.75rem;
        gap: 0;
    }

    .ganabet365-signup :global(.signup__container--pass .btn) {
        background-color: var(--gb-surface) !important;
        border: 1px solid var(--gb-border) !important;
        border-left: 0 !important;
        border-radius: 0 var(--gb-radius) var(--gb-radius) 0 !important;
        min-height: 2.75rem;
    }

    .ganabet365-signup :global(.signup__container--pass .btn.eye) {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23fff'%3e%3cpath d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'/%3e%3c/svg%3e") !important;
    }

    .ganabet365-signup :global(.signup__container--pass .btn.no-eye) {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23fff'%3e%3cpath d='M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z'/%3e%3c/svg%3e") !important;
    }

    .ganabet365-signup :global(.signup__phone) {
        display: grid;
        grid-template-columns: 6.5rem 1fr;
        gap: 0;
    }

    .ganabet365-signup :global(.signup__phone .slc) {
        border-radius: var(--gb-radius) 0 0 var(--gb-radius) !important;
        border-right: 0 !important;
        color: var(--gb-text) !important;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e") !important;
    }

    .ganabet365-signup :global(.signup__prefix) {
        color: var(--gb-text) !important;
        background-color: #1a1a1a;
    }

    .ganabet365-signup :global(.signup__sms) {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.4rem;
        align-items: center;
    }

    .ganabet365-signup :global(.btn.validsms) {
        background: #222 !important;
        color: var(--gb-yellow) !important;
        border: 1px solid var(--gb-yellow) !important;
        border-radius: var(--gb-radius) !important;
        min-width: 9.5rem;
        font-size: 0.8rem;
        font-weight: 700;
    }

    .ganabet365-signup :global(.btn.signup) {
        width: 100%;
        margin-top: 0.25rem;
        background: var(--gb-yellow) !important;
        color: #000 !important;
        border: 0 !important;
        border-radius: var(--gb-radius) !important;
        font-weight: 800;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        box-shadow: none;
    }

    .ganabet365-signup :global(.btn.openLogin) {
        background: transparent !important;
        color: var(--gb-muted) !important;
        border: 0 !important;
        font-size: 0.85rem;
        padding: 0.35rem 0;
    }

    .ganabet365-signup :global(.btn.openLogin b) {
        color: var(--gb-yellow);
    }

    .ganabet365-signup__promo {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 0.65rem;
        padding: 0.75rem 0.85rem;
        border: 1.5px dashed var(--gb-yellow);
        border-radius: var(--gb-radius);
        background: rgba(255, 204, 0, 0.04);
    }

    .ganabet365-signup__promo-icon {
        width: 1.25rem;
        height: 1.25rem;
        background: center / contain no-repeat
            url("data:image/svg+xml,<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M15 5V8' stroke='%23ffcc00' stroke-width='2' stroke-linecap='round'/><path d='M15 16V19' stroke='%23ffcc00' stroke-width='2' stroke-linecap='round'/><path d='M15 11V13' stroke='%23ffcc00' stroke-width='2' stroke-linecap='round'/><path d='M4.4416 10.4557C3.79252 9.73379 2.96682 8.93468 3.07899 7.97035C3.35831 5.56902 4.46022 5 7.648 5H16.352C19.5398 5 20.6417 5.56902 20.921 7.97035C21.0332 8.93468 20.2075 9.73379 19.5584 10.4557C19.2424 10.8072 19 11.3037 19 12C19 12.6963 19.2424 13.1928 19.5584 13.5443C20.2075 14.2662 21.0332 15.0653 20.921 16.0296C20.6417 18.431 19.5398 19 16.352 19H7.648C4.46022 19 3.35831 18.431 3.07899 16.0296C2.96682 15.0653 3.79252 14.2662 4.4416 13.5443C4.75761 13.1928 5 12.6963 5 12C5 11.3037 4.75761 10.8072 4.4416 10.4557Z' stroke='%23ffcc00' stroke-width='2'/></svg>");
    }

    .ganabet365-signup__promo-text {
        margin: 0;
        font-size: 0.82rem;
        color: var(--gb-text);
        line-height: 1.3;
    }

    .ganabet365-signup__promo-text span {
        color: var(--gb-yellow);
        font-weight: 700;
    }

    .ganabet365-signup__promo :global(input[type='checkbox'].switch) {
        width: 2.4rem;
        height: 1.25rem;
        margin: 0;
        appearance: none;
        -webkit-appearance: none;
        border-radius: 999px;
        background: #3a3a3a;
        border: 1px solid #555;
        position: relative;
        cursor: pointer;
        transition: background 0.2s ease;
    }

    .ganabet365-signup__promo :global(input[type='checkbox'].switch::after) {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 50%;
        background: #cfcfcf;
        transition: transform 0.2s ease, background 0.2s ease;
    }

    .ganabet365-signup__promo :global(input[type='checkbox'].switch:checked) {
        background: var(--gb-yellow);
        border-color: var(--gb-yellow);
    }

    .ganabet365-signup__promo :global(input[type='checkbox'].switch:checked::after) {
        transform: translateX(1.05rem);
        background: #111;
    }

    .ganabet365-signup__afiliated {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.85rem;
    }

    .ganabet365-signup :global(.signup__container--agent) {
        display: grid;
        gap: 0.35rem;
    }

    .ganabet365-signup :global(.signup__container--agent p) {
        margin: 0;
        color: var(--gb-text) !important;
        font-size: 0.85rem;
        background-color: #1a1a1a;
    }

    .ganabet365-signup :global(.signup__codeAgent) {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 0.35rem;
        align-items: center;
    }

    .ganabet365-signup :global(.signup__conditions) {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: start;
        gap: 0.65rem;
        padding: 0.25rem 0;
    }

    .ganabet365-signup :global(.signup__conditions p) {
        margin: 0;
        font-size: 0.8rem;
        color: #ddd;
        line-height: 1.35;
    }

    .ganabet365-signup :global(.signup__conditions a),
    .ganabet365-signup :global(.signup__conditions b) {
        color: var(--gb-yellow) !important;
        text-decoration: underline;
    }

    .ganabet365-signup__benefits {
        position: relative;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.35rem;
        margin-top: 0.5rem;
        padding: 1.1rem 0.35rem 0.75rem;
        border: 1px solid #2e2e2e;
        border-radius: var(--gb-radius);
    }

    .ganabet365-signup__benefits::before {
        content: "";
        position: absolute;
        top: -0.55rem;
        left: 50%;
        transform: translateX(-50%);
        width: 1.1rem;
        height: 1.1rem;
        background: var(--gb-bg) center / 0.85rem no-repeat
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300c714' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/%3E%3Cpath d='m9 12 2 2 4-4'/%3E%3C/svg%3E");
    }

    .ganabet365-signup__benefit {
        display: grid;
        justify-items: center;
        text-align: center;
        gap: 0.15rem;
        padding: 0 0.25rem;
        position: relative;
    }

    .ganabet365-signup__benefit:not(:last-child)::after {
        content: "";
        position: absolute;
        right: 0;
        top: 15%;
        height: 70%;
        width: 1px;
        background: #333;
    }

    .ganabet365-signup__benefit b {
        font-size: 0.72rem;
        color: var(--gb-text);
    }

    .ganabet365-signup__benefit span {
        font-size: 0.62rem;
        color: var(--gb-muted);
        line-height: 1.2;
    }

    .ganabet365-signup__benefit-icon {
        width: 1.1rem;
        height: 1.1rem;
        margin-bottom: 0.15rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
    }

    .ganabet365-signup__benefit-icon--secure {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300c714' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/%3E%3Cpath d='m9 12 2 2 4-4'/%3E%3C/svg%3E");
    }

    .ganabet365-signup__benefit-icon--fast {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2300c714'%3E%3Cpath d='M13 2 3 14h8l-1 8 11-14h-8l1-6z'/%3E%3C/svg%3E");
    }

    .ganabet365-signup__benefit-icon--bonus {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300c714' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 12 20 22 4 22 4 12'/%3E%3Crect x='2' y='7' width='20' height='5'/%3E%3Cpath d='M12 22V7'/%3E%3Cpath d='M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z'/%3E%3Cpath d='M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z'/%3E%3C/svg%3E");
    }

    .ganabet365-signup :global(.loading p) {
        background: #111 !important;
    }

    .ganabet365-signup :global(.btn.validsms .loading p) {
        background: var(--gb-yellow) !important;
    }
</style>
