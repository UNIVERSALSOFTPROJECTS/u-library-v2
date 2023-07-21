<script>
    
    import Login from './modals/Login.svelte';
    import Modal from '../lib/Modal.svelte';
    import Singup from './modals/Singup.svelte';
    import "../styles/app.scss";
    export let user;
    export let assetsUrl;
    export let platformClass="";//usado para storybook
    //export let ASSETS_GLOBAL;
    let loginModalOpen=false;
    let signupModalOpen=false;
    let modalOpened;
    let isToggleOn = false;
      
    const onLoginClick = () => { loginModalOpen=true;  modalOpened = "login" } 
    const onOpenSingup = () => { signupModalOpen=true; modalOpened = "singup" }
    const toggleMenuBar = () => ( isToggleOn=!isToggleOn )

    const onLoginOk = (user_)=>{
        user = user_;
        alert("Bienvenido a Babieca");
    }
    const onLoginError=(error)=>{
        alert("Error al procesar login "+error.response.data.message);
    }
    const onSignupOk = (user_)=>{
        user = user_;
        alert("Registro exitoso, bienvenido a Babieca")//en automatico al registrarse deberia iniciar sesion solo por 1ra vez
    }
    const onSingupError=(error)=>{
        alert("Error al procesar registro "+error.response.data.message);
    }
</script>

<div class="{platformClass}">
    <header class="header">
        <button class="btn header__menu" on:click={toggleMenuBar} class:is-open={isToggleOn}><span></span></button>
        <img class="header__logo" src="{assetsUrl}/logo4.png" alt="">
        <div></div>
        <button class="btn login" on:click={onLoginClick}>Acceso</button>
        <button class="btn singup" on:click={onOpenSingup}>Registro</button>
         <!-- Aqui agegaria los campos Pendientes que faltan agregar en caso ya este logueado -->
    </header>
    <Modal bind:open={loginModalOpen} clazz={modalOpened} >
        <Login onOk={onLoginOk} onError={onLoginError} {assetsUrl} />
    </Modal>
    
    <Modal bind:open={signupModalOpen} clazz={modalOpened} title="Registrate Aquí">
        <Singup  onOk={onSignupOk} onError={onSingupError} platform={platformClass} usertype={"X"}/>
    </Modal>
</div>