<script>
  import { onMount } from "svelte";

  export let onShowLoginModal;
  export let onSubmitted;
  export let onOpenLogin;
  export let onOpenSingup;
  export let user = {};

  let username = user && user.usernme;
  let password = user && user.password;

  const loginEnter = (e) => {
    if (e.charCode === 13) onLoginClick();
  };

  const onLoginClick = async () => {
    if (!username && user.username) username = user.username;
    if (!password && user.password) password = user.password;

    if( !username || !password ){ onShowLoginModal(); return;}
    let info = {username, password}
    onSubmitted(info)
  };

  onMount(() => {
    if (user == null) {
      user = {};
    }
  });

</script>

<div class="u-main-no-login">

  <div class="u-buttons">
    <button id="u-login-btn" class="button-star" on:click={onOpenLogin}>
      ACCESO
    </button>
    <button class="button-check-in" on:click={onOpenSingup}>
      <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem"  viewBox="0 0 24 24" fill="none">
        <path d="M4 20V19C4 16.2386 6.23858 14 9 14H12.75M17.5355 13.9645V17.5M17.5355 17.5V21.0355M17.5355 17.5H21.0711M17.5355 17.5H14M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      <div>REGISTRO</div>
    </button>
  </div>
</div>

<style>
  button{
    font-family: inherit;
  }
  @media only screen and (max-width: 999px) {
    .u-main-no-login {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: end;
      background-color: transparent;
      padding-right: 0.2rem;
      height: 2rem;
      gap: 1.5rem;
      margin-left: 0.5rem;
    }
    .u-buttons {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      justify-content: space-between;
      align-items: center;
      height: 80%;
    }

  }

  @media only screen and (min-width: 1000px) {
    .u-main-no-login {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: end;
      background-color: transparent;
      margin-right: 1rem;
      height: 2rem;
      gap: 1.5rem;
    }
  
    .u-buttons {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      justify-content: space-between;
      align-items: center;
      height: 1.8rem;
    }
    
  }
  .button-star {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.45rem;
      border: none;
      color: white;
      background-color: #6622b9d7;
      font-size: 0.8rem;
      width: max-content;
    }
    .button-check-in {
      display: flex;
      color: white;
      border: none;
      padding: 0.45rem;
      background-color: #406a4b;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
</style>
