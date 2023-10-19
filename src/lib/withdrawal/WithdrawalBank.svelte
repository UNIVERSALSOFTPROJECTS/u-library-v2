<script>
  import ServerConnection from "./../../js/server";
  import EventManager from "../../js/EventManager";
  import notify from "../../js/notify";
  import { onMount } from "svelte";

  export let open;
  export let user;
  export let minAmount = 0;
  export let maxAmount = 100000;

  let amount = "";
  let accountNumber = "";
  let info = "";
  let bankName = "";
  let name = "";
  let document = "";
  let processing = false;

  const closeModal = () => {
    open = false;
  };

  onMount(() => {
    notify.setEM(EventManager);
  });

  const cashout = async () => {
    if (!amount || amount == "") return notify.error("Ingrese monto");
    if (Number(amount) < minAmount || Number(amount) > maxAmount)
      return notify.error(
        "Monto mínimo " +
          minAmount +
          " " +
          user.currency +
          ", máximo " +
          maxAmount +
          " " +
          user.currency
      );
    if (amount > user.balance) return notify.error("Saldo insuficiente");
    if (!name) return notify.error("Ingrese su nombre");
    if (!document) return notify.error("Ingrese su documento de Identidad");
    if (!bankName) return notify.error("Ingrese nombre del banco");
    if (!accountNumber) return notify.error("Ingrese numero de cuenta");
    try {
      processing = true;
      let params = {
        amount,
        name,
        document,
        bankName,
        accountNumber,
        info,
        playerId: user.playerId,
        platformId: user.platformId,
        currencyISO: user.currency,
      };
      if (!info) delete params.info;
      let { data } = await ServerConnection.u_wallet.withdrawalBank(
        user.token,
        params
      );
      //Retiro por banco descuenta balance
      notify.success("Procesado");
      user.balance = data.balance;
      withdrawalOk(data);
      closeModal();
    } catch (error) {
      withdrawalBankError(error);
    }
    processing = false;
  };

  const validateAmount = (event) => {
    let isNumber = /\d/.test(event.key);
    if (event.charCode === 45 || event.charCode === 43) {
      event.preventDefault();
      return;
    }
    if (isNumber && amount.length < 4) amount += event.key;
    else if (isNumber && amount.length >= 4)
      return notify.error("Alcanzó el límite de cifras");
  };

  const validateName = (e) => {
    let validatePatternName = /^[A-Za-zúéáíóüÜÑñÓÍÚÁÉ ]*$/.test(e.key);
    if (!validatePatternName) e.preventDefault();
    if (name.length >= 40) return notify.error("Máximo 40 caracteres");
  };

  const validateDocument = (event) => {
    let isNumber = /\d/.test(event.key);
    if (isNumber && document.length < 12) document += event.key;
    else if (isNumber && document.length >= 12)
      return notify.error("12 dígitos como máximo");
  };
  const validateBankName = (e) => {
    let validatePatternBankName = /^[A-Za-zúéáíóüÜÑñÓÍÚÁÉ ]*$/.test(e.key);
    if (!validatePatternBankName) e.preventDefault();
    if (bankName.length >= 40) return notify.error("40 caracteres como máximo");
  };

  const validateAccountNumber = (event) => {
    let isNumber = /\d/.test(event.key);
    if (isNumber && accountNumber.length < 20) accountNumber += event.key;
    else if (isNumber && accountNumber.length >= 20)
      return notify.error("40 caracteres como máximo");
  };

  const withdrawalBankError = (e) => {
    notify.error("Error al procesar retiro");
  };
  const withdrawalOk = (data) => {
    notify.success("Retiro procesado");
  };
</script>

<div class="u-main-payments">
  <div class="u-wrapp-payments">
    <span class="u-title">RETIRAR SU SALDO</span>
    <div class="u-content-info">
      <span>INGRESE EL MONTO A RETIRAR:</span>
      <input
        aria-label="amountLabel"
        class="ipt"
        bind:value={amount}
        type="text"
        max="2000"
        on:keypress|preventDefault={(e) => validateAmount(e)}
        placeholder="Ingrese el monto"
      />
      <span>Saldo Disponible: {user.balance} {user.currency}</span>
      <span
        >Retiro mínimo de 50 {user.currency} y máximo de 2000 {user.currency}</span
      >
    </div>
    <div class="data-process">
      <div class="g-data-bank">
        <div class="u-info">
          <span>Nombre completo:</span>
          <input
            class="ipt"
            aria-label="nameLabel"
            type="text"
            maxlength="40"
            bind:value={name}
            on:keypress={validateName}
            placeholder="Ingrese su nombre"
          />
        </div>
        <div class="u-info">
          <span>Documento de identidad:</span>
          <input
            aria-label="documentLabel"
            class="ipt"
            type="text"
            bind:value={document}
            on:keypress|preventDefault={(e) => validateDocument(e)}
            placeholder="Ingrese su documento de identidad"
          />
        </div>
        <div class="u-info">
          <span>Nombre de Banco:</span>
          <input
            aria-label="bankNameLabel"
            class="ipt"
            type="text"
            maxlength="40"
            bind:value={bankName}
            on:keypress={validateBankName}
            placeholder="Ingrese el nombre de su banco (BCP, BBVA, Etc.)"
          />
        </div>
        <div class="u-info">
          <span>Número de cuenta:</span>
          <input
            aria-label="accountLabel"
            class="ipt"
            type="text"
            maxlength="20"
            bind:value={accountNumber}
            on:keypress|preventDefault={(e) => validateAccountNumber(e)}
            placeholder="Ingrese el número de cuenta"
          />
        </div>
        <div class="u-info u-info-txt">
          <span>Información adicional</span>
          <input
            aria-label="infoLabel"
            class="ipt"
            type="text"
            bind:value={info}
            placeholder="Ingrese información adicional"
          />
        </div>
      </div>
    </div>
    <div class="gb-process">
      <span>Horario de retiro: Lunes a Viernes de 09:00am a 05:00pm </span>
      <span
        >Al solicitar su retiro usted esta aceptando los términos y condiciones</span
      >

      <button class="u-button-pay" on:click={cashout} disabled={processing}
        >{processing ? "PROCESANDO..." : "SOLICITAR RETIRO"}</button
      >
    </div>
  </div>
  <button class="u-close" on:click={closeModal}>X</button>
</div>

<style>
  .u-button-pay:disabled {
    background-color: rgb(210, 184, 54);
  }
  input:focus-visible {
    outline: 0;
  }
  div {
    color: #000;
  }
  .u-title {
    padding: 0;
    margin: 0;
    font-weight: 600;
  }
  .ipt {
    border: 1px solid rgb(208 206 206);
    color: #000;
  }
  .u-main-payments {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 0.5rem;
  }
  .u-close {
    background: #bd992a;
    color: black;
    width: auto;
    text-align: center;
    height: auto;
    font-size: 28px;
    font-weight: 800;
    border: 1px solid white;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  .u-wrapp-payments {
    background: white;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0.5rem;
    padding: 1rem;
  }
  .data-process {
    width: 100%;
    padding: 1rem;
  }
  .u-button-pay {
    background: #dead1a;
    border: none;
    height: 2rem;
    width: 100%;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }
  .u-content-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: 400;
  }
  .u-info-txt {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .g-data-bank {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 90%;
  }
  .gb-process {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 11px;
  }

  @media only screen and (max-width: 1200px) {
    .u-close {
      position: absolute;
      left: 90%;
      color: black;
      width: 40px;
      font-size: 22px;
    }
    .u-wrapp-payments {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
