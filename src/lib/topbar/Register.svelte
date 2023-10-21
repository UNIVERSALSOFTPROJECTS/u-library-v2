<script>
  import EventManager from "../../js/EventManager.js";
  import DropdowPrefix from "../dropdown/DropdowPrefix.svelte";
  import DropdownDate from "../dropdown/DropdownDate.svelte";
  import backend from "../../js/server";
  import notify from "../../js/notify";
  import UDropdowPrefix from "./UDropdowPrefix.svelte";
  import { onMount } from "svelte";

  export let countries;
  export let platform;
  export let currencies;
  export let doctypes;
  export let onOkSingup;



  let registerUser = {
    address: '-',
    zip: '-',
    city: '-',
    name: '',
    username: '',
    password: '',
    phone: '',
    email: '',
    smscode: '',
    document: '',
    birthday: '',

  };
  let loadSms;
  let loadSingup;
  //contador de 2 min
  let activeSMS;
  let minutes;
  let seconds;
  let term_conditions;
  let smsSent = false;
  
  onMount(()=>{
    smsSent = false;
  })


  async function preRegisterClick() {
    if(!registerUser.username) return notify.error("Ingrese nombre de usuario");
    if(!registerUser.email) return notify.error("Ingrese su email");
    if(!registerUser.phone) return notify.error("Ingrese su numero de celular");
    try {
      let params ={...registerUser}
      console.log(params);
      notify.success("Se esta enviando un SMS a su telefono.")
      await backend.u_user.preRegister(params);
      
      smsSent = true
    } catch (error) {
      return notify.error("No se pudo crear el usuario");
    }
  }

  async function registerClick(){
    let params ={...registerUser};
    console.log(params);
    for(  const key in params) {
      if( params[key]=='' ) return notify.error('Llene todos los campos');
    }
    try {
      await backend.u_user.register(params);
      onOkSingup();
    } catch (error) {
      console.log('error', error);
      if (error.response.data.errorCode == 'SMS_CODE_INVALID') return notify.error("El codigo SMS es invalido");
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
  <select bind:value={registerUser.currency} class="ipt" >
    {#each  currencies as currency }
    <option>{currency}</option>
    {/each}
  </select>
  <div class="singup__sms">
    <select bind:value={registerUser.doctype} class="ipt">
    {#each  doctypes as doctype }
    <option>{doctype}</option>
    {/each}
  </select>
  <input bind:value={registerUser.document}  on:keypress={isOnlyNumber}  type="text" class="ipt" placeholder="Ingrese su numero de documento" inputmode="numeric"/>
  </div>
  
  <div class="singup__form--date">
    <p>Fecha de nacimiento:</p>
    <div class="singup__date">
      <DropdownDate bind:date={registerUser.birthday} />
    </div>
  </div>
  <div class="singup__conditions">
    <input type="checkbox" id="chk_conditions" bind:checked={registerUser.term_conditions}/>
    <label for="chk_conditions"></label> 
    <div class="chk_conditions">Para convertirme en cliente, acepto las <b><a class="link" href="#">Políticas de Privacidad</a></b> de {platform}.</div>
  </div>
  <button type="button" class="btn singup__btn" on:click={registerClick} disabled={loadSingup || !smsSent}>
    {#if loadSingup}
      <div class="loading"><p></p><p></p><p></p></div>
      {:else}
      Registrar
    {/if}
  </button>
</div>

<style>
  .chk_conditions{
    color: white;
  }
  @media only screen and (max-width: 768px) {
  }
  @media only screen and (max-width: 768px) and (orientation: landscape) {
  }
</style>
