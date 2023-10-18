<script>
    import Notifier from './Notifier.svelte';
    import Login from './topbar/Login.svelte';
    //import LoginAutosaved from './topbar/LoginAutosaved.svelte';
    import Modal from '../lib/Modal.svelte';
    import Singup from './modals/SingupXg.svelte';
    import Deposit from './payments/Deposit.svelte';
    //import Withdrawal from './withdrawal/WithdrawalW.svelte';
    import WithdrawalX from './withdrawal/WithdrawalX.svelte';
    
    import utils from '../js/util';
    import { onMount } from 'svelte';
    import { ServerConnection } from '..';
    export let user = {};
    export let assetsUrl;
   // export let platform = "Babieca";//usado para storybook
    export let platform;//usado para storybook
    //DEPOSITOS MONTOS FAVORITOS
    //export let amountsFav = [5000, 10000, 30000, s50000];
    export let amountsFav = [50, 100, 300, 500];
    let activeSession = false;
    //export let ASSETS_GLOBAL;
    let loginModalOpen = false;
    let signupModalOpen = false;
    let depositModalOpen = false;
    let withdrawalModalOpen = false;
    let modalOpened;
    let isToggleOn = false;
    //Deposit Modal
    let notify = {};
    //datos de registro M
    //COLLISESPORT
    //let countries  = [ {prefix:"+56",flag:"chl"} ];
    //JETBET24 
    let countries  = [ {prefix:"+216",flag:"tnz"} ];
    //operatorId BO  = code agent - type W
    //let currencies  = [
    ////  {name:"Peso chileno", code:7 , agent:4675},//este codigo se toma como el id_operado en caso el tipo sea W
    //  {name:"Peso chileno", code:7 , agent:6546}, //aPUESTA DE PANA
    //];
    // fin de registro m

    const onOpenLogin = () => { loginModalOpen = true;  modalOpened = "login" } 
    const onOpenSingup = () => { signupModalOpen = true; modalOpened = "singup" }
    const onOpenDeposit = () => { depositModalOpen = true; modalOpened = "deposit" }
    const onOpenWithdrawal = () => { withdrawalModalOpen = true; modalOpened = "withdrawal" }
    const toggleMenuBar = () => ( isToggleOn =! isToggleOn )

    const onLoginOk = async (user_)=>{
        user = user_;
        notify = await utils.showNotify("success","Bienvenido a "+platform);
        loginModalOpen = false;
        activeSession = true;
        user.bono_global = user_.bonus_cab + user_.bonus_cas + user_.bonus_dep + user_.bonus_general;
    }
    const onLoginError = async (error)=>{
        notify = {};
        notify = await utils.showNotify("error",error);
    }
    const onSignupOk = async (user_)=>{
        if (typeof user_ === 'string') {
            notify = await utils.showNotify("success",user_);//SMS exitoso
        }else{
            user = user_;
            notify = await utils.showNotify("success","Registro exitoso, bienvenido a "+platform);
            signupModalOpen = false;
            //inicar sesion
            const {data} = await ServerConnection.users.login(user.username,user.password);
			if(data.username=='') throw("USER_NOT_FOUND");
			let date = new Date();
      		date.setDate(date.getDate() + 1);
			data.expireToken= date.getTime();
			sessionStorage.setItem("user",JSON.stringify(data));
            onLoginOk(data);
        }
    }
    const onSingupError = async (error)=>{
        notify = {};
        notify = await utils.showNotify("error",error);
    }
    const onDepositError = async (error)=>{
        notify = {};
        notify = await utils.showNotify("error",error);
    }
    const onDepositOk = async (data)=>{
        notify = await utils.showNotify("success",data);
        depositModalOpen = false;
    }
    const onWithdrawalOk = async (data)=>{
        notify = await utils.showNotify("success",data);
        withdrawalModalOpen = false;
    }
    const onWithdrawalError = async (error)=>{
        notify = {};
        notify = await utils.showNotify("error",error);
    }
</script>

<div class="{platform}">
    <header class="header {activeSession?'logued':''}">
        <button class="btn header__menu {isToggleOn?'is-open':''}" on:click={toggleMenuBar}><span></span></button>
        <img class="header__logo" src="{assetsUrl}/{platform}/logo.png" alt="logo-main">
        <div></div>
        {#if activeSession}
            <div class="header__userdata">
                <img src="https://d2zzz5z45zl95g.cloudfront.net/latinosport21/usericon1.png" alt="">
                <div>
                    <div class="header__userid">{user.username} #{user.id}</div>
                    <div class="header__account">Mi cuenta</div>
                </div>
            </div>
            <div class="header__balance">
                <p>{user.currency} {user.balance}</p>
                <p class="header__bono">Bono {user.currency} {user.bono_global}</p>
            </div>
            <button class="btn recharge" on:click={onOpenDeposit}>Recargar</button>
        {:else}
            <button class="btn login" on:click={onOpenLogin}>Acceso</button>
            <button class="btn singup" on:click={onOpenSingup}>Registro</button>
        {/if}
        <!-- 
            Notas: on:click|stopPropagation={onOpenLogin}, esto er apara los modale s pero el bug de los dropdow hizo que se descartara momentaneamente
        -->
    </header>

    <button class="btn singup" on:click={onOpenWithdrawal}>RetiroX</button>
   

    <Modal bind:open={loginModalOpen} bind:modalOpened >
        <Login onOk={onLoginOk} onError={onLoginError} {assetsUrl} bind:platform/>
    </Modal>
    <Modal bind:open={signupModalOpen} bind:modalOpened title="Registrate Aquí">
        <!--Singup bind:platform bind:countries bind:currencies onOk={onSignupOk} onError={onSingupError}/-->
        <Singup bind:platform bind:countries onOk={onSignupOk} onError={onSingupError}/>
    </Modal>
    <Modal bind:open={depositModalOpen} bind:modalOpened title="Depósito">
        <Deposit bind:user bind:amountsFav onOk={onDepositOk} onError={onDepositError}/>
    </Modal>
    <Modal bind:open={withdrawalModalOpen} bind:modalOpened title="Retiro">
        <!--Withdrawal bind:user onOk={onWithdrawalOk} onError={onWithdrawalError}/-->
        <WithdrawalX bind:user onOk={onWithdrawalOk} onError={onWithdrawalError}/>
    </Modal>

    <Notifier bind:notify/>
</div>
