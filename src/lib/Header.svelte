<script>
    import { t, locale, locales } from "../js/i18n";
    import Notifier from './Notifier.svelte';
    import Login from './topbar/Login.svelte';
    //import LoginAutosaved from './topbar/LoginAutosaved.svelte';
    import Modal from '../lib/Modal.svelte';
    //import Signup from './modals/SingupXg.svelte';
    import Signup from './modals/Signup.svelte';
    import Deposit from './payments/Deposit.svelte';
    import Profile from "./modals/Profile.svelte";
    //import Withdrawal from './withdrawal/WithdrawalW.svelte';
    import WithdrawalW from './withdrawal/WithdrawalW.svelte';
    
    import ProviderList from "./lists/ProviderList.svelte";

    import Footer from "./Footer.svelte";
    
    import ChatLive from "./modals/ChatLive.svelte";
    import ExpireSession from "./modals/ExpireSession.svelte";
    import Promotions from "./modals/Promotions.svelte";

    import ScreenGames from "./modals/ScreenGames.svelte";

    //import xdddd from "./modals/ProfileUser.Svelte";

    import utils from '../js/util';
    import { onMount } from 'svelte';
    import { ServerConnection } from '..';
    import RecoverPassword from "./topbar/RecoverPassword.svelte";

    import { getUpdateBalance } from "../js/utils/serverUtils";

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
    let promotionsModalOpen = false;
    let resetpassModalOpen=false;

    let signupModalOpen = false;
    let depositModalOpen = false;
    let withdrawalModalOpen = false;
    let expireSessionModalOpen = false; 
    let profileModalOpen = false; 

    let modalOpened;
    let subModalOpened;

    let isToggleOn = false;
    //Deposit Modal
    let notify = {};

    let active_view = "home";

    function openTermsConditions() {
        console.log("abriendo openTermsConditions");
    }

    let categoryGames = ["home","slot","slotlive","crash","scratch","sportbook","sportbooklive","horses","virtual","providers"];//sto es adptabale, el footer lo configura por si  componenente
    //let categoryGames = ["home","horses"];//sto es adptabale, el footer lo configura por si  componenente
    //aqui no estoy seguro si debe ir un objeto dentro de este array, o ahcer uno nuevoe juego top e insetarlo dentro de este

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
        typeSignup: "mixed", //codeAgent / selectCurrency /  mixed (codeAgent and codeAgentW = currencies.agent )
        userType: "W",// X / W
        currencies: [ 
            {id: 7, agent:6546},
            //{id: 3, agent:6546},
            //{id: '', agent:''}, // en caso no tenga
        ],
        countries: [
            //{prefix:"+216",flag:"tnz"},
            {prefix:"+56",flag:"chl"},
            {prefix:"+51",flag:"pe"},
        ],
        agentCodeType: "nameAfiliated", //para el codigo agiiado de manera directa
        isCodeAgentSwitch: true, //para el codigo agiiado de manera directa
       // preRegister:false, //por defecto esta comentado, solo descomentar en caso falle el proveedor de sms
    };
    
   
    const configWithdrawal = {
        id_banca: [] ,//disitribidor - almacena otros cajeros
        id_ca: ["6970"],//caja dentro de un distribuidor principal
        dataType : "",
        messageOptional : "",
        formVerification : "https://forms.gle/5rRcbJVgE7n4F6Ro7",
        platform,
        banksNames: [
           { id:"Banco Estado" , name:"Banco Estado" },
           { id:"Banco Falabella" , name:"Banco Falabella" },
           { id:"Banco Santander" , name:"Banco Santander" },
           { id:"Banco de Chile(Edwards Citi)" , name:"Banco de Chile(Edwards Citi)" },
           { id:"Banco BCI" , name:"Banco BCI" },
           { id:"Scotiabank" , name:"Scotiabank" },
           { id:"Banco Itaú" , name:"Banco Itaú" },
           { id:"Coopeuch" , name:"Coopeuch" },
           { id:"Banco Ripley" , name:"Banco Ripley" },
           { id:"Banco BICE" , name:"Banco BICE" },
           { id:"Tenpo" , name:"Tenpo" },
           { id:"Banco Consorcio" , name:"Banco Consorcio" },
           { id:"Banco Internacional" , name:"Banco Internacional" },
           { id:"Mercado Pago" , name:"Mercado Pago" },
           { id:"Prepago Los Héroes" , name:"Prepago Los Héroes" },
           { id:"Superdigital" , name:"Superdigital" },
           { id:"Tapp Caja Los Andes" , name:"Tapp Caja Los Andes" },
        ],
        typeAccount: [
            { id:"Corriente", name:"Corriente" },
            { id:"Vista/Cuenta RUT", name:"Vista/Cuenta RUT" },
            { id:"Ahorros", name:"Ahorros" },
        ], 
        linksChats: [
            {name: "Whatsapp", url:"https://web.whatsapp.com/send?phone=56964783055"}
        ]
    };
    const configFooter = {  
        platform,
        country : {name: "Chile", flag: "chl"},
        isChat: true,
        createdIn: 2024,
        categoryGames,//globalCategoryGames,en 
        //"slot","slotlive","crash","scratch","sportbook","sportbooklive","horses","virtual"
        payments: [
            // "KHIPU","FLOW"
        ],
        social: [ //ASEGURATO DE COLOCAR EL NOMBRE EN MINUSCULA Y EhenL ENLACE CORRECTO!!!
            // {name:"faceb", url:"https://wwwook", url:"https://www.facebook.com/coliseosportoficial"},
            // {name:"instagram.instagram.com/coliseosportoficial"},
            //social: []//si no hay redes sociales
        ],
        email:"",
        bonus:[ 
            {name:"Bono Deportivas"} 
        ],
        linksChats: [ 
            //{name: "Whatsapp", url:"https://web.whatsapp.com/send?phone=56964783055"} 
        ],
        viewLogoUS : true,
    };
    const configPromotions = {
        platform,
        bonus:[
            {name:"spoortbook"}
        ],
    };
    const configProfile = {
        id_banca: [] ,//disitribidor - almacena otros cajeros
        id_ca: ["6970"],//caja dentro de un distribuidor principal
        doctype:["RUT","DNI","Pasaporte"],
        timezone:'America/Santiago',//for movementes
        activePromotions: false,
    };
    //DEPOSIT
    const configDeposit = {
        id_banca: [] ,//disitribidor - almacena otros cajeros
        id_ca: ["6970"],//caja dentro de un distribuidor principal
    }
    //  const configWithdrawal = {
    //     dataType : "",
    //     messageOptional : "",
    //     banksNames: [],
    //     typeAccount: [],
    //     linksChats: [],
    // };
    //RETIRO

    let screenGamesOpen = false;

    let chatLiveUrl = "https://tawk.to/chat/65845e7d70c9f2407f824709/1hi6h274h";
    let chatLiveModalOpen = false;
    const openChatLive = () =>{ chatLiveModalOpen = true; subModalOpened = "chatLive" }
    // fin de registro m
    //IDIOMAR!!!
    $locale = "es";//Actualmente solo "es" y "fr"


    const onOpenRecoverPassword = () => { 
        loginModalOpen = false;
        resetpassModalOpen=true;
        modalOpened = "recoverPassword";
    }

    const onOpenGame = () => { 
        !sessionStorage.getItem("user") ? onOpenLogin() : screenGamesOpen = true;
        //screenGamesOpen = true;
    }

    const onOpenLogin = () => { loginModalOpen = true;  modalOpened = "login"; signupModalOpen = false; } 
    const onOpenSignup = () => { signupModalOpen = true; modalOpened = "signup"; loginModalOpen = false; }

    const onOpenExpireSession = () => { expireSessionModalOpen = true; subModalOpened = "expireSession"; chatLiveModalOpen = false; }

    const onOpenDeposit = () => { 
        profileModalOpen = false; 
        setTimeout(() => {
            depositModalOpen = true; 
            modalOpened = "deposit";  
        }, 0);
    }
    const onOpenWithdrawal = () => { 
        profileModalOpen = false; 
        setTimeout(() => {
            withdrawalModalOpen = true; 
            modalOpened = "withdrawal"; 
        }, 0);
    }
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
    const onProfileOk = async (data)=>{
        notify = await utils.showNotify("success",data);
    }
    const onRecoverPasswordError = async (error)=>{
        notify = {};
        notify = await utils.showNotify("error",error);
    }
    const onProfileError = async (error)=>{
        notify = {};
        notify = await utils.showNotify("error",error);
        if (error == $t("msg.duplicatedSession")){
            onLogout();
            profileModalOpen = false;
        }
    }


    onMount(()=>{
        let currentUrl = window.location.href;
        console.log("domain",currentUrl);
        if(/resetPassword/.test(currentUrl)) {
            resetpassModalOpen=true;
            modalOpened = "resetPassword";
        }else if (/afiliado/.test(currentUrl)) {//afiliadocolisosport
            onOpenSignup();
        }
        if (sessionStorage.getItem("user")) {
            user = JSON.parse(sessionStorage.getItem("user"));
            activeSession = true;
            updateTimeSession();
        }
    }); 



    const updateTimeSession = async() =>{
        expireSessionModalOpen = false;
        let user = JSON.parse(sessionStorage.getItem("user"))
        let oldBalance = user.balance;
        setTimeout( async() => {
            await getUpdateBalance(user);
            let newBalance = JSON.parse(sessionStorage.getItem("user")).balance;
            oldBalance == newBalance ? onOpenExpireSession() : updateTimeSession();
        }, 1800000);
    }

