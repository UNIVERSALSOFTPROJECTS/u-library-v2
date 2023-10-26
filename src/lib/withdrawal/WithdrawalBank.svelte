<script>
  import ServerConnection from "./../../js/server";
  import EventManager from "../../js/EventManager";
  import notify from "../../js/notify";
  import { onMount } from "svelte";

  export let open;
  export let user;
  export let limitAmount;

  let withdrawalBank = {};
  let processing = false;

  onMount(() => {
    notify.setEM(EventManager);
    withdrawalBank={
      name: user.name,
      username: user.username,
      document: user.data.document,
      amount: 50,
      info:'.'
    }
  });

  const cashout = async () => {
    if (!withdrawalBank.amount || withdrawalBank.amount == "") return notify.error("Ingrese monto");
    if (Number(withdrawalBank.amount) < limitAmount.min || Number(withdrawalBank.amount) > limitAmount.max) return notify.error( "Monto mínimo " + limitAmount.min + " " + user.currency + ", máximo " +  limitAmount.max + " " + user.currency );
    if (withdrawalBank.amount > user.balance) return notify.error("Saldo insuficiente");
    if (!withdrawalBank.name) return notify.error("Ingrese su nombre");
    if (!withdrawalBank.document) return notify.error("Ingrese su documento de Identidad");
    if (!withdrawalBank.bankName) return notify.error("Ingrese nombre del banco");
    if (!withdrawalBank.accountNumber) return notify.error("Ingrese numero de cuenta");
    try {
      const u = sessionStorage.getItem("user");
      let user_ = JSON.parse(u);
      processing = true;
      let params = {...withdrawalBank,
        playerId: user_.playerId,
        currencyISO: user_.currency,

      };
      let { data } = await ServerConnection.u_wallet.withdrawalBank(user.token, params);
      notify.success("Procesado");
      withdrawalOk(data);
      closeModal();
    } catch (error) {
      withdrawalBankError(error);
    }
    processing = false;
  };

  const isOnlyNumber = (event) => {
    const inputAllowedCharacters = /[0-9.]/; // Permitir números, comas y puntos
    const inputValue = event.target.value + event.key;
    
    if (!inputAllowedCharacters.test(event.key)) {
      event.preventDefault();
      notify.error("Ingrese solo números y puntos.");
    }
    // Verificar que el punto decimal no aparezca al principio
    if (event.key === '.' && !inputValue.match(/[0-9]/)) {
      event.preventDefault();
      notify.error("No puede ingresar un punto al principio.");
    }
    // Asegurarse de que solo haya un punto decimal
    if ((inputValue.match(/\./g) || []).length > 1) {
      event.preventDefault();
      notify.error("Ingrese solo un punto decimal.");
    }
  };

  const validateName = (e) => {
    let validatePatternName = /^[A-Za-zúéáíóüÜÑñÓÍÚÁÉ ]*$/.test(e.key);
    if (!validatePatternName) e.preventDefault();
    if ( withdrawalBank.name.length >= 40) return notify.error("Máximo 40 caracteres");
  };

  const validateDocument = (event) => {
    let isNumber = /\d/.test(event.key);
    if (isNumber &&  withdrawalBank.document.length < 12) document += event.key;
    else if (isNumber &&  withdrawalBank.document.length >= 12)
      return notify.error("12 dígitos como máximo");
  };
  const validateBankName = (e) => {
    let validatePatternBankName = /^[A-Za-zúéáíóüÜÑñÓÍÚÁÉ ]*$/.test(e.key);
    if (!validatePatternBankName) e.preventDefault();
    if ( withdrawalBank.bankName.length >= 40) return notify.error("40 caracteres como máximo");
  };

  const withdrawalBankError = (e) => {
    notify.error("Error al procesar retiro");
  };
  const withdrawalOk = (data) => {
    notify.success("Retiro procesado");
  };
  const closeModal = () => {
    open = false;
  };
</script>

<div class="withdrawal-demo modal">
  <div class="withdrawal-body">
    <div class="withdrawal__header">
      <span class="u-title">RETIRAR SU SALDO</span>
      <button class="btn close" on:click={closeModal} ></button>
    </div>
    <div class="withdrawal__body--amount">
      <span>INGRESE EL MONTO A RETIRAR:</span>
      <input
        on:keypress={isOnlyNumber}
        bind:value={withdrawalBank.amount}
        aria-label="amountLabel"
        class="ipt"
        type="text"
        max="2000"
        inputmode="numeric"
        placeholder="Ingrese el monto"
      />
      <span>Saldo Disponible: {user.balance} {user.currency}</span>
      <span
        >Retiro mínimo de 50 {user.currency} y máximo de 2000 {user.currency}</span
      >
    </div>
    <div class="withdrawal__body">
      <label>Nombre completo:
        <input
          class="ipt"
          aria-label="nameLabel"
          type="text"
          maxlength="40"
          bind:value={withdrawalBank.name}
          on:keypress={validateName}
          placeholder="Ingrese su nombre"
        />
      </label>
      <label>Documento de identidad:
        <input
          aria-label="documentLabel"
          class="ipt"
          type="text"
          bind:value={withdrawalBank.document}
          on:keypress|preventDefault={(e) => validateDocument(e)}
          placeholder="Ingrese su documento de identidad"
        />
      </label>
      <label>Nombre de Banco:
        <input
          aria-label="bankNameLabel"
          class="ipt"
          type="text"
          maxlength="40"
          bind:value={withdrawalBank.bankName}
          on:keypress={validateBankName}
          placeholder="Ingrese el nombre de su banco (BCP, BBVA, Etc.)"
          />
      </label>
      <label>Número de cuenta:
        <input
          aria-label="accountLabel"
          class="ipt"
          type="text"
          maxlength="20"
          bind:value={withdrawalBank.accountNumber}
          placeholder="Ingrese el número de cuenta"
        />
      </label>
      <label>Información adicional
        <input
          aria-label="infoLabel"
          class="ipt"
          type="text"
          bind:value={withdrawalBank.info}
          placeholder="Ingrese información adicional"
        />
      </label>
      <div class="gb-process">
        <span>Horario de retiro: Lunes a Viernes de 09:00am a 05:00pm </span>
        <span>Al solicitar su retiro usted esta aceptando los términos y condiciones</span>
        <button class="btn withdrawal__btn_pay" on:click={cashout} disabled={processing}>{processing ? "PROCESANDO..." : "SOLICITAR RETIRO"}</button>
      </div>
    </div>
  </div>
</div>

<style>
  input:focus-visible {
    outline: 0;
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

  
  .gb-process {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    font-size: 0.8rem;
  }

  @media only screen and (max-width: 1200px) {
    
   
  }
</style>
