<script>
  // @ts-nocheck
  import backend from "../../js/server";
  import EventManager from "../../js/EventManager";
  import BalanceDesktop from "./Balance.svelte";
  import Security from "./Security.svelte";
  import History from "../profileU/History.svelte";
  import { DepositBank } from "../..";
  import ConfirmCashIn from "../payments/ConfirmCashIn.svelte";
  import Modal from "../Modal.svelte";
  import WithdrawalBank from "../withdrawal/WithdrawalBank.svelte";
  import CashOut from "../withdrawal/CashOut.svelte";
  import notify from "../../js/notify";
  import MyData from "./MyData.svelte";
  import Balance from "./Balance.svelte";
  import { onMount } from "svelte";

  export let user;
  export let open;
  export let modalOpened;
  export let onLogout;
  export let showModalProfile;
  export let limitAmount;
  
  const logout = () => {
    //FALTA ir a Bancked a destruir session
    onLogout();
  };

  let modalShowWithdrawalBank = false;
  let modalCashOut = false;
  let modalShowDepositBank = false;
  let modalShowConfirmDeposit = false;
  let icon = true;
  let active_section = "balance";
  let active_option = "MyProfile";
  let url_global = "https://assets.apiusoft.com";

  onMount(()=>{
    console.log("usuario", user);
  })
  

  const closeModal = () => {
    open = false;
  };

  const onSaveProfile = (status, error) => {
    if (status == "ok") {
      EventManager.publish("notify", {
        mode: "success",
        msg: "Cambios guardados correctamente",
      });
    } else {
      EventManager.publish("notify", {
        mode: "error",
        msg: "Error al guardar",
      });
    }
  };

  const onChangePassword = (status, error) => {
    if (status == "ok") {
      EventManager.publish("notify", {
        mode: "success",
        msg: "Cambios guardados correctamente",
      });
    } else {
      EventManager.publish("notify", {
        mode: "error",
        msg: "Error al guardar",
      });
    }
  };

  const copyCodeWhitdrawallUserId = () => {
    icon = false;
    setTimeout(() => {
      icon = true; // Cambiar al primer icono después de 2 segundos
    }, 2000);
    const copyUser = "Usuario: " + user.username + ", ";
    const copyId = "Id: " + user.id;

    const finalMessage = copyUser + copyId;
    navigator.clipboard.writeText(finalMessage);
  };

  const showWithdrawalBank = async () => {
    try {
      modalShowWithdrawalBank = true;
      showModalProfile = false;
    } catch (error) {
      console.log(error);
      notify.error("Error");
    }
  };
  const showCashOut = async () => {
    try {
      console.log("entro a funcion abrir modal");
      modalCashOut = true;
    } catch (error) {
      console.log(error);
      notify.error("Error al consultar retiro previo");
    }
  };

  const showDepositBank = () => {
    modalShowDepositBank = true;
    modalOpened = "deposit";
    showModalProfile = false;
    setTimeout(() => {
      document.body.removeAttribute("style");
    }, 100);
  };

  const showDepositCashier = () => {
    modalShowConfirmDeposit = true;
    modalOpened = "deposit";
    showModalProfile = false;
    setTimeout(() => {
      document.body.removeAttribute("style");
    }, 100);
  };

  const onDepositError = async (error) => {
    notify.error(error);
  };
  
  const onDepositOk = async (data) => {
    depositModalOpen = false;
    notify.success(data);
  };
</script>