console.log("active_view",active_view);
    const onCategoryChange = (category) => {
        if (category == "horses") return onOpenLogin();
        active_view = category;
    }
    const onOpenPromotions = () => {
        promotionsModalOpen = true;
        modalOpened = "promotions";
    }
    const onOpenProfile = () => {
        profileModalOpen = true;
        modalOpened = "profile";
    }

    const onLogout = () => {
        activeSession = false;
        sessionStorage.removeItem("user");
        location.reload();
        //ServerConnector.disconnect();
    }
    let url_game = "";
    
    function updateBalance() {
        console.log("actualizando balance :v");
    }
    //FALTA EL CHECKUSELLOGUES, VER COMO SE IMPLEMENTARA AQUI ESO
    // function noTouch(e) {
    //     e.preventDefault();
    // }
    const topProviders = ["EVOLUTION","Habanero","Pragmatic Play","SPRIBE","Endorphina"];

    function onOpenProviders(name) {
        console.log(name);
    }

    if (window.matchMedia('(pointer: coarse)').matches) {//solo para evitar que en movile se pueda descargar imagenes , es un test de pruba
        
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault(); // Evita que se muestre el menú contextual
        });
    }
</script>

<!-- on:contextmenu="{noTouch}" on:mousedown="{noTouch}" role="button" tabindex="0" -->
<div class="{platform}">
    <header class="header {activeSession?'logued':''}">
        <button class="btn header__menu {isToggleOn?'is-open':''}" on:click={toggleMenuBar}><span></span></button>
        <picture>
            <source media="(max-width: 1023px)" srcset="{assetsUrl}/{platform}/logo_mb.png">
            <img class="header__logo" src="{assetsUrl}/{platform}/logo.png" alt="{platform}-logo" loading="eager">
        </picture>
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
    <div class="category">
       <!-- los slot y depooooooooooooooooopueden cambiar de posisiocn como en el footer   si la longitud es 1 o 2 tiene un grid de 5 rem o mas
        JO tambien quitariamos el menubar de caballos y sportbook es incencesario y ocupa mucho espacio :/
    -->
        {#each categoryGames as category}
            <button class="btn category__game {active_view == category?'active':''}" on:click={()=>onCategoryChange(`${category}`)}>
                <i class="icon--{category}"></i>
                <b>{$t(`categoryGame.${category}`)}</b>
            </button>
        {/each}
    </div>

    <button class="btn signup" on:click={onOpenPromotions}>Promociones</button>
    <button class="btn signup" on:click={onOpenWithdrawal}>RetiroX</button>
    <button class="btn signup" on:click={onOpenGame}>ABRIR JUEGO</button>
    <button class="btn signup" on:click={onOpenProfile}>Abrir prefil</button>

    <Modal bind:open={loginModalOpen} bind:modalOpened >
        <Login onOk={onLoginOk} onError={onLoginError} {assetsUrl} {onOpenRecoverPassword} {onOpenSignup} bind:platform t={$t}/>
    </Modal>

    <Modal bind:open={resetpassModalOpen} bind:modalOpened title={$t("recoverPassword.title")} >
        <RecoverPassword onOk={onRecoverPasswordOk} onError={onRecoverPasswordError} bind:open={resetpassModalOpen} t={$t}/>
    </Modal>                                                                          

    <Modal bind:open={signupModalOpen} bind:modalOpened title={$t("signup.title")}>
        <Signup {configSignup} onOk={onSignupOk} onError={onSignupError} {onOpenLogin} t={$t}/>
    </Modal>
    <Modal bind:open={depositModalOpen} bind:modalOpened title="Depósito">
        <Deposit {configDeposit} bind:user bind:amountsFav onOk={onDepositOk} onError={onDepositError} />
    </Modal>
    <Modal bind:open={withdrawalModalOpen} bind:modalOpened title={$t("withdrawal.title")}>
        <!--
            OJO el configWithdrawal es solo para retiro W {configWithdrawal}
        -->
        <WithdrawalW {configWithdrawal}  bind:user {openChatLive} onOk={onWithdrawalOk} onError={onWithdrawalError} t={$t}/>
    </Modal>

    <Modal bind:open={promotionsModalOpen} bind:modalOpened title="Promociones">
        <Promotions {configPromotions} />
    </Modal>

    <Modal bind:open={profileModalOpen} bind:modalOpened title="Mi cuenta">
        <Profile {configProfile} {onOpenWithdrawal} {onLogout} {onOpenDeposit} onError={onProfileError} onOk={onProfileOk} bind:user t={$t}/>
    </Modal>

    <Modal bind:open={chatLiveModalOpen} bind:subModalOpened title="Chat en vivo">
        <ChatLive bind:chatLiveUrl/>
    </Modal>

    <ProviderList {onOpenProviders} {topProviders} t={$t}/>

    {#if user}
        <ScreenGames bind:open={screenGamesOpen} bind:platform bind:url_game {updateBalance}/>
    {/if}

    <Footer {configFooter} {onCategoryChange} {openChatLive} t={$t}/>
    
    
    <Notifier bind:notify/>
</div>
