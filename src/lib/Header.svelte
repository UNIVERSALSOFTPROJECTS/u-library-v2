<script>
    import Notifier from './Notifier.svelte';
    import Login from './modals/Login.svelte';
    import Modal from '../lib/Modal.svelte';
    import Singup from './modals/SingupXg.svelte';
    import Deposit from './payments/Depositv3.svelte';
    import "../styles/app.scss";
    import utils from '../js/util';
    import { onMount } from 'svelte';
    export let user = {};
    export let assetsUrl;
   // export let platform = "Babieca";//usado para storybook
    export let platform;//usado para storybook
    export let usertype = "X"
    //DEPOSITOS MONTOS FAVORITOS
    //export let amountsFav = [5000, 10000, 30000, s50000];
    export let amountsFav = [50, 100, 300, 500];
    //export let ASSETS_GLOBAL;
    let loginModalOpen = false;
    let signupModalOpen = false;
    let depositModalOpen = false;
    let modalOpened;
    let isToggleOn = false;
    //Deposit Modal
    let notify={};

    const onOpenLogin = () => { loginModalOpen = true;  modalOpened = "login" } 
    const onOpenSingup = () => { signupModalOpen = true; modalOpened = "singup" }
    const onOpenDeposit = () => { depositModalOpen = true; modalOpened = "deposit" }
    const toggleMenuBar = () => ( isToggleOn =! isToggleOn )

    const onLoginOk = async (user_)=>{
        user = user_;
        notify = await utils.showNotify("success","Bienvenido a "+platform);
        loginModalOpen = false;
    }
    const onLoginError = async (error)=>{
        notify = {};
        notify = await utils.showNotify("error",error);
    }
    const onSignupOk = async (user_)=>{
        if (typeof user_ === 'string') {
            notify = await utils.showNotify("success",user_);
        }else{
            user = user_;
            notify = await utils.showNotify("success","Registro exitoso, bienvenido a "+platform);
            signupModalOpen = false;
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
        depositModalOpen = true;
    }
</script>

<div class="{platform}">
    <header class="header">
        <button class="btn header__menu" on:click={toggleMenuBar} class:is-open={isToggleOn}><span></span></button>
        <img class="header__logo" src="{assetsUrl}/logo.png" alt="logo-main">
        <div></div>
        <button class="btn login" on:click={onOpenLogin}>Acceso</button>
        <button class="btn singup" on:click={onOpenSingup}>Registro</button>
        <!-- Aqui agegaria los campos Pendientes que faltan agregar en caso ya este logueado 
            Notas: on:click|stopPropagation={onOpenLogin}, esto er apara los modale s pero el bug de los dropdow hizo que se descartara momentaneamente
        -->
    </header>
    <button class="btn singup" on:click={onOpenDeposit}>Depositow</button>

    <Modal bind:open={loginModalOpen} bind:modalOpened >
        <Login onOk={onLoginOk} onError={onLoginError} {assetsUrl}/>
    </Modal>
    
    <Modal bind:open={signupModalOpen} bind:modalOpened title="Registrate Aquí">
        <Singup bind:platform bind:usertype onOk={onSignupOk} onError={onSingupError}/>
    </Modal>
    <Modal bind:open={depositModalOpen} bind:modalOpened title="Depósito">
        <Deposit bind:user bind:amountsFav onOk={onDepositOk} onError={onDepositError}/>
    </Modal>

    <Notifier bind:notify/>
</div>
