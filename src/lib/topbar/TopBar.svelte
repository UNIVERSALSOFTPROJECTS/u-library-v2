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
  import { SingupW } from "../..";
  import MenuLogged from "./MenuLogged.svelte";
  import Register from "./Register.svelte";
  import notify from "../../js/notify";
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
  export let userGateway;
  export let onLogin;

  let username = "";
  let password = "";

  let showUserCreation = false;
  let showRegisterModal = false;
  let showProfileModalMobile = false;
  let showProfileModalDesktop = false;
  let showPasswordChangeModal = false;

  let scrollPosition = 0;
  let divClass = "";

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
    if (userGateway == "neco") {
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
</script>

<div
  class="user-header {divClass} {active_view == 'virtual' &&
  userState != 'logout'
    ? 'virtual'
    : ''} {platform}"
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

  <Modal bind:open={showRegisterModal}>
    <Register bind:userState {onPasswordChangeModal} />
  </Modal>

  <Modal
    bind:open={showProfileModalDesktop}
    showHeader={false}
    modalOpened={"profile"}
  >
    <Profile bind:user bind:open={showProfileModalDesktop} bind:modalOpened />
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
