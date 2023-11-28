<script>
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
  export let onOpenConditions;

  


  let registerUser = {
    address: "-",
    zip: "-",
    city: "-",
    name: "",
    username: "",
    password: "",
    phone: "",
    email: "",
    smscode: "",
    document: "",
    birthday: "",
  };
  let loadSms;
  let loadSingup;
  //contador de 2 min
  let activeSMS;
  let minutes;
  let seconds;
  let smsSent = false;

  onMount(() => {
    smsSent = false;
  });

  async function preRegisterClick() {
    if (!registerUser.username)return notify.error("Ingrese nombre de usuario");
    if (!registerUser.email) return notify.error("Ingrese su email");
    if (registerUser.password.length < 6) return notify.error("La contraseña debe tener al menos 6 caracteres.");
    if (!registerUser.phone) return notify.error("Ingrese su numero de celular");
    if (registerUser.password != registerUser.verifypassword) return notify.error("Las contraseñas son diferentes");
    try {
      let params = { ...registerUser };
      console.log(params);
      notify.success("Se esta enviando un SMS a su telefono.");
      await backend.u_user.preRegister(params);
      smsSent = true;
    } catch (error) {
      return notify.error("El preregistro de usuario fallo");
    }
  }

  async function registerClick() {
    let params = { ...registerUser };
    console.log(params);
    for (const key in params) {
      if (params[key] == "") return notify.error("Llene todos los campos");
      if (!registerUser.term_conditions)
        return notify.error(
          "Debes aceptar los términos y condiciones para registrarte."
        );
    }
    try {
      await backend.u_user.register(params);
      onOkSingup();
    } catch (error) {
      console.log("error", error);
      if (error.response.data.errorCode == "SMS_CODE_INVALID")
        return notify.error("El codigo SMS es invalido");
      if (error.response.data.errorCode == "CASINO_PLATFORM_CHECK_EMAIL_PHONE")
        return notify.error("La informacion ya existe");
      else return notify.error("No se pudo crear el usuario");
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
  <input bind:value={registerUser.name} class="ipt" placeholder="Nombre" autocapitalize="off" />
  <input bind:value={registerUser.username} class="ipt" placeholder="Nombre de Usuario" autocapitalize="off"/>
  <input bind:value={registerUser.password} class="ipt" placeholder="Ingrese contraseña"/>
  <input bind:value={registerUser.verifypassword} class="ipt" placeholder="Verificar contraseña"/>
  <div class="signup__phone">
    <UDropdowPrefix {countries} bind:countryPrefix={registerUser.countryPrefix} bind:countryCode={registerUser.countryCode} />
    <input bind:value={registerUser.phone} on:keypress={isOnlyNumber} inputmode="numeric" class="ipt" placeholder="Teléfono" autocomplete="off" />
  </div>
  <input bind:value={registerUser.email} type="email" class="ipt" placeholder="Correo electrónico" autocomplete="off" >
  <div class="signup__sms">
    <button class="btn btn-default" on:click={preRegisterClick} disabled={loadSms}>
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
        Nuevo código en: <b>{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</b>
      {/if}
    </button>
    <input bind:value={registerUser.smscode} on:keypress={isOnlyNumber} type="number" class="ipt" min="0" placeholder="Código" autocomplete="off"/>
  </div>
  <select bind:value={registerUser.currency} class="ipt">
    {#each currencies as currency}
      <option>{currency}</option>
    {/each}
  </select>
  <div class="signup__sms">
    <select bind:value={registerUser.doctype} class="ipt">
      {#each doctypes as doctype}
        <option>{doctype}</option>
      {/each}
    </select>
    <input bind:value={registerUser.document} on:keypress={isOnlyNumber} class="ipt" placeholder="Ingrese su numero de documento" inputmode="numeric"/>
  </div>

  <div class="signup__form--date">
    <p>Fecha de nacimiento:</p>
    <div class="signup__date">
      <DropdownDate bind:date={registerUser.birthday} />
    </div>
  </div>
  <div class="signup__conditions">
    <input type="checkbox" id="chk_conditions" bind:checked={registerUser.term_conditions} />
    <label for="chk_conditions" />
    <div class="chk_conditions"> Para convertirme en cliente, acepto las <b><button  on:click={onOpenConditions} class="link" >Políticas de Privacidad</button></b>de {platform}.</div>
  </div>
  <button class="btn signup__btn" on:click={registerClick} disabled={loadSingup || !smsSent} >
    {#if loadSingup}
      <div class="loading">
        <p />
        <p />
        <p />
      </div>
    {:else}
      Registrar
    {/if}
  </button>
</div>



<style>
  .chk_conditions {
    color: white;
  }
  .link{
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: white;
    border-bottom: 1px solid white;
  }
  @media only screen and (max-width: 768px) {
  }
  @media only screen and (max-width: 768px) and (orientation: landscape) {
  }
</style>
