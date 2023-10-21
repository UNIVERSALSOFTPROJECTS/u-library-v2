<script>
  import ServerConnection from "../../js/server";
  import InputPassword from "../input/InputPassword.svelte";

	export let onOk;
	export let onError;
	export let assetsUrl;
	export let platform;
	export let userGateway="neco";//neco/universal

	let password;
	let username;
	let loadLogin = false;

	const loginEnter = (e) => { if (e.charCode === 13) loginClick() };

	async function loginClick(){
		if(!username || !password ) return onError("Todos los campos son obligatorios");
		try {
			loadLogin = true
			let data ;
			if (userGateway=='neco')  data = await ServerConnection.users.login(username,password);
			else  data = await ServerConnection.u_user.login(username,password);
			data = data.data;
			if(data.username=='') throw("USER_NOT_FOUND");
			let date = new Date();
      		date.setDate(date.getDate() + 1);
			data.expireToken= data.claims.exp;
			data.playerId = data.id;
			delete data.claims
			console.log("Info para session storage",data);
			sessionStorage.setItem("user",JSON.stringify(data));
			onOk(data);
		} catch (error) {
			console.log("error: ", error);
			if(error.message == "Network Error" || error.response.data.message.includes("Connection refused")) error = "Página en mantenimiento, espere unos minutos";
			else if(error.response.data.message == "NECO_LOGIN_FAILED") error = "Usuario o contraseña incorrecto";
			else error = "Ocurrio un error, contactese con soporte";
			onError(error);
			loadLogin = false;
		}
	}
</script>

<div class="modal-body">
  	<div class="login__title">Bienvenido a</div>
    <img class="login__logo" src="{assetsUrl}/{platform}/logo.png" alt="logo-{platform}">
    <div></div>
    <form class="login__form">
		<input type="text" class="ipt" placeholder="Usuario" on:keypress={loginEnter} bind:value={username}>
		<div class="login__ipt--pass">
			<InputPassword bind:password {loginEnter}/>
		</div>
		<button type="button" class="btn login" disabled="{loadLogin}" on:click={loginClick}>
			{#if loadLogin}
				<div class="loading"><p></p><p></p><p></p></div>
				{:else}
				<p>Ingresar</p>
			{/if}
		</button>
		<div class="link">¿Olvidaste tu contraseña?</div>
    </form>
</div>
