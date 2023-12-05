<script>
    import { t, locale, locales } from "../js/i18n";
    import Notifier from './Notifier.svelte';
    import Login from './topbar/Login.svelte';
    //import LoginAutosaved from './topbar/LoginAutosaved.svelte';
    import Modal from '../lib/Modal.svelte';
    //import Signup from './modals/SingupXg.svelte';
    import Signup from './modals/Signup.svelte';
    import Deposit from './payments/Deposit.svelte';
    //import Withdrawal from './withdrawal/WithdrawalW.svelte';
    import WithdrawalW from './withdrawal/WithdrawalW.svelte';
    
    import utils from '../js/util';
    import { onMount } from 'svelte';
    import { ServerConnection } from '..';
    export let user = {};
    export let assetsUrl;
   // export let platform = "Babieca";//usado para storybook
    export let platform;//usado para storybook
    //DEPOSITOS MONTOS FAVORITOS
    export let amountsFav = [5000, 10000, 30000, 50000];
    //export let amountsFav = [50, 100, 300, 500];
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

    function openPrivacyPolicies() {
        console.log("abriendo openPrivacyPolicies");
    }
    function openTermsConditions() {
        console.log("abriendo openTermsConditions");
    }
    //datos de registro M
    //COLLISESPORT
    //let countries  = [ {prefix:"+56",flag:"chl"} ];
    //JETBET24 
    //let countries  = [ {prefix:"+216",flag:"tnz"} ];
    //operatorId BO  = code agent - type W
    //let currencies  = [
    //////  {name:"Peso chileno", code:7 , agent:4675},//este codigo se toma como el id_operado en caso el tipo sea W
    //  {name:"Peso chileno", code:7 , agent:6546}, //aPUESTA DE PANA
    //];
    const configSignup = {
        platform,
        typeSignup: "selectCurrency", //codeAgent / selectCurrency /  mixed (codeAgent and selectCurrency)
        userType: "W",// X / W
        currencies: [ 
            {id: 7, agent:6546},
            //{id: 3, agent:6546},
            //{id: '', agent:''}, // en caso no tenga
        ],
        countries: [
            //{prefix:"+216",flag:"tnz"},
            {prefix:"+56",flag:"chl"},
        ]
    };
    
    const configWithdrawal = {
        dataType : "static",
        banksNames: [
            { id:"0001" , name: "Banco de Chile"},
            { id:"0009" , name: "Banco Internacional"},
            { id:"0012" , name: "Banco Estado"},
            { id:"0014" , name: "Scotiabank Chile"},
            { id:"0016" , name: "Banco de crédito e inversiones (BCI)"},
            { id:"0028" , name: "Banco Bice"},
            { id:"0037" , name: "Banco Santander Chile"},
            { id:"0039" , name: "Itaú Corpbanca"},
            { id:"0049" , name: "Banco Security"},
            { id:"0051" , name: "Banco Falabella"},
            { id:"0053" , name: "Banco Ripley"},
            { id:"0055" , name: "Banco Consorcio"},
            { id:"0504" , name: "Banco Bilbao Vizcaya Argentaria Chile (BBVA)"},
            { id:"0672" , name: "Coopeuch"},
            { id:"729"  , name: "Caja los Andes"},
            { id:"730"  , name: "Tenpo"},
            { id:"732"  , name: "Los Andes"},
            { id:"875"  , name: "Mercado Pago"},
        ],
        typeAccount: [
            { id: 1 , name: "Corriente"},
            { id: 2 , name: "Vista/Cuenta RUT"},
            { id: 3 , name: "Ahorro"},
        ]
    };

    // fin de registro m
    //IDIOMAR!!!
    $locale = "es";//Actualmente solo "es" y "fr"


    const onOpenRecoverPass = () => {}

    const onOpenLogin = () => { loginModalOpen = true;  modalOpened = "login" } 
    const onOpenSignup = () => { signupModalOpen = true; modalOpened = "signup" }
    const onOpenDeposit = () => { depositModalOpen = true; modalOpened = "deposit" }
    const onOpenWithdrawal = () => { withdrawalModalOpen = true; modalOpened = "withdrawal" }
    const toggleMenuBar = () => ( isToggleOn =! isToggleOn )

    const onLoginOk = async (user_)=>{
        user = user_;
        notify = await utils.showNotify("success", $t("msg.sucessLogin",{platform}));
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
            console.log(user);
            notify = await utils.showNotify("success",$t("msg.sucessRegister",{platform}));
            signupModalOpen = false;
            //inicar sesion
            const {data} = await ServerConnection.users.login(user.username,user.password);
			if(data.username=='') throw("USER_NOT_FOUND");
            if(data.claims){
                let date = new Date();
                date.setDate(date.getDate() + 1);
                data.expireToken = data.claims.exp;
                data.playerId = data.id;
                delete data.claims;
            }
			sessionStorage.setItem("user",JSON.stringify(data));
            onLoginOk(data);
        }
    }
    const onSignupError = async (error)=>{
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
    //FALTA EL CHECKUSELLOGUES, VER COMO SE IMPLEMENTARA AQUI ESO
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
            <button class="btn signup" on:click={onOpenSignup}>Registro</button>
        {/if}
        <!-- 
            Notas: on:click|stopPropagation={onOpenLogin}, esto er apara los modale s pero el bug de los dropdow hizo que se descartara momentaneamente
        -->
    </header>

    <button class="btn signup" on:click={onOpenWithdrawal}>RetiroX</button>
   

    <Modal bind:open={loginModalOpen} bind:modalOpened >
        <Login onOk={onLoginOk} onError={onLoginError} {assetsUrl} {onOpenRecoverPass} bind:platform t={$t}/>
    </Modal>
    <Modal bind:open={signupModalOpen} bind:modalOpened title={$t("signup.title")}>
        <Signup {configSignup} {openPrivacyPolicies} onOk={onSignupOk} onError={onSignupError} t={$t}/>
    </Modal>
    <Modal bind:open={depositModalOpen} bind:modalOpened title="Depósito">
        <Deposit bind:user bind:amountsFav onOk={onDepositOk} onError={onDepositError} />
    </Modal>
    <Modal bind:open={withdrawalModalOpen} bind:modalOpened title={$t("withdrawal.title")}>
        <!--
            OJO el configWithdrawal es solo para retiro W
        -->
        <WithdrawalW {configWithdrawal} bind:user {openTermsConditions} onOk={onWithdrawalOk} onError={onWithdrawalError} t={$t}/>
    </Modal>

    <Notifier bind:notify/>
</div>
