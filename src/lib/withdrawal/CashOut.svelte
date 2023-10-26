<script>
  import ServerConnection from "../../js/server";
  import moment from "moment";
  import EventManager from "../../js/EventManager";
  import notify from "../../js/notify";
  import { onMount } from "svelte";

  export let open;
  export let user;
  
  let pendingWhitdrawall = null;
  let amount = "";
  let processing = false;

  onMount(() => {
    notify.setEM(EventManager);
    getPendingWithdrawal(user.token);
  });

  const closeModal = () => {
    console.log("Cerrando Modal.");
    open = false;
  };

  const getPendingWithdrawal = async (token) => {
    console.log("Checkpending");
      let resp_pending = await ServerConnection.u_wallet.checkPendingCashout(token);
      if (resp_pending.data.pending){
        pendingWhitdrawall = resp_pending.data; 
        console.log("retiro:", pendingWhitdrawall);
      }
  };

  const cashout = async () => {
    pendingWhitdrawall = null;
    try {
      if (!amount) return notify.error("Ingrese monto");
      if (amount > user.balance) return notify.error("Saldo Insuficiente");
      processing = true;
      let resp_withdrawal = null;
      await getPendingWithdrawal(user.token);
      if (!pendingWhitdrawall) {
        resp_withdrawal = await ServerConnection.u_wallet.cashout(user.token, {
          amount,
        });
        await getPendingWithdrawal(user.token);
        withdrawalOk(resp_withdrawal ? resp_withdrawal : pendingWhitdrawall);
      } else {
        withdrawalCashError("PENDING_WITHDRAWAL");
      }
      let { data } = await ServerConnection.u_user.getBalance(
        user.agregatorToken
      );
      user.balance = data.balance;
    } catch (e_withdrawal) {
      console.log("e_withdrawal: ", e_withdrawal);
      withdrawalCashError(e_withdrawal);
    }
    processing = false;
  };

  const isOnlyNumber = (event) => {
    if (!/\d/.test(event.key)) {
      event.preventDefault();
      notify.error("Ingrese solo números");
    }
  };

  const copyCodeWhitdrawall = () => {
    const copyUser = "Usuario: " + user.username + ", ";
    const copyId = "Id: " + user.serial + ", ";
    const copyCode = "Codigo Retiro: " + pendingWhitdrawall.code;
    const finalMessage = copyUser + copyId + copyCode;
    navigator.clipboard.writeText(finalMessage);
  };

  const withdrawalCashError = (e) => {
    notify.error("Error al procesar retiro");
  };

  const withdrawalOk = (data) => {
    notify.success("Retiro procesado");
  };
</script>

<div class="withdrawal-demo modal">
  {#if pendingWhitdrawall}
    <div class="withdrawal-body">
        <div class="withdrawal__header">
          <span class="withdrawal--title">RETIRO PENDIENTE</span>
          <button class="btn close" on:click={closeModal} ></button>
        </div>
        <div class="withdrawal__user">
          <div>Usuario : <span>{user.username}</span></div>
          <div>ID: <span>{user.serial}</span></div>
          <div> Date: <span>{moment(pendingWhitdrawall.date).format("DD/MM/YYYY")}</span></div>
          <div>Temps: <span>{moment(pendingWhitdrawall.date).format("HH:mm:ss")}</span></div>
        </div>
        <div class="withdrawal__info">
          <div class="withdrawal__info--pending">
            <div class="withdrawal__info--pending-code">
              <span>Código:</span>
              <div class="u-section-code">
                <span>{pendingWhitdrawall.code}</span>
                <button
                  title="Copiar Código"
                  class="u-copyCode"
                  on:click={copyCodeWhitdrawall}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-clipboard"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
                    />
                    <path
                      d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="withdrawal__info--pending-code">
              <span>Monto:</span>
              <span>{pendingWhitdrawall.amount.toFixed(2)}</span>
            </div>
          </div>
          <span class="withdrawal__info--data">
            Acercate a nuestras sucursales, para proceder con el retiro.
            <br><b>Nota: </b>No es necesario imprimir este ticket, 
            <br>solo debe identificar su
            usuario junto con el código de referencia.
          </span>
        </div>
    </div>
  {:else}
    <div class="withdrawal-body">
      <div class="withdrawal__header">
        <span class="u-title">RETIRAR SU SALDO</span>
        <button class="btn close" on:click={closeModal}></button>
      </div>
      <div class="u-content-info">
        <span>INGRESE EL MONTO A RETIRAR:</span>
        <input
          aria-label="amount"
          class="u-input-pay"
          inputmode="numeric"
          bind:value={amount}
          type="text"
          on:keypress={isOnlyNumber}
          placeholder="Ingrese el monto a retirar"
        />
      </div>
      <div class="gb-process">
        <span
          >Al solicitar su retiro usted esta aceptando los términos y
          condiciones</span
        >
        <button class="u-button-pay" on:click={cashout} disabled={processing}
          >{processing ? "PROCESANDO..." : "SOLICITAR RETIRO"}</button
        >
      </div>
    </div>
  {/if}
</div>

<style>
    div{
        color: #000;
    }
  /**/
  
  .u-button-pay:disabled {
    background-color: rgb(210, 184, 54);
  }
  
  @media only screen and (max-width: 1200px) {
    /*Retirar Saldo sin saldo pendiente*/
    
    .u-content-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 600;
    }
    input:focus-visible {
      outline: 0;
    }
    .u-input-pay {
      width: 15rem;
      height: 2rem;
      border-radius: 0.5rem;
      border: 1px solid #000;
      padding: 0.2rem;
      padding-left: 0.5rem;
      font-size: 1rem;
      text-align: center;
    }
    .gb-process {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 12px;
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
    .u-section-code {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    .u-copyCode {
      border: none;
      cursor: pointer;
      background-color: transparent;
      border-radius: 0.3rem;
    }
    .u-copyCode:hover {
      background-color: rgb(202, 202, 202);
    }
  }

  @media only screen and (min-width: 1200px) {
    /*Retirar Saldo sin saldo pendiente*/
    
    .u-content-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 600;
    }
    input:focus-visible {
      outline: 0;
    }
    .u-input-pay {
      width: 15rem;
      height: 2rem;
      border-radius: 0.5rem;
      border: 1px solid #000;
      padding: 0.2rem;
      padding-left: 0.5rem;
      font-size: 1rem;
      text-align: center;
    }
    .gb-process {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 12px;
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
    .u-section-code {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    .u-copyCode {
      border: none;
      cursor: pointer;
      background-color: transparent;
      border-radius: 0.3rem;
    }
    .u-copyCode:hover {
      background-color: rgb(202, 202, 202);
    }
  }
</style>
