<script>
// @ts-nocheck
  import EventManager from "../../js/EventManager";
  import BalanceDesktop from "../profile/BalanceDesktop.svelte";
  import MyDataDesktop from "../profile/MyDataDesktop.svelte";
  import RecordDesktop from "../profile/History.svelte";
  import SecurityDesktop from "../profile/SecurityDesktop.svelte";

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

  <div class="u-main-content">
    <div class="u-menu-profile-user">
        <div class="u-icon-user">
          <div class="">
            <img class="usericon1 s-pLY60ePxNKjT" src="https://d2zzz5z45zl95g.cloudfront.net/latinosport21/usericon1.png" alt="">
          </div>
          <span>Mi Cuenta</span>
        </div>
         <div class="u-sub-menu">
          <div class="u-label" style="display:flex;">
            {user.username} #{user.serial}
            {#if icon}
              <button  title="Copiar Código" class="u-copyCode" on:click={copyCodeWhitdrawallUserId}>
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
         </div>
         <div class="u-sub-menu">
          <div class="u-balance">
            <span>Saldo</span>
            <div class="u-label">{user.currency} {user.balance}</div>
          </div>
          <div class="u-balance">
            <span>Saldo Bono</span>
            <span>{user.currency} {user.bonus_cab}</span>
          </div>
          <div class="u-button-transfer">
            <button class="u-withdrawal u-button"  on:click={onShowWithdrawalBank}>
              <span>Retiro por Banco</span>
            </button>
            <button class="u-deposit u-button"  on:click={onOpenDepositBank}>
              <span> Depósito por Banco</span>
            </button>
          </div>
          <div class="u-button-transfer">
            <button class="u-withdrawal u-button"  on:click={onShowWithdrawalCashier}>
              <span>Retiro Efectivo</span>
            </button>
            <button class="u-deposit u-button"  on:click={onOpenDepositCashier}>
              <span> Depósito Efectivo</span>
            </button>
          </div>
        </div>
         <div class="u-sub-menu">
          <button class="u-button-sub-menu  {active_option=='MyProfile'?'u-opt-select':''}" on:click={()=>{ active_option="MyProfile" }}>Mi Perfil</button>
         </div>
         <div class="u-sub-menu">
          <button class="u-button-sub-menu {active_option=='MyRecord'?'u-opt-select':''}"  on:click={()=>{ active_option="MyRecord" }}>Historial</button>
         </div>
         <!--div class="u-sub-menu">
          <button class="u-button-sub-menu {active_option=='Promotions'?'u-opt-select':''}"  on:click={()=>{ active_option="Promotions" }}>Bonos y Promociones</button>
         </div-->
    </div>
    <div class="u-menu-principal-opc">
        <div class="u-heard">
          <span>DASHBOARD</span>
          <button on:click={closeModal}>X</button>
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
                <BalanceDesktop bind:user {onOpenDepositBank}/>
              {/if}
              {#if active_section =="MyData"}               
                <MyDataDesktop bind:user onSubmitted={(status, error) => onSaveProfile(status, error)}
                />
              {/if}
              {#if active_section =="Security"}
                <SecurityDesktop bind:user onSubmitted={(status, error) => onChangePassword(status, error)}
                />
              {/if}
              <!--
              {#if active_section =="Verification"}   
                <VerificationDesktop bind:user/>
              {/if}
              -->
            </div>
          </div>
        </div>
        {/if}
        {#if active_option=="MyRecord" }
        <div class="u-options My-acount">
          <div class="u-content-info">
            <RecordDesktop bind:user></RecordDesktop>
          </div>
        </div>
        {/if}
        <!--
        {#if active_option=="Promotions" }
        <div class="u-options My-acount">
          <div class="u-content-info">
           <PromotionsDesktop></PromotionsDesktop>
          </div>
        </div>
        {/if}
        -->
    </div>
  </div>



<style>
  .u-main-content{
    display: grid;
    grid-template-columns: 30% 70%;
    width: 100%;
  }
  .u-menu-profile-user{
    background: #181824;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .u-opt-select{
    background-color: #a2a2a2;
  }
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
  .u-button-sub-menu{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: white;
    font-size: 14px;
  }
  
  
  
  .u-icon-user{
    padding-top: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
  }
  
  .u-sub-menu{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: #262633;
    width: 85%;
    padding: 0.5rem;
  }
  .u-balance{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #ff6200;
    padding: 0.5rem;
    border-radius: 0.3rem;
  }
  .u-button-transfer{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 0.5rem;
  }
  .u-button{
    color: white;
    width: 7rem;
    padding: 0.4rem;
    font-size: 16px;
    border-radius: 0.3rem;
    border: none;
    cursor: pointer;
  }
  .u-withdrawal{
    background-color: #67666B;
  }
  .u-deposit{
     background-color: #5ba968;
  }
  .u-menu-principal-opc{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: white;
    color: black;
    border-radius: 0 1rem 1rem 0;
    height:100%;
    width:100%;
  }
  .u-menu-principal-opc::-webkit-scrollbar{
    height: 25px;
    border-radius: 0 1rem 1rem 0;
    background: rgb(193, 187, 187);   
    width: 20px;
  }
  .u-heard{
    padding: 1rem;
  }
  .u-options{
    display: flex;
    flex-direction: column;
    background: #e6edee;
    width: 100%;
    height: 100vh;
    font-size: 16px;
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
  .u-opc-select{
    background-color: rgb(146, 175, 178);
  }
</style>
