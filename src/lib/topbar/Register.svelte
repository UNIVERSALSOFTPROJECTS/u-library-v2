<script>
  import EventManager from "../../js/EventManager.js";

  export let onPasswordChangeModal;

  let showUserCreation = false;
  let registerByEmail=true;
  let email = "";
  let phone_number = "";

  function phoneOnlyNumber(event) {
    let isNumber = /\d/.test(event.key);
    if (isNumber && phone_number.length < 9) phone_number += event.key;
  }

  const registerUser = async () => {
    let isEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
    if(registerByEmail &&  !email){ EventManager.publish("notify", {mode:"error", msg:"El e-mail no puede ser vacio"}); return; }
    if(registerByEmail &&  !isEmail){ EventManager.publish("notify", {mode:"error", msg:"Formato de e-mail incorrecto"}); return; }
    if(!registerByEmail && !phone_number ){ EventManager.publish("notify", {mode:"error", msg:"El telefono no puede ser vacio"});  return;}
    showUserCreation=true;
  };

</script>

<div class="u-main-conteiner">
  <div class="u-conteiner">
    <div class="Headboard">
      <span>Registro</span>
    </div>
    <div class="u-body">
      <div class="u-select-opc">
        <span>Teléfono</span>
        <div class="u-toggle-button">
          <label class="u-switch">
            <input class="u-toggle" type="checkbox"  bind:checked={registerByEmail}/>
            <span class="u-slider" />
          </label>
        </div>
        <span>Email</span>
      </div>
      {#if registerByEmail}
      <div class="u-input-group u-content-email">
        <input class="u-input-email" type="text" bind:value={email}/>
        <label class="u-email" for="email">Dirección de correo electronico</label>
        <div class="u-main-conteiner-card">
          <select class="u-card-cash" name="u-card-cash" id="">
            <option value="Soles">Soles</option>
            <option value="Dolares">Dolares</option>
          </select>
        </div>
        <div class="u-condition">
          <input type="checkbox">
          <span>Acepto los<u>Términos y condiciones y la Política de privacidad</u></span>
        </div>
      </div>
      {:else}
      <div class="u-input-group u-content-phone">
        <div class="u-main-content-phone">
          <select class="u-select-phone" name="phone" id="">
            <option value="">+54</option>
          </select>
          <input class="u-input-phone" type="text" bind:value={phone_number} on:keypress|preventDefault={(e) => phoneOnlyNumber(e)}/>
          <label class="u-phone" for="phone">Teléfono</label>
        </div>
        <div class="u-main-conteiner-card">
          <select class="u-card-cash" name="u-card-cash" id="">
            <option value="Soles">Soles</option>
            <option value="Dolares">Dolares</option>
          </select>
        </div>
        <div class="u-condition">
          <input type="checkbox">
          <span>Acepto los<u>Términos y condiciones y la Política de privacidad</u></span>
        </div>
      </div>
      {/if}
      <div class="u-controls-buttons">
        <button class="u-login" on:click={registerUser}>INSCRIBIRSE</button>
        
        <p>
          ¿Ya eres usuario? <button class="u-btn password" on:click={onPasswordChangeModal}
          >Iniciar Sesion</button>
        </p>
        
      </div>
    </div>
  </div>
</div>

<style>
  @media only screen and (max-width: 768px) {
    .u-main-conteiner {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .u-conteiner {
      display: flex;
      font-size: 18px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: white;
      border-radius: 15px;
      width: 100%;
      gap: 10px;
    }
    /*Cabecera*/
    .Headboard{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 2.5rem;
      background-color: #181824;
      color: #adadad;
      border-top-left-radius: 0.8rem;
      border-top-right-radius: 0.8rem;
    }
    .u-body{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      color: #000000;
    }
    /*Selección de Opc*/
    .u-select-opc{
      color: #adadad;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 5rem;
      height: 3rem;
    }
    .u-toggle-button {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .u-switch {
      position: relative;
      display: block;
    }
    .u-slider {
      position: absolute;
      width: 70px;
      height: 30px;
      background: #00dc1d;
      border-radius: 20px;
      border: 1px solid white;
      left: -2rem;
      top: -1rem;
      right: 0;
      transition: 0.4s;
    }

    .u-switch .u-toggle{
      display: none;
    }
    .u-slider::before {
      position: absolute;
      content: "";
      background-color: white;
      height: 25px;
      width: 25px;
      top: 2px;
      left: 2px;
      border: 1px solid #048315;
      border-radius: 50%;
      transition: 0.4s;
    }
    .u-toggle:checked + .u-slider {
      background: #00dc1d;
    }
    .u-toggle:checked + .u-slider::before {
      transform: translateX(40px);
    }
    /*Input Group*/
    .u-input-group{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }
    .u-input-email{
      border: 1.5px solid #9e9e9e;
      border-radius: 0.5rem;
      height: 1rem;
      background:none;
      padding: 1rem;
      font-size: 1rem;
      color: #000000;
      width: 25rem;
      transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .u-email{
      position: absolute;
      left: 14%;
      top: 8rem;
      color: #c1bdbd;
      pointer-events: none;
      transform: translateY(1rem);
      transition:150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .u-input-email:focus{
      outline: none;
      border: 1.5px solid #110845;
    }
    .u-input-email:focus ~.u-email{
      left: 10%;
      top: 20%;
      transform: translateY(-10%) scale(0.8);
      background-color: #edf2fce4;
      border-radius: 0.2rem;
      color: #1b4f78;
    }
    .u-card-cash{
      border: none;
      width:100%;
      text-decoration: none;
      font-size: 14px;
    }
    .u-main-content-phone{
      display: flex;
      flex-direction: row;
      align-items: center;
      border: 1px solid #9e9e9e;
      height: 2.8rem;
      border-radius: 0.5rem;

    }
    .u-select-phone{
      height: 102%;
      border-radius:0.5rem 0 0 0.5rem ;
    }
    .u-input-phone{
      height: 90%;
      border: 1.5px solid #9e9e9e;
      border-radius: 0 0.5rem 0.5rem 0;
      background:none;
      font-size: 1rem;
      color: #000000;
      width: 25rem;
      transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .u-phone{
      position: absolute;
      color: #8d8484;
      pointer-events: none;
      transform: translateX(3.5rem);
      transition:150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .u-input-phone:focus{
      outline: none;
      border: 1.5px solid #000000;
    }
    .u-input-phone:focus ~.u-phone{
      left: 18%;
      transform: translateY(-100%) scale(0.8);
      background-color: #ffffffe4;
      border-radius: 0.2rem;
      color: #252626;
    }
    .u-main-conteiner-card{
      width: 96%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid #adadad;
      height: 1.8rem;
    }
    .u-condition{
      font-size: 14px;
      width: 100%;
      font-weight:520;
    }
    .u-controls-buttons{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    .u-login{
      background-color: #04BC71;
      border: none;
      border-radius: 0.3rem;
      padding: 0.5rem;
      width: 100%;
      font-weight: 700;
      color: white;
      cursor: pointer;
    }
    input:focus-visible{
      outline: 0;
    }
    select:focus-visible{
      outline: 0;
    }
   
  }
  @media only screen and (max-width: 768px) and (orientation: landscape) {
    .u-main-conteiner {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .u-conteiner {
      display: flex;
      font-size: 18px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: white;
      border-radius: 15px;
      width: 100%;
      gap: 10px;
    }
    /*Cabecera*/
    .Headboard{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 2.5rem;
      background-color: #181824;
      color: #adadad;
      border-top-left-radius: 0.8rem;
      border-top-right-radius: 0.8rem;
    }
    .u-body{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      color: #000000;
    }
    /*Selección de Opc*/
    .u-select-opc{
      color: #adadad;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 5rem;
      height: 3rem;
    }
    .u-toggle-button {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .u-switch {
      position: relative;
      display: block;
    }
    .u-slider {
      position: absolute;
      width: 70px;
      height: 30px;
      background: #00dc1d;
      border-radius: 20px;
      border: 1px solid white;
      left: -2rem;
      top: -1rem;
      right: 0;
      transition: 0.4s;
    }

    .u-switch .u-toggle{
      display: none;
    }
    .u-slider::before {
      position: absolute;
      content: "";
      background-color: white;
      height: 25px;
      width: 25px;
      top: 2px;
      left: 2px;
      border: 1px solid #048315;
      border-radius: 50%;
      transition: 0.4s;
    }
    .u-toggle:checked + .u-slider {
      background: #00dc1d;
    }
    .u-toggle:checked + .u-slider::before {
      transform: translateX(40px);
    }
    /*Input Group*/
    .u-input-group{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }
    .u-input-email{
      border: 1.5px solid #9e9e9e;
      border-radius: 0.5rem;
      height: 1rem;
      background:none;
      padding: 1rem;
      font-size: 1rem;
      color: #000000;
      width: 25rem;
      transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .u-email{
      position: absolute;
      left: 14%;
      top: 8rem;
      color: #c1bdbd;
      pointer-events: none;
      transform: translateY(1rem);
      transition:150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .u-input-email:focus{
      outline: none;
      border: 1.5px solid #110845;
    }
    .u-input-email:focus ~.u-email{
      left: 10%;
      top: 20%;
      transform: translateY(-10%) scale(0.8);
      background-color: #edf2fce4;
      border-radius: 0.2rem;
      color: #1b4f78;
    }
    .u-card-cash{
      border: none;
      width:100%;
      text-decoration: none;
      font-size: 14px;
    }
    .u-main-content-phone{
      display: flex;
      flex-direction: row;
      align-items: center;
      border: 1px solid #9e9e9e;
      height: 2.8rem;
      border-radius: 0.5rem;

    }
    .u-select-phone{
      height: 102%;
      border-radius:0.5rem 0 0 0.5rem ;
    }
    .u-input-phone{
      height: 90%;
      border: 1.5px solid #9e9e9e;
      border-radius: 0 0.5rem 0.5rem 0;
      background:none;
      font-size: 1rem;
      color: #000000;
      width: 25rem;
      transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .u-phone{
      position: absolute;
      color: #8d8484;
      pointer-events: none;
      transform: translateX(3.5rem);
      transition:150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .u-input-phone:focus{
      outline: none;
      border: 1.5px solid #000000;
    }
    .u-input-phone:focus ~.u-phone{
      left: 18%;
      transform: translateY(-100%) scale(0.8);
      background-color: #ffffffe4;
      border-radius: 0.2rem;
      color: #252626;
    }
    .u-main-conteiner-card{
      width: 96%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid #adadad;
      height: 1.8rem;
    }
    .u-condition{
      font-size: 14px;
      width: 100%;
      font-weight:520;
    }
    .u-controls-buttons{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    .u-login{
      background-color: #04BC71;
      border: none;
      border-radius: 0.3rem;
      padding: 0.5rem;
      width: 100%;
      font-weight: 700;
      color: white;
      cursor: pointer;
    }
    input:focus-visible{
      outline: 0;
    }
    select:focus-visible{
      outline: 0;
    }
  /*Estilo Desktop*/
  }
  @media only screen and (min-width: 768px) {
    .u-main-conteiner {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .u-conteiner {
      display: flex;
      font-size: 18px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: white;
      border-radius: 15px;
      width: 100%;
      gap: 10px;
    }
    /*Cabecera*/
    .Headboard{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 2.5rem;
      background-color: #181824;
      color: #adadad;
      border-top-left-radius: 0.8rem;
      border-top-right-radius: 0.8rem;
    }
    .u-body{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      color: #000000;
    }
    /*Selección de Opc*/
    .u-select-opc{
      color: #adadad;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 5rem;
      height: 3rem;
    }
    .u-toggle-button {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .u-switch {
      position: relative;
      display: block;
    }
    .u-slider {
      position: absolute;
      width: 70px;
      height: 30px;
      background: #00dc1d;
      border-radius: 20px;
      border: 1px solid white;
      left: -2rem;
      top: -1rem;
      right: 0;
      transition: 0.4s;
    }

    .u-switch .u-toggle{
      display: none;
    }
    .u-slider::before {
      position: absolute;
      content: "";
      background-color: white;
      height: 25px;
      width: 25px;
      top: 2px;
      left: 2px;
      border: 1px solid #048315;
      border-radius: 50%;
      transition: 0.4s;
    }
    .u-toggle:checked + .u-slider {
      background: #00dc1d;
    }
    .u-toggle:checked + .u-slider::before {
      transform: translateX(40px);
    }
    /*Input Group*/
    .u-input-group{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }
    .u-input-email{
      border: 1.5px solid #9e9e9e;
      border-radius: 0.5rem;
      height: 1rem;
      background:none;
      padding: 1rem;
      font-size: 1rem;
      color: #000000;
      width: 25rem;
      transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .u-email{
      position: absolute;
      left: 14%;
      top: 8rem;
      color: #c1bdbd;
      pointer-events: none;
      transform: translateY(1rem);
      transition:150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .u-input-email:focus{
      outline: none;
      border: 1.5px solid #110845;
    }
    .u-input-email:focus ~.u-email{
      left: 10%;
      top: 20%;
      transform: translateY(-10%) scale(0.8);
      background-color: #edf2fce4;
      border-radius: 0.2rem;
      color: #1b4f78;
    }
    .u-card-cash{
      border: none;
      width:100%;
      text-decoration: none;
      font-size: 14px;
    }
    .u-main-content-phone{
      display: flex;
      flex-direction: row;
      align-items: center;
      border: 1px solid #9e9e9e;
      height: 2.8rem;
      border-radius: 0.5rem;

    }
    .u-select-phone{
      height: 102%;
      border-radius:0.5rem 0 0 0.5rem ;
    }
    .u-input-phone{
      height: 90%;
      border: 1.5px solid #9e9e9e;
      border-radius: 0 0.5rem 0.5rem 0;
      background:none;
      font-size: 1rem;
      color: #000000;
      width: 25rem;
      transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .u-phone{
      position: absolute;
      color: #8d8484;
      pointer-events: none;
      transform: translateX(3.5rem);
      transition:150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .u-input-phone:focus{
      outline: none;
      border: 1.5px solid #000000;
    }
    .u-input-phone:focus ~.u-phone{
      left: 18%;
      transform: translateY(-100%) scale(0.8);
      background-color: #ffffffe4;
      border-radius: 0.2rem;
      color: #252626;
    }
    .u-main-conteiner-card{
      width: 96%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid #adadad;
      height: 1.8rem;
    }
    .u-condition{
      font-size: 14px;
      width: 100%;
      font-weight:520;
    }
    .u-controls-buttons{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    .u-login{
      background-color: #04BC71;
      border: none;
      border-radius: 0.3rem;
      padding: 0.5rem;
      width: 100%;
      font-weight: 700;
      color: white;
      cursor: pointer;
    }
    input:focus-visible{
      outline: 0;
    }
    select:focus-visible{
      outline: 0;
    }
  }
</style>
