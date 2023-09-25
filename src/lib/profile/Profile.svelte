<script>
// @ts-nocheck
  import EventManager from "../../js/EventManager";
  import BalanceDesktop from "../profile/BalanceDesktop.svelte";
  import MyDataDesktop from "./MyData.svelte";
  import SecurityDesktop from "../profile/SecurityDesktop.svelte";
  import History from "../profile/History.svelte";

  export let user;
  export let open;
  export let onShowWithdrawalBank;
  export let onOpenDepositBank;
  export let onShowWithdrawalCashier;
  export let onOpenDepositCashier;

  let icon = true; 
  let active_section="balance"
  let active_option="MyProfile"

  const closeModal = () => {
    console.log("cerrando modal");
    open = false;
  };

  const onSaveProfile=(status, error)=>{
    if(status=='ok'){
      EventManager.publish("notify", {mode:"success", msg:"Cambios guardados correctamente"});
    }else{
      EventManager.publish("notify", {mode:"error", msg:"Error al guardar"});
    }
  };

  const onChangePassword=(status, error)=>{
    if(status=='ok'){
      EventManager.publish("notify", {mode:"success", msg:"Cambios guardados correctamente"});
    }else{
      EventManager.publish("notify", {mode:"error", msg:"Error al guardar"});
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
    //navigator.clipboard.writeText(pendingWhitdrawall.codigo);
    navigator.clipboard.writeText(finalMessage);
  };

</script>

  <div class="profile content">
    <div class="profile personaldata">
        <div class="profile personaldata__user">
          <img class="usericon1 s-pLY60ePxNKjT" src="https://d2zzz5z45zl95g.cloudfront.net/latinosport21/usericon1.png" alt="">
          <span>Mi Cuenta</span>
        </div>
        <div class="profile personaldata__userdata">
          {user.username} #{user.serial}
          {#if icon}
            <button  title="Copiar Código" class="profile personaldata__copycode" on:click={copyCodeWhitdrawallUserId}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M10 8V7C10 6.05719 10 5.58579 10.2929 5.29289C10.5858 5 11.0572 5 12 5H17C17.9428 5 18.4142 5 18.7071 5.29289C19 5.58579 19 6.05719 19 7V12C19 12.9428 19 13.4142 18.7071 13.7071C18.4142 14 17.9428 14 17 14H16M7 19H12C12.9428 19 13.4142 19 13.7071 18.7071C14 18.4142 14 17.9428 14 17V12C14 11.0572 14 10.5858 13.7071 10.2929C13.4142 10 12.9428 10 12 10H7C6.05719 10 5.58579 10 5.29289 10.2929C5 10.5858 5 11.0572 5 12V17C5 17.9428 5 18.4142 5.29289 18.7071C5.58579 19 6.05719 19 7 19Z" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          {:else}
            <button style="color:#fff;">
              <svg style="color:#fff;" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <g id="Interface / Check">
                <path id="Vector" d="M6 12L10.2426 16.2426L18.727 7.75732" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
          <div class="u-balance">
            <span>Saldo Bono</span>
            <span>{user.currency} {user.bonus_cab}</span>
          </div>
          <div class="profile personaldata balance">
            <button class="profile personaldata balance btn_withdrawal" title="Solicitar Retiro a mi banco." on:click={onShowWithdrawalBank}>
              <span>Retiro a Banco</span>
            </button>
            <button class="profile personaldata balance btn_deposit" title="Depositar a una cuenta de banco."  on:click={onOpenDepositBank}>
              <span> Depósito a Banco</span>
            </button>
          </div>
          <div class="profile personaldata balance">
            <button class="profile personaldata balance btn_withdrawal" title="Solicitar un retiro en efectivo." on:click={onShowWithdrawalCashier}>
              <span>Retiro Efectivo</span>
            </button>
            <button class="profile personaldata balance btn_deposit" title="Confirmar y activar un deposito en efectivo." on:click={onOpenDepositCashier}>
              <span> Depósito Efectivo</span>
            </button>
          </div>
        </div>
        <button class="profile personaldata__useroptions  {active_option=='MyProfile'?' u-opt-select':''}" on:click={()=>{ active_option="MyProfile" }}>Mi Perfil</button>
        <button class="profile personaldata__useroptions {active_option=='MyRecord'?' u-opt-select':''}"  on:click={()=>{ active_option="MyRecord" }}>Historial</button>

    </div>
    <div class="profile viewinformation">
        <div class="profile viewinformation_header">
          <span>DASHBOARD</span>
          <button class="btn close" on:click={closeModal}>X</button>
        </div>
        {#if active_option=="MyProfile" }
        <div class="u-options My-acount">
          <div class="u-buttons-options">
            <button class="opc  {active_section=='balance'?'u-opc-select':''}" on:click={()=>{ active_section="balance" }}>
              <span>Saldo</span>
            </button>
            <button class="opc  {active_section=='MyData'?'u-opc-select':''}"  on:click={()=>{ active_section="MyData" }}>
              <span>Mis Datos</span>
            </button>
            <button class="opc  {active_section=='Security'?'u-opc-select':''}"  on:click={()=>{ active_section="Security" }}>
              <span>Seguridad</span>
            </button>
            <!--button class="opc {active_section=='Verification'?'u-opc-select':''}" on:click={()=>{ active_section="Verification" }}>
              <span>Verificación</span>
            </button-->
          </div>
          <div class="u-content-info">
            <div>
              {#if active_section =="balance"}
                <BalanceDesktop bind:user />
              {/if}
              {#if active_section =="MyData"}               
                <MyDataDesktop bind:user onSubmitted={(status, error) => onSaveProfile(status, error)}
                />
              {/if}
              {#if active_section =="Security"}
                <SecurityDesktop bind:user onSubmitted={(status, error) => onChangePassword(status, error)}
                />
              {/if}
            </div>
          </div>
        </div>
        {/if}
        {#if active_option=="MyRecord" }
        <div class="u-options My-acount">
          <History bind:user></History>
        </div>
        {/if}
    </div>
  </div>



<style>

  
  .usericon1{
    width: 1.5rem;
    border-radius: 0.25rem;
  }
  button{
    cursor: pointer;
    text-decoration: none;
    background-color: #262633;
    border: none;
  }
  
  
  
  
  .u-balance{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #423b62;
    padding: 0.5rem;
    border-radius: 0.3rem;
  }
  
  
  .u-buttons-options{
    display: flex;
    font-size: 16px;
    padding: 0.5rem;
    gap: 0.5rem;
  }
  .opc{
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
  
</style>
