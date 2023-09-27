<script>
  // @ts-nocheck
  import backend from "../../js/server";
  import EventManager from "../../js/EventManager";
  import util from "../../js/util";
  import HamburguerMenu from "../topbar/HamburguerMenu.svelte";
  import { onMount } from "svelte";
  import Modal from "../Modal.svelte";
  import Profile from "../profile/Profile.svelte";
  import NoLoginMenu from "./NoLoginMenu.svelte";
  import Login from "./Login.svelte";
  import DepositBank from "../payments/BankDeposit.svelte";
  import WithdrawalBank from "../withdrawal/WithdrawalBank.svelte";
  import { SingupW } from "../..";
  import MenuLogged from "./MenuLogged.svelte";
  import Register from "./Register.svelte";
  import notify from "../../js/notify";
  import DepositCashier from "../payments/ConfirmCashIn.svelte";
  import WithdrawalCashier from "../withdrawal/CashOut.svelte";
  import Notifier from "../Notifier.svelte";

  export let userState;
  export let active_view;
  export let user = {};
  export let showLoginModal = false;
  export let showMainLoading;
  export let loginModalOpen;
  export let modalOpened;
  export let assetsUrl;
  export let platform;
  export let amountsFav = [5000, 10000, 30000, 50000];
  export let userGateway;
  export let onLogin;

  let username = "";
  let password = "";

  let showUserCreation = false;
  let showRegisterModal = false;
  let showProfileModalMobile = false;
  let showProfileModalDesktop = false;
  let showPasswordChangeModal = false;
  let showWithdrawal = false;
  let showWithdrawalCashier = false;
  let pendingWhitdrawall = null;
  let scrollPosition = 0;
  let divClass = "";
  let depositModalOpen = false;
  let depositModalCashier = false;
  let signupModalOpen = false;

  let countries = [{ prefix: "+56", flag: "chl" }];
  let currencies = [
    { name: "Peso chileno", code: 7, agent: 4675 }, //este codigo se toma como el id_operado en caso el tipo sea W
  ];

  const handleScroll = () => {
    scrollPosition = window.scrollY;
    if (scrollPosition < 60) {
      divClass = "class-a";
    } else {
      divClass = "class-b";
    }
  };
  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  notify.setEM(EventManager);

  const onShowUserCreation = () => {
    user = {};
    showUserCreation = true;
  };

  const onRegisterOk = (data) => {
    notify.success("Registro Correcto!");
    document.getElementById("u-login-btn").click();
  };

  const onShowRegisterModal = (ev) => {
    showRegisterModal = true;
  };

  const onShowLoginModal = () => {
    showLoginModal = true;
  };

  const onCategoryChange = (cat) => {
    if (/horses|esports/.test(cat) && userState == "logout") {
      showLoginModal = true;
      return;
    }
    active_view = cat;
    util.setUrlPage(active_view);
  };

   const onWithdrawalBankError = (e) => {
      notify.error("Error al procesar retiro");
  };

  const onWithdrawalCashError = (e) => {
    notify.error("Error al procesar retiro");
  };

  const onWithdrawalOk = (data) => {
    notify.success("Retiro procesado");
  };

  const onShowWithdrawalBank = async () => {
    try {
      showWithdrawal = true;
      showProfileModalDesktop = false;
    } catch (error) {
      console.log(error);
      notify.error("Error");
    }
  };
  const onShowWithdrawalCashier = async () => {
    try {
      console.log("entro");
      let data = await backend.u_wallet.checkPendingCashout(user.token);
      console.log(data);
      showWithdrawalCashier = true;
      showProfileModalDesktop = false;
      pendingWhitdrawall = data;
    } catch (error) {
      notify.error("Error al consultar retiro previo");
    }
  };

  


  const onOpenLogin = () => {
    loginModalOpen = true;
    modalOpened = "login";
    setTimeout(() => {
      document.body.removeAttribute("style");
    }, 100);
  };

  const onLogout = () => {
    userState = "logout";
    active_view = "home";
    sessionStorage.removeItem("user");
    showProfileModalMobile = false;
    location.reload();
  };

  const onOpenMyAccount = async () => {
    showProfileModalDesktop = true;
    document.body.style.overflow = "hidden";
    if(userGateway=='neco'){
       const data = await backend.getMyAccount(user.token);
      let serial_api_casino = user.serial_api_casino;
      let token = user.token;
      let agregatorToken = user.agregatorToken;
      user = { ...user, ...data };
      user.serial_api_casino = serial_api_casino;
      user.token = token;
      user.agregatorToken = agregatorToken;
    }
   
    
  };

  const onPasswordChangeModal = () => {
    showPasswordChangeModal = true;
  };

  const onOpenDepositBank = () => {
    depositModalOpen = true;
    modalOpened = "deposit";
    showProfileModalDesktop = false;
    setTimeout(() => {
      document.body.removeAttribute("style");
    }, 100);
  };

  const onOpenDepositCashier = () => {
    depositModalCashier = true;
    modalOpened = "deposit";
    showProfileModalDesktop = false;
    setTimeout(() => {
      document.body.removeAttribute("style");
    }, 100);
  };

  const onOpenSingup = () => {
    signupModalOpen = true;
    modalOpened = "singup";
    setTimeout(() => {
      document.body.removeAttribute("style");
    }, 100);
  };
  const onLoginOk = async (user_) => {
    user = user_;
    notify.success("Bienvenido a " + platform);
    loginModalOpen = false;
    userState = "loggedIn";
    active_view = "home";
    onLogin();
  };
  const onLoginError = async (error) => {
    notify.error(error);
  };
  
  const onSignupOk = async (user_) => {
    if (typeof user_ === "string") {
      //envio smss
      //notify = await utils.showNotify("success",user_);
      notify.success(user_);
    } else {
      user = user_;
      //notify = await utils.showNotify("success","Registro exitoso, bienvenido a "+platform);
      notify.success("Registro exitoso, bienvenido a " + platform);
      signupModalOpen = false;
    }
  };
  const onSingupError = async (error) => {
    //notify = {};
    //notify = await utils.showNotify("error",error);
    notify.error(error);
  };
  const onDepositError = async (error) => {
    //notify = {};
    //notify = await utils.showNotify("error",error);
    notify.error(error);
  };
  const onDepositOk = async (data) => {
    // notify = await utils.showNotify("success",data);
    depositModalOpen = false;

    notify.success(data);
  };
