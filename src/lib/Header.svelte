<script>
    import Notifier from './Notifier.svelte';
    import Login from './modals/Login.svelte';
    import Modal from '../lib/Modal.svelte';
    import Singup from './modals/SingupX.svelte';
    import PaymentGateway from './payments/PaymentGatewayV1.svelte';
    import "../styles/app.scss";
    import utils from '../js/util';
    import { onMount } from 'svelte';
    export let user;
    export let assetsUrl;
    export let platform = "Babieca";//usado para storybook
    export let usertype = "X"
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

    const onLoginOk = (user_)=>{
        user = user_;
        notify = utils.showNotify("success","Bienvenido a "+platform);
        loginModalOpen = false;
    }
    const onLoginError = (error)=>{
        notify = utils.showNotify("error",error);
    }
    const onSignupOk = (user_)=>{
        if (typeof user_ === 'string') {
            notify = utils.showNotify("success",user_);
        }else{
            user = user_;
            notify = utils.showNotify("success","Registro exitoso, bienvenido a "+platform);
            signupModalOpen = false;
        }
    }
    const onSingupError = (error)=>{
        notify = utils.showNotify("error",error);
    }
</script>

<div class="{platform}">
    <header class="header">
        <button class="btn header__menu" on:click={toggleMenuBar} class:is-open={isToggleOn}><span></span></button>
        <img class="header__logo" src="{assetsUrl}/logo.png" alt="logo-main">
        <div></div>
        <button class="btn login" on:click={onOpenLogin}>Acceso</button>
        <button class="btn singup" on:click={onOpenSingup}>Registro</button>
        <!-- Aqui agegaria los campos Pendientes que faltan agregar en caso ya este logueado -->
    </header>
    <button class="btn singup" on:click={onOpenDeposit}>Despositow</button>

    <Modal bind:open={loginModalOpen} bind:modalOpened>
        <Login onOk={onLoginOk} onError={onLoginError} {assetsUrl}/>
    </Modal>
    
    <Modal bind:open={signupModalOpen} bind:modalOpened title="Registrate Aquí">
        <Singup bind:platform bind:usertype onOk={onSignupOk} onError={onSingupError}/>
    </Modal>
    <Modal bind:open={depositModalOpen} bind:modalOpened title="Depósito">
        <PaymentGateway />
    </Modal>


    <Notifier bind:open={notify.open} bind:message={notify.message} bind:type={notify.type}/>
</div>