<div class="profile content">
  <div class="profile personaldata">
    <div class="profile personaldata__user">
      <img class="usericon1" src="{url_global}/latinosport21/usericon1.png" alt="icon_user"/>
      <span>Mi Cuenta</span>
      <button on:click={closeModal} class="in-mobile" style="color: white;">X</button>
    </div>
    <div class="profile personaldata__userdata">
      {user.username} #{user.serial}
      {#if icon}
        <button on:click={copyCodeWhitdrawallUserId} class="profile personaldata__copycode" title="Copiar Código" >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M10 8V7C10 6.05719 10 5.58579 10.2929 5.29289C10.5858 5 11.0572 5 12 5H17C17.9428 5 18.4142 5 18.7071 5.29289C19 5.58579 19 6.05719 19 7V12C19 12.9428 19 13.4142 18.7071 13.7071C18.4142 14 17.9428 14 17 14H16M7 19H12C12.9428 19 13.4142 19 13.7071 18.7071C14 18.4142 14 17.9428 14 17V12C14 11.0572 14 10.5858 13.7071 10.2929C13.4142 10 12.9428 10 12 10H7C6.05719 10 5.58579 10 5.29289 10.2929C5 10.5858 5 11.0572 5 12V17C5 17.9428 5 18.4142 5.29289 18.7071C5.58579 19 6.05719 19 7 19Z" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      {:else}
        <button style="color:#fff; background: #4f4f5f;">
          <svg style="color:#fff;" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" >
            <g id="Interface / Check">
              <path id="Vector" d="M6 12L10.2426 16.2426L18.727 7.75732" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
          </svg>
          copiado
        </button>
      {/if}
    </div>
    <div class="profile personaldata__userbalance">
      <div class="u-balance">
        <span>Saldo</span>
        <div class="u-label">{user.currency} {user.balance}</div>
      </div>
      {#if user.bonus && user.bonus.length >0}
        {#each user.bonus as bono}
          {#if bono.amount > 0}
            <div class="u-balance">
              <span>Bono {bono.name}</span>
              <div class="u-label">{bono.currencyISO} {bono.amount}</div>
            </div>
          {/if}
        {/each}
      {/if}
      <div class="profile personaldata balance">
        <button
          on:click={showWithdrawalBank}
          class="profile btn btn_withdrawal"
          title="Solicitar Retiro a mi banco.">
          Retiro a Banco
        </button>
        <button
          on:click={showDepositBank}
          class="profile btn btn_deposit"
          title="Depositar a una cuenta de banco.">
          Depósito a Banco
        </button>
        <button
          on:click={showCashOut}
          class="profile btn btn_withdrawal"
          title="Solicitar un retiro en efectivo.">Retiro Efectivo</button>
        <button
          class="profile btn btn_deposit"
          title="Confirmar y activar un deposito en efectivo."
          on:click={showDepositCashier}>
          Confirmar Recarga
        </button>
      </div>
    </div>
    <div class="profile personaldata options">
      <button on:click={()=>{active_option="MyProfile"}} class=" profile personaldata options__useroptions {active_option == 'MyProfile' ? ' u-opt-select' : ''}">Mi Perfil</button>
      <button on:click={()=>{active_option="MyRecord"}} class="profile personaldata options__useroptions {active_option == 'MyRecord'?'u-opt-select':''}">Historial</button >
      <button on:click={logout} class="profile personaldata options__useroptions">Cerrar Sesión</button>
    </div>
  </div>
  <div class="profile viewinformation">
    <div class="profile viewinformation_header">
      <span>DASHBOARD</span>
      <button class="btn close in-desktop" on:click={closeModal} />
    </div>
    {#if active_option == "MyProfile"}
      <div class="u-options My-acount">
        <div class="u-buttons-options">
          <button class="opc {active_section == 'balance' ? 'u-opc-select' : ''}" on:click={() => {active_section = "balance";}}>
            <span>Saldo</span>
          </button>
          <button class="opc {active_section == 'MyData' ? 'u-opc-select' : ''}"  on:click={() => { active_section = "MyData"; }} >
            <span>Mis Datos</span>
          </button>
          <button
            class="opc {active_section == 'Security' ? 'u-opc-select' : ''}"
            on:click={() => {
              active_section = "Security";
            }}
          >
            <span>Seguridad</span>
          </button>
          <!--button class="opc {active_section=='Verification'?'u-opc-select':''}" on:click={()=>{ active_section="Verification" }}>
              <span>Verificación</span>
            </button-->
        </div>
        <div class="profile information--data">
            {#if active_section == "balance"}
              <Balance bind:user />
            {/if}
            {#if active_section == "MyData"}
              <MyData
                bind:user
                onSubmitted={(status, error) => onSaveProfile(status, error)}
              />
            {/if}
            {#if active_section == "Security"}
              <Security
                bind:user
                onSubmitted={(status, error) => onChangePassword(status, error)}
              />
            {/if}
        </div>
      </div>
    {/if}
    {#if active_option == "MyRecord"}
      <div class="u-options My-acount">
        <History bind:user />
      </div>
    {/if}
  </div>
</div>

<Modal bind:open={modalShowDepositBank} bind:modalOpened showHeader={false}>
  <DepositBank
    bind:user
    onOk={onDepositOk}
    onError={onDepositError}
    bind:open={modalShowDepositBank}
  />
</Modal>
<Modal bind:open={modalShowConfirmDeposit} bind:modalOpened showHeader={false}>
  <ConfirmCashIn
    bind:user
    onError={onDepositError}
    bind:open={modalShowConfirmDeposit}
  />
</Modal>

<Modal bind:open={modalShowWithdrawalBank} showHeader={false}>
  <WithdrawalBank bind:limitAmount bind:user bind:open={modalShowWithdrawalBank} />
</Modal>

<Modal bind:open={modalCashOut} showHeader={false}>
  <CashOut bind:user bind:open={modalCashOut}  />
</Modal>

<style>
  .usericon1 {
    width: 1.5rem;
    border-radius: 0.25rem;
  }
  button {
    cursor: pointer;
    text-decoration: none;
    background-color: #262633;
    border: none;
  }

  .u-balance {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #423b62;
    padding: 0.5rem;
    border-radius: 0.3rem;
  }

  .u-buttons-options {
    display: flex;
    font-size: 16px;
    padding: 0.5rem;
    gap: 0.5rem;
  }
  .opc {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    width: 8rem;
    padding: 0.5rem;
    background-color: #cfd3d3;
    border-radius: 1rem;
    height: 1.8rem;
  }
  @media only screen and (max-width: 1200px) {
    .in-desktop {
      display: none;
    }
    .my_name {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
  @media only screen and (min-width: 1201px) {
    .in-mobile {
      display: none;
    }
  }
</style>
