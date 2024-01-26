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
    
    import Footer from "./Footer.svelte";
    
    import ChatLive from "./modals/ChatLive.svelte";

    import utils from '../js/util';
    import { onMount } from 'svelte';
    import { ServerConnection } from '..';
    import RecoverPassword from "./topbar/RecoverPassword.svelte";
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
    let resetpassModalOpen=false;

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

    //Update complete Balance and add sessionStorage

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
        typeSignup: "mixed", //codeAgent / selectCurrency /  mixed (codeAgent and selectCurrency)
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
        dataType : "",
        messageOptional : "",
        banksNames: [],
        typeAccount: []
    };
    const configFooter = {  
        platform,
        country : "Chile",
        flag:"chl",
        isChat: true,
        payments: [
            {name: "KHIPU"},
            {name: "FLOW"},
        ],
        social: [ //ASEGURATO DE COLOCAR EL NOMBRE EN MINUSCULA Y EL ENLACE CORRECTO!!!
            {name:"facebook", url:"https://www.facebook.com/coliseosportoficial"},
            {name:"instagram", url:"https://www.instagram.com/coliseosportoficial"},
            //social: []//si no hay redes sociales
        ],
        email:"info@coliseosport.com",
    };

    let chatLiveUrl = "https://tawk.to/chat/65845e7d70c9f2407f824709/1hi6h274h";
    let chatLiveModalOpen = false;

    const openChatLive = () =>{ chatLiveModalOpen = true; modalOpened = "chatLive" }
    // fin de registro m
    //IDIOMAR!!!
    $locale = "es";//Actualmente solo "es" y "fr"


    const onOpenRecoverPassword = () => { 
        loginModalOpen = false;
        resetpassModalOpen=true;
        modalOpened = "recoverPassword";
    }

    const onOpenLogin = () => { loginModalOpen = true;  modalOpened = "login" } 
    const onOpenSignup = () => { signupModalOpen = true; modalOpened = "signup" }
    const onOpenDeposit = () => { depositModalOpen = true; modalOpened = "deposit" }
    const onOpenWithdrawal = () => { withdrawalModalOpen = true; modalOpened = "withdrawal" }
    const toggleMenuBar = () => ( isToggleOn =! isToggleOn )

    //NOTA: SE CREARA UN onOk y un onError generico para aquellos modales que no necesiten motrar info adicional;
    const onLoginOk = async (user_)=>{
        user = user_;
        notify = await utils.showNotify("success", $t("msg.sucessLogin",{platform}));
        loginModalOpen = false;
        activeSession = true;
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
    const onRecoverPasswordOk = async (data)=>{
        notify = await utils.showNotify("success",data);
    }
    const onRecoverPasswordError = async (error)=>{
        notify = {};
        notify = await utils.showNotify("error",error);
    }

    onMount(()=>{
        let currentUrl = window.location.href;
        console.log("domain",currentUrl);
        if(/resetPassword/.test(currentUrl)) {
            resetpassModalOpen=true;
            modalOpened = "resetPassword";
        } 
    });
    const onCategoryChange = (param) => {
        console.log(param);
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
                <p class="header__bono">Bono {user.currency} {user.bonus_sumTotal}</p>
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
        <Login onOk={onLoginOk} onError={onLoginError} {assetsUrl} {onOpenRecoverPassword}  bind:platform t={$t}/>
    </Modal>

    <Modal bind:open={resetpassModalOpen} bind:modalOpened title={$t("recoverPassword.title")} >
        <RecoverPassword onOk={onRecoverPasswordOk} onError={onRecoverPasswordError} bind:open={resetpassModalOpen} t={$t}/>
    </Modal>                                                                          

    <Modal bind:open={signupModalOpen} bind:modalOpened title={$t("signup.title")}>
        <Signup {configSignup} {openPrivacyPolicies} onOk={onSignupOk} onError={onSignupError} t={$t}/>
    </Modal>
    <Modal bind:open={depositModalOpen} bind:modalOpened title="Depósito">
        <Deposit bind:user bind:amountsFav onOk={onDepositOk} onError={onDepositError} />
    </Modal>
    <Modal bind:open={withdrawalModalOpen} bind:modalOpened title={$t("withdrawal.title")}>
        <!--
            OJO el configWithdrawal es solo para retiro W {configWithdrawal}
        -->
        <WithdrawalW {configWithdrawal}  bind:user {openTermsConditions} onOk={onWithdrawalOk} onError={onWithdrawalError} t={$t}/>
    </Modal>

    <Footer {configFooter} {onCategoryChange} {openChatLive}/>


    <Modal bind:open={chatLiveModalOpen} bind:modalOpened title="Chat en vivo">
        <ChatLive bind:chatLiveUrl/>
    </Modal>

    <Notifier bind:notify/>
</div>
