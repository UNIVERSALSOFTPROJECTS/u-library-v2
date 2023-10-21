<script>
  import ServerConnection from "../../js/server";
  import EventManager from "../../js/EventManager";
  import notify from "../../js/notify";
  import { onMount } from "svelte";
  //de esta forma para funcionar en Jest
  import momentx from "moment";
  import Loading from "../Loading.svelte";
  let moment;
  if (!momentx) moment = require("moment");
  else moment = momentx;

  export let open;
  export let user;
  export let onOk;
  export let onError;
  let bankDeposit = {};

  let bankAccounts = [];
  let appPaymethods = [];
  let promise;
  
  let active_type_method;

  const closeModal = () => {
    console.log("cerrando");
    open = false;
  };

  onMount(async () => {
    notify.setEM(EventManager);
    promise = listBankAccounts();
    bankDeposit.date = moment().format("YYYY-MM-DD");

  });

  const listBankAccounts = async () => {
    try {
      let { data } = await ServerConnection.u_wallet.listBankAccounts(user.token);
      console.log(data.list);
      bankAccounts = data.list.filter((e) => e.type == "BANK");
      appPaymethods = data.list.filter((e) => e.type == "CASH");
    } catch (error) {
      console.error(error);
      notify.error("Error al conseguir metodos de pago");
    }
  };

  const checkOperationCode = async () => {
      let { data } = await ServerConnection.u_wallet.checkOperationCode(
        user.token,
        bankDeposit.reference
      );
      console.log("data de code: ",data);
      if (data.duplicate) return notify.error("El codigo se repite");
  }

  const deposit = async () => {
    if(!bankDeposit.targetBankAccountId) return notify.error("Banco Obligatorio");
    if(!bankDeposit.amount) return notify.error("Monto Obligatorio");
    if(!bankDeposit.reference) return notify.error("Codigo Obligatorio");
    //let amount_ = Number(bankDeposit.amount);
    try {
      bankDeposit.playerId = user.playerId;
      bankDeposit.currency = user.currency;
      let { data } = await ServerConnection.u_wallet.bankDeposit(
        user.token,
        bankDeposit
      );
      closeModal();
      onOk(data);
      notify.success("Procesado");
    } catch (error) {
      console.log("error: ", error);
      onError(error);
    }
  };
</script>

  <div class="deposit-body">
    <div class="deposit__header">
      <div>
        <button class="deposit__btn-direct">Transferencias Directas</button>
        <button disabled class="deposit__btn-direct {active_type_method=='TB'?'u-type-method':''}" on:click={()=>{  active_type_method="TB"}}>Pasarelas</button>
      </div>
      <button class="btn close" on:click={closeModal} ></button>
    </div>
    <div class="deposit__iframe">
      <div class="deposit__iframe__body">
        <p> Envianos los datos del deposito bancario que realizaste para confirmarlo e ingresar el dinero del deposito a tu cuenta.</p>
        <table >
          <thead>
            <tr>
              <th>BANCO</th>
              <th>CUENTA</th>
              <th>MONEDA</th>
              <th>MIN</th>
              <th>MAX</th>
            </tr>
            </thead>
            {#await promise}
              <tbody>
                <tr>
                  <td colspan="5" style="position:relative"><Loading loading /></td>
                </tr >
              </tbody>
            {/await}
            <tbody>
              {#each bankAccounts as account}
                <tr  style={bankDeposit.targetBankAccountId == account.bankAccountId ? "background:#ccc" : ""}>
                  <td> 
                    <button class="btn deposit__iframe__body--btn" on:click={()=>{bankDeposit.targetBankAccountId = account.bankAccountId;}}>{account.bank}</button>
                  </td>
                  <td style="text-align: center;"> {account.number} </td>
                  <td style="text-align: center;">{account.currency}</td>
                  <td style="text-align: center;"> {account.amountMin} </td>
                  <td style="text-align: center;"> {account.amountMax} </td>
                </tr>
              {/each}
            </tbody>
          </table>
        <div class="deposit_data">
          <span class="gb-title-data-deposit"><b>REGISTRO DE DATOS</b></span>
          <div class="deposit_data__info">
            <div >
              <span>Fecha Transferencia</span>
              <input
                class="ipt info"
                type="date"
                bind:value={bankDeposit.date}
              />
            </div>
            <div >
              <span>Cod.Operacion</span>
              <input
                class="ipt info"
                aria-label="refNumber"
                type="text"
                bind:value={bankDeposit.reference}
                on:blur={checkOperationCode}
              />
            </div>
            <div >
              <span>Monto</span>
              <input
                class="ipt info"
                type="number"
                bind:value={bankDeposit.amount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="deposit__btn">
      <button class="deposit__btn_pay" on:click={deposit}>DEPOSITAR</button>
    </div>
  </div>

<style>
  input:focus-visible {
      outline: 0;
    }
  @media only screen and (max-width: 1199px) {    
    
    
    
  }
  @media only screen and (min-width: 1200px) {
    
    .gb-title-data-deposit {
      padding-left: 1.5rem;
    }
  }
</style>
