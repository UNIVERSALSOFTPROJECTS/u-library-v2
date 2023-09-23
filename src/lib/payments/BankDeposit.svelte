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
  bankDeposit.reference = "";
  bankDeposit.amount = "";
  bankDeposit.account = "";
  bankDeposit.targetBankId;

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
    bankDeposit;
    promise = listBankAccounts();
    //bankDeposit.date = moment().format("YYYY-MM-DD");
    bankDeposit.date = moment().format("YYYY-MM-DD");

  });

  const listBankAccounts = async () => {
    try {
      let { data } = await ServerConnection.u_wallet.listBankAccounts(
        user.token
      );
      console.log(data.list);
      bankAccounts = data.list.filter((e) => e.type == "BANK");
      appPaymethods = data.list.filter((e) => e.type == "CASH");
    } catch (error) {
      console.error(error);
      //notify = util.getNotify("error","Error al conseguir metodos de pago")
      notify.error("Error al conseguir metodos de pago");
     
    }
  };

  const deposit = async () => {
    if(!bankDeposit.targetBankAccountId) return notify.error("Banco Obligatorio");
    console.log("error");
    //if(!bankDeposit.amount) return notify =await util.showNotify("error","Monto Obligatorio");
    //if(!bankDeposit.reference) return notify =await util.showNotify("error","Codigo Obligatorio");
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

<div class="modal deposit">
  <div class="deposit-body">
    <div class="deposit__header">
      <button class="deposit__btn-direct">Transferencias Directas</button>
      <button disabled class="deposit__btn-direct {active_type_method=='TB'?'u-type-method':''}" on:click={()=>{  active_type_method="TB"}}>Pasarelas</button>
    </div>
    <div class="deposit__iframe">
      <div class="deposit__iframe__body">
        <p> Envianos los datos del deposito bancario que realizaste para confirmarlo e ingresar el dinero del deposito a tu cuenta.</p>
        <table>
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
                <tr  style={bankDeposit.targetBankAccountId == account.bankId ? "background:#ccc" : ""}>
                  <td> 
                    <button  on:click={() => { bankDeposit.targetBankAccountId = account.bankId; }} >
                    <div class="u-pay-pay"> <span>{account.bank}</span>  </div>
                    </button>
                  </td>
                  <td style="text-align: center;">
                    {account.number}
                  </td>
                  <td>{account.currency}</td>
                  <td style="text-align: center;">
                    {account.amountMin}
                  </td>
                  <td style="text-align: center;">
                    {account.amountMax}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        <div class="deposit_data">
          <h4 class="gb-title-data-deposit">REGISTRO DE DATOS</h4>
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
  <button class="deposit__btn-close" on:click={closeModal}>X</button>
</div>

<style>
  @media only screen and (max-width: 1200px) {
   
    
    
    
    .u-button-pay {
      background: #dead1a;
      border: none;
      height: 2rem;
      width: 90%;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }
    
    
    .u-pay-pay {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.2rem;
    }
    .u-form-data {
      display: grid;
      grid-template-columns: 47% 47%;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 0.5rem;
    }
    .u-sub-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 0.5rem;
      height: 100%;
    }
    
    .u-content-data {
      width: 95%;
      height: 1.5rem;
      border-radius: 0.5rem;
      border: 1px solid #000;
      padding: 0.2rem;
      padding-left: 0.5rem;
      font-size: 1rem;
    }
    input:focus-visible {
      outline: 0;
    }
    
  }
  @media only screen and (min-width: 1200px) {
    
    .gb-title-data-deposit {
      padding-left: 1.5rem;
    }
    
    .u-main-payments {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-around;
      gap: 0.5rem;
      height: 100%;
    }
    .u-close {
      background: #bd992a;
      color: black;
      width: 40px;
      height: 44px;
      font-size: 28px;
      font-weight: 800;
      border-radius: 0.5rem;
      cursor: pointer;
    }
    .u-wrapp-body {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;
      background: white;
      padding-bottom: 2rem;
      width: 100%;
    }
    .u-headboard {
      width: 100%;
      background-color: #bd992a;
      height: 2rem;
    }
    .type-method {
      background-color: transparent;
      border: none;
      height: 100%;
    }
    .u-wrapp-payments {
      color: black;
      height: 100%;
      border-radius: 0.5rem;
      width: 100%;
    }
    
    .u-form-data {
      display: grid;
      grid-template-columns: 47% 47%;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 0.5rem;
    }
    .u-sub-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 0.5rem;
      height: 100%;
    }
    .u-content-data {
      width: 95%;
      height: 1.5rem;
      border-radius: 0.5rem;
      border: 1px solid #000;
      padding: 0.2rem;
      padding-left: 0.5rem;
      font-size: 1rem;
    }
    input:focus-visible {
      outline: 0;
    }
    
    .u-button-pay {
      background: #dead1a;
      border: none;
      height: 2rem;
      width: 95%;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }
    .loading{
      width: 100%;
      height: 100%;
    }
  }
</style>
