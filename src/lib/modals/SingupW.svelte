<script>
    import { onMount } from 'svelte';
    import ServerConnection from "../../js/server";
    import DropdowPrefix from '../dropdown/DropdowPrefix.svelte';
    import DropdownDate from '../dropdown/DropdownDate.svelte';
    import DropdownCurrencies from '../dropdown/DropdownCurrencies.svelte';
    import InputPassword from '../input/InputPassword.svelte';

    export let onOk;
    export let onError;
    export let platform;
    export let countries;
    export let currencies;
    export let t;
    let usertype;
    //loading
    let loadSms;
    let loadSingup;
    //contador de 2 min d
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
    let currency;
    let phone;
    let smscode;
    let doctype;
    let document;
    let term_conditions;
 
    //validations imput -utils JS
    const justTextValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\p{L}\s]/gu, "") }
    const justNumbersValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\d]/g, "") }
    const notWhiteSpace = (e) =>{ e.target.value = e.target.value.replace(/[^\S+$]/g, "") }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
    const validationEmail = () =>{
        let isValidEmail = emailPattern.test(email);
        return isValidEmail;
    }

    async function preRegisterClick(){
        if(!name || !date || !email || !username || !password || !phone || !currency) return onError("Todos los campos son obligatorios");// ESTO PUEDE VARIAR SEGUN EL TIPO DE REGISTRO REQUERIDO
        if (!validationEmail()) return onError("El e-mail es inválido");
        try {
            loadSms = true;
            await ServerConnection.users.preRegister(username.trim(), email, country+phone, platform);
            onOk("SMS enviado!, verifique su celular");
            counterResendSms();
        } catch (error) {
            if(error.response.data.message == 'El telefono ya existe') error = 'El teléfono ya esta registrado';
            else if(error.response.data.message == 'PHONE_FORMAT_FAILED') error = 'Formato de teléfono incorrecto';
            else if(error.response.data.message == 'El usuario  ya existe') error = 'El nombre de usuario ya esta registrado';
            else if(error.response.data.message == 'El usuario u correo ya existe') error = 'El e-mail ya esta registrado';
            else error = "Ocurrio un error, contactese con soporte";
            onError(error);
            loadSms = false;
        }
    }   

    async function registerClick(){
        if(!name || !date || !email || !username || !password || !phone || !currency) return onError("Todos los campos son obligatorios"); // ESTO PUEDE VARIAR SEGUN EL TIPO DE REGISTRO REQUERIDO
        if (!validationEmail()) return onError("El e-mail es inválido");
        if (password.length <= 5) return onError("La contraseña debe tener 6 caracteres como mínimo");
        if (codeAgent) {
            if (codeAgent.toString().length == 8)  operatorId = Math.floor(codeAgent / 10000);
            else return onError("Código de agente inválido");
        }
        if(!smscode) return onError("Ingrese el código de verificación");
        if(!term_conditions) return onError("Debe aceptar los términos y condiciones");
        try {
            loadSingup = true;
            usertype = codeAgent?'X':'W';
            username = username.trim();
            const {data} = await ServerConnection.users.register(username,name,country,country+phone, email, password, date, operatorId,smscode,usertype,platform,currency,doctype,document);
            data.username = username;
            data.password = password;
            onOk(data);
        } catch (error) {
            if(error.response.data.message == 'SMS invalid') error = 'El código SMS es incorrecto';
            else if(error.response.data.message == '{resp=Err, Id=2, Msg=El correo o el Usuario ya Exite}') error = 'El e-mail ya esta registrado';
            else if(error.response.data.message == '{resp=Err, Id=21, Msg=No existe ese id de grupo}') error = 'Código de agente inválido';
            else error = "Ocurrio un error, contactese con soporte";
            onError(error);
            loadSingup = false;
        }
    }
</script>
  
<form class="modal-body">
    <input type="text" class="ipt" placeholder="Nombres y apellidos" autocomplete="off" bind:value={name} on:input={justTextValidate}>
    <div class="singup__form--date">
        <p>Fecha de nacimiento</p>
        <div class="singup__date">
            <DropdownDate bind:date/>
        </div>
    </div>
    <input type="email" class="ipt" placeholder="Correo electrónico" autocomplete="off" bind:value={email}>
    <input type="text" class="ipt" placeholder="Nombre de usuario" autocomplete="off" bind:value={username} on:input={notWhiteSpace}>
    <div class="singup__form--pass">
        <InputPassword bind:password t={t}/>
    </div>
    <DropdownCurrencies {currencies} bind:operatorId bind:currency/>
    <!--input type="number" class="ipt" min="0" placeholder="Código de agente (opcional)" autocomplete="off" bind:value={codeAgent} on:input={justNumbersValidate}-->
    <div class="singup__phone">
        <DropdowPrefix {countries} bind:country/>
        <input type="number" class="ipt" min="0" placeholder="Teléfono" autocomplete="off" bind:value={phone}>
    </div>
    <div class="singup__sms">
        <button type="button" class="btn validsms" on:click={preRegisterClick} disabled={loadSms}>
            {#if !activeSMS}
                {#if loadSms}
                    <div class="loading"><p></p><p></p><p></p></div>
                    {:else}
                    Generar código SMS
                {/if}
            {:else}
                Nuevo código en: <b>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</b>
            {/if}
        </button>
        <input type="number" class="ipt" min="0" placeholder="Código" autocomplete="off" bind:value={smscode} on:input={justNumbersValidate}>
    </div>
   <div class="singup__conditions">
        <input type="checkbox" id="chk_conditions" bind:checked={term_conditions}/>
        <label for="chk_conditions"></label> 
        <div>Para convertirme en cliente, acepto las <b><a class="link" href="#">Políticas de Privacidad</a></b> de {platform}.</div>
    </div>
    <button type="button" class="btn btn-primary singup" on:click={registerClick} disabled={loadSingup}>
        {#if loadSingup}
            <div class="loading"><p></p><p></p><p></p></div>
            {:else}
            Registrar
        {/if}
    </button>
</form>