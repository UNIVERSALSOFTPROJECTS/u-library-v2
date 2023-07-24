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
    export let usertype;
    //contador de 2 min
    let activeSMS = false;
    let minutes;
    let seconds;
    //registro
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
    let term_conditions;

    let countries  = [
      {prefix:"+57",flag:"col"},
      {prefix:"+58",flag:"ven"}
    ];
    //operatorId = code agent
    let currencies  = [
      {name:"Peso colombiano", code:8 , agent:"4113"},
      {name:"Dólar venezuela", code:17, agent:"5762"}
    ];
    
    //validations imput -utils JS
    const justTextValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\p{L}\s]/gu, "") }
    const justNumbersValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\d]/g, "") }

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
        if(!name || !date || !email || !username || !password || !phone || !currency) return alert("Todos los campos son obligatorios");
        try {
            await ServerConnection.users.preRegister(username, email, country+phone, platform);
            alert("SMS enviado!, verifique su celular")//este capaz debe estar en onOK tambien
            counterResendSms();
        } catch (error) {
            onError(error);
        }
    }

    async function registerClick(){
        if(!name || !date || !email || !username || !password || !phone || !currency) return alert("Todos los campos son obligatorios");
        if (password.length <= 5) return alert("La contraseña debe tener 6 caracteres como mínimo");
        if(!smscode) return alert("Ingrese el código de verificación");
        if(!term_conditions) return alert("Debe aceptar los términos y condiciones");
        try {
        const {data} = await ServerConnection.users.register(username,name,country,country+phone, email, password, date, operatorId,smscode,usertype,platform,currency);
        onOk(data);
        } catch (error) {
            onError(error);
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
    <input type="text" class="ipt" placeholder="Nombre de usuario" autocomplete="off" bind:value={username}>
    <div class="singup__form--pass"><!-- {classname}__form--pass" -->
        <InputPassword bind:password/>
    </div>
    <DropdownCurrencies {currencies} bind:operatorId bind:currency/>
    <div class="singup__phone">
        <DropdowPrefix {countries} bind:country/>
        <input type="number" class="ipt" min="0" placeholder="Teléfono" autocomplete="off" bind:value={phone}>
    </div>
    <div class="singup__sms">
        {#if !activeSMS}
        <button type="button" class="btn validsms" on:click={preRegisterClick}>Generar código SMS</button>
        {:else}
        <button type="button" class="btn validsms"> Nuevo código en: <b>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</b></button>
        {/if}
        <input type="number" class="ipt" min="0" placeholder="Código" autocomplete="off" bind:value={smscode} on:input={justNumbersValidate}>
    </div>
    <div class="singup__conditions">   
        <input type="checkbox" id="chk_conditions" bind:checked={term_conditions}/>
        <label for="chk_conditions"></label> 
        <div>Para convertirme en cliente, acepto las <b><a class="link" href="#">Políticas de Privacidad</a></b> de Babieca.</div>
    </div>
    <button type="button" class="btn singup" on:click={registerClick}>Registrar</button>
</form>