</script>

<div
  class="user-header {divClass} {active_view == 'virtual' && userState != 'logout'? 'virtual': ''} {platform}"
  id="user-header"
>
  <div class="user-header-principal">
    <HamburguerMenu bind:active_view {onCategoryChange} {assetsUrl} />
    <button class="content-logo" on:click={() => (active_view = "home")}>
      <img class="logo" src="{assetsUrl}/{platform}/logo.png" alt="" />
    </button>
  </div>
  <div class="u-control">
    {#if userState == "loggedIn"}
      <div class="balance">
        <MenuLogged
          bind:active_view
          bind:user
          {onLogout}
          {onPasswordChangeModal}
          {onOpenMyAccount}
          {onShowWithdrawalBank}
          {onOpenDepositBank}
        />
      </div>
    {:else}
      <div class="buttons">
        <NoLoginMenu
          {onShowLoginModal}
          {onShowRegisterModal}
          {onShowUserCreation}
          {onOpenLogin}
          {onOpenSingup}
          bind:showMainLoading
          bind:user
          bind:username
          bind:password
        />
      </div>
    {/if}
  </div>
</div>



<div class={platform}>
  <Modal bind:open={loginModalOpen} bind:modalOpened>
    <Login
      onOk={onLoginOk}
      onError={onLoginError}
      {assetsUrl}
      {userGateway}
      {platform}
    />
  </Modal>
  <Modal bind:open={signupModalOpen} bind:modalOpened title="Registrate Aquí">
    <SingupW
      bind:platform
      bind:countries
      bind:currencies
      onOk={onSignupOk}
      onError={onSingupError}
    />
  </Modal>

  <Modal bind:open={depositModalOpen} bind:modalOpened showHeader={false}>
    <DepositBank
      bind:user
      bind:amountsFav
      onOk={onDepositOk}
      onError={onDepositError}
      bind:open={depositModalOpen}
    />
  </Modal>
  <Modal bind:open={depositModalCashier} bind:modalOpened showHeader={false}>
    <DepositCashier
      bind:user
      bind:amountsFav
      onOk={onDepositOk}
      onError={onDepositError}
      bind:open={depositModalCashier}
    />
  </Modal>

  <Modal bind:open={showRegisterModal}>
  <Register bind:userState {onPasswordChangeModal} />
</Modal>

<Modal bind:open={showProfileModalDesktop} showHeader={false} modalOpened={"profile"}>
  <Profile
    bind:user
    bind:open={showProfileModalDesktop}
    {onOpenDepositBank}
    {onShowWithdrawalBank}
    {onOpenDepositCashier}
    {onShowWithdrawalCashier}
  />
</Modal>

<Modal bind:open={showWithdrawal} showHeader={false}>
  <WithdrawalBank
    bind:user
    bind:open={showWithdrawal}
    bind:pendingWhitdrawall
    onOk={onWithdrawalOk}
    onError={onWithdrawalBankError}
  />
</Modal>

<Modal bind:open={showWithdrawalCashier} showHeader={false}>
  <WithdrawalCashier
    bind:user
    bind:open={showWithdrawalCashier}
    bind:pendingWhitdrawall
    onOk={onWithdrawalOk}
    onError={onWithdrawalCashError}
  />
</Modal>

<Notifier></Notifier>
</div>

<style>
  
  .user-header.virtual {
    position: fixed;
    z-index: 101;
    top: 0;
  }
  .user-header {
    background-color: #05050598;
  }
  @media only screen and (max-width: 1022px) {
    .in-desktop {
      display: none;
    }
    .user-header {
      width: 100%;
      /*background-color: #050505;*/
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 3.5rem;
    }
    .user-header-principal {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.5rem;
      gap: 0.5rem;
    }
    .content-logo {
      width: 7.5rem;
      height: 50px;
      padding: 0;
      background-color: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    .logo {
      width: 100%;
      height: auto;
    }
  }
  @media only screen and (min-width: 1024px) {
    .in-mobile {
      display: none;
    }
    .user-header {
      width: 100%;
      /*background-color: #050505;*/
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 3.5rem;
    }
    .user-header-principal {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.5rem;
      gap: 0.25rem;
    }
    .content-logo {
      background-color: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      padding: 0;
      width: 8rem;
    }
    .logo {
      width: 100%;
    }
  }
</style>
