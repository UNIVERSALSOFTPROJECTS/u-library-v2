<script>
  import EventManager from "../../js/EventManager.js";
  import DropdowPrefix from "../dropdown/DropdowPrefix.svelte";
  import DropdownDate from "../dropdown/DropdownDate.svelte";

  export let countries;
  export let platform;

  let registerUser = {};
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
    let params ={...registerUser}
    
  }

  async function registerClick(){
       
    }

  const justNumbersValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\d]/g, "") }
</script>

<div class="modal-body">
  <input type="text" class="ipt" placeholder="Nombre" />
  <input type="text" class="ipt" placeholder="Nombre de Usuario" />
  <input type="text" class="ipt" placeholder="Ingrese contraseña" />
  <div class="singup__phone">
    <DropdowPrefix {countries} bind:country={registerUser.country} />
    <input
      type="number"
      class="ipt"
      min="0"
      placeholder="Teléfono"
      autocomplete="off"
      bind:value={registerUser.phone}
    />
  </div>
  <div class="singup__sms">
    <button
      type="button"
      class="btn btn-default"
      on:click={preRegisterClick}
      disabled={loadSms}
    >
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
    <input
      type="number"
      class="ipt"
      min="0"
      placeholder="Código"
      autocomplete="off"
      bind:value={registerUser.smscode}
      on:input={justNumbersValidate}
    />
  </div>
  <input
    type="email"
    class="ipt"
    placeholder="Correo electrónico"
    autocomplete="off"
    bind:value={registerUser.email}
  />
  <select class="ipt" disabled>
    <option value="USD">USD</option>
  </select>
  <div class="singup__form--date">
    <p>Fecha de nacimiento</p>
    <div class="singup__date">
      <DropdownDate bind:date={registerUser.date} />
    </div>
  </div>
  <input type="text" class="ipt" placeholder="Ingrese Ciudad" />
  <input type="text" class="ipt" placeholder="Código de cajero" />
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
