<script>
  // @ts-nocheck
  import backend from "../../js/server";
  import EventManager from "../../js/EventManager";
  import util from "../../js/util";
  import HamburguerMenu from "../topbar/HamburguerMenu.svelte";
  import { onMount } from "svelte";
  import { t} from "../../js/i18n";
  import Modal from "../Modal.svelte";
  import Profile from "../profileU/Profile.svelte";
  import NoLoginMenu from "./NoLoginMenu.svelte";
  import Login from "./Login.svelte";
  import { SingupW } from "../..";
  import MenuLogged from "./MenuLogged.svelte";
  import Register from "./Register.svelte";
  import notify from "../../js/notify";
  import Notifier from "../Notifier.svelte";
  import RecoverPassword from "./RecoverPassword.svelte";
  import Conditions from "./Conditions.svelte";
  import AlertRefreshToken from "./AlertRefreshToken.svelte";
  import Configs from "./Configs.svelte";

  export let userState;
  export let active_view;
  export let user = {};
  export let showLoginModal = false;
  export let showMainLoading;
  export let loginModalOpen;
  export let modalOpened;
  export let assetsUrl;
  export let platform;
  export let userGateway;
  export let onLogin;
  export let countries = ["PE"];
  export let currencies = ["USD"];
  export let doctypes = ["DNI"];
  export let limitAmount = { min: 50, max: 2000 };
  export let isOauth;
  export let configsAllowed;
  export let onShowCustomConfig;

  let username = "";
  let password = "";
  let showUserCreation = false;
  let showRegisterModal = false;
  let showRecoverPass = false;
  let showModalProfile = false;
  let scrollPosition = 0;
  let divClass = "";
  let signupModalOpen = false;
  let showConditions = false;

  let showConfigs=false;

  const onShowConfigs = ()=>{
    modalOpened = "config";
    showConfigs = true;
  }

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

  const onOpenLogin = () => {
    loginModalOpen = true;
    modalOpened = "login";
    setTimeout(() => {
      document.body.removeAttribute("style");
    }, 100);
  };

  const onOpenRecoverPass = () => {
    loginModalOpen = false;
    showRecoverPass = true;
    modalOpened = "singup";
  };

  const onOpenConditions = () => {
    signupModalOpen = false;
    showConditions = true;
    modalOpened = "singup";
  };

  const onLogout = () => {

    userState = "logout";
    active_view = "home";
    sessionStorage.removeItem("user");
    showModalProfile = false;
    //location.reload();
    document.body.style.overflow = "hidden";
  };

  const onOpenMyAccount = async () => {
    showModalProfile = true;
    document.body.style.overflow = "visible";

    const data = await backend.u_user.myAccount(user.token);
    let serial_api_casino = user.serial_api_casino;
    let token = user.token;
    let agregatorToken = user.agregatorToken;
    user = { ...user, ...data };
     
    user.serial_api_casino = serial_api_casino;
    user.token = token;
    user.agregatorToken = agregatorToken;
  };

  const onPasswordChangeModal = () => {
    showPasswordChangeModal = true;
  };

  const onOpenSingup = () => {
    signupModalOpen = true;
    modalOpened = "singup";
    setTimeout(() => {
      document.body.removeAttribute("style");
    }, 100);
  };

  const onOkSingup = () => {
    notify.success("Usuario registrado exitosamente");
    signupModalOpen = false;
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


  /*const getBonus = () => {
    let data;
    const formattedBonus = [];
    for (const type in data.bonus) {
      if (data.bonus.hasOwnProperty(type)) {
        const currency = Object.keys(data.bonus[type])[0];
        const amount = data.bonus[type][currency];

        formattedBonus.push({
          type: type,
          currency: currency,
          amount: amount
        });
      }*/


  
</script>

<div
  class="user-header {divClass} {active_view == 'virtual' &&
  userState != 'logout'
    ? 'virtual'
    : ''} {platform}"
  id="user-header"
>
  <div class="user-header-principal">
    <HamburguerMenu bind:active_view {onCategoryChange} {assetsUrl} {onShowConfigs} />
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
      {onOpenRecoverPass}
      t={$t}
      bind:isOauth
    />
  </Modal>

  <Modal bind:open={showConfigs} bind:modalOpened title="Configuracion">
    <Configs {configsAllowed} {onShowCustomConfig}></Configs>
  </Modal>

  <Modal bind:open={showRecoverPass} bind:modalOpened showHeader={false}>
    <RecoverPassword 
      bind:open={showRecoverPass}
    />
  </Modal>
  <Modal bind:open={signupModalOpen} bind:modalOpened title="Registrate Aquí">
    <Register
      bind:countries
      bind:platform
      bind:currencies
      bind:doctypes
      {onOkSingup}
      {onOpenConditions}
      bind:isOauth
    />
  </Modal>

  <Modal bind:open={showConditions} bind:modalOpened showHeader={false}>
    <Conditions bind:open={showConditions}></Conditions>
  </Modal>

  <Modal
    bind:open={showModalProfile}
    showHeader={false}
    modalOpened={"profile"}
  >
    <Profile
      bind:limitAmount
      {onLogout}
      bind:user
      bind:open={showModalProfile}
      bind:modalOpened
    />
  </Modal>

  <Notifier />

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
