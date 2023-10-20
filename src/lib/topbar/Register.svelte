<script>
  import EventManager from "../../js/EventManager.js";
  import DropdowPrefix from "../dropdown/DropdowPrefix.svelte";
  import DropdownDate from "../dropdown/DropdownDate.svelte";
  import backend from "../../js/server";
  import notify from "../../js/notify";
  import UDropdowPrefix from "./UDropdowPrefix.svelte";

  export let countries;
  export let platform;

  let registerUser = {
    address: '-',
    zip: '-',
    city: '-',
  };
  let loadSms;
  let loadSingup;
  //contador de 2 min
  let activeSMS;
  let minutes;
  let seconds;
  let term_conditions;

  function counterResendSms() {
    activeSMS = true;
    minutes = 0;
    seconds = 10;
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

  async function preRegisterClick() {
    if(!registerUser.username) return notify.error("Ingrese nombre de usuario");
    if(!registerUser.email) return notify.error("Ingrese su email");
    if(!registerUser.phone) return notify.error("Ingrese su numero de celular");
    try {
      let params ={...registerUser}
      console.log(params);
      await backend.u_user.preRegister(params);
    } catch (error) {
      return notify.error("No se pudo crear el usuario");
    }
  }

  async function registerClick(){
    try {
      let params ={...registerUser};
      for(  const key in params) {
        if( params[key]=='' ) return notify.error('Falta: ' + key + '->Ingrese el campo');
      }
      await backend.u_user.register(params);
      
    } catch (error) {
      console.log('error', error);
      if (error.response.data.errorCode == 'SMS_CODE_INVALID_') return notify.error("El codigo SMS es invalido");
      else return notify.error("No se pudo crear el usuario")
    }

    }

  const isOnlyNumber = (event) => {
    if (!/\d/.test(event.key)) {
      event.preventDefault();
      notify.error("Ingrese solo números");
    }
  };

</script>

<div class="modal-body">
  <input bind:value={registerUser.name} type="text" class="ipt" placeholder="Nombre" />
  <input bind:value={registerUser.username} type="text" class="ipt" placeholder="Nombre de Usuario" />
  <input bind:value={registerUser.password} type="text" class="ipt" placeholder="Ingrese contraseña" />
  <div class="singup__phone">
    <UDropdowPrefix {countries} bind:countryPrefix={registerUser.countryPrefix} bind:countryCode={registerUser.countryCode} />
    <input  bind:value={registerUser.phone} on:keypress={isOnlyNumber} inputmode="numeric" type="text" class="ipt" placeholder="Teléfono" autocomplete="off" />
  </div>
  <input bind:value={registerUser.email} type="email" class="ipt" placeholder="Correo electrónico" autocomplete="off" >
  <div class="singup__sms">
    <button type="button" class="btn btn-default" on:click={preRegisterClick} disabled={loadSms}>
      {#if !activeSMS}
        {#if loadSms}
          <div class="loading">
            <p />
            <p />
            <p />
          </div>
        {:else}
          Generar código SMS
        {/if}
      {:else}
        Nuevo código en: <b
          >{minutes.toString().padStart(2, "0")}:{seconds
            .toString()
            .padStart(2, "0")}</b
        >
      {/if}
    </button>
    <input bind:value={registerUser.smscode}  on:keypress={isOnlyNumber} type="number" class="ipt" min="0" placeholder="Código" autocomplete="off" />
  </div>
  <select bind:value={registerUser.currency} class="ipt" disabled>
    <option  value="PEN">SOLES</option>
  </select>
  <select bind:value={registerUser.doctype} class="ipt" disabled>
    <option  value="DNI">DNI</option>
  </select>
  <input bind:value={registerUser.document}  on:keypress={isOnlyNumber}  type="text" class="ipt" placeholder="Ingrese su numero de documento" inputmode="numeric"/>
  <div class="singup__form--date">
    <p>Fecha de nacimiento</p>
    <div class="singup__date">
      <DropdownDate bind:date={registerUser.date} />
    </div>
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
</div>

<style>
  @media only screen and (max-width: 768px) {
  }
  @media only screen and (max-width: 768px) and (orientation: landscape) {
  }
</style>
