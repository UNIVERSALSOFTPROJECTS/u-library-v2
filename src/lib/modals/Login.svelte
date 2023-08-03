<script>
	import ServerConnection from "../../js/server";
	import InputPassword from "../input/InputPassword.svelte";

	export let onOk;
	export let onError;
	export let assetsUrl;

	let password;
	let username;
	let loadLogin = false;

	async function loginClick(){
		if(!username || !password ) return onError("Todos los campos son obligatorios");
		try {
			loadLogin = true
			const {data} = await ServerConnection.users.login(username,password);
			if(data.username=='') throw("USER_NOT_FOUND");
			sessionStorage.setItem("user",JSON.stringify(data));
			sessionStorage.setItem("token",data.token);
			sessionStorage.setItem("agregatorToken",data.agregatorToken);
			onOk(data);
		} catch (error) {
			if(error.response.data.message == "NECO_LOGIN_FAILED") error = "Usuario o contraseña incorrecto";
			else error = "Error desconocido, contacte con soporte";
			onError(error);
			loadLogin = false;
		}
	}
</script>

<div class="modal-body">
  	<div class="login__title">Bienvenido a</div>
    <img class="login__logo" src="{assetsUrl}/logo.png" alt="logo-main">
    <div></div>
    <form class="login__form">
		<input type="text" class="ipt" placeholder="Usuario" autocomplete="off" bind:value={username}>
		<div class="login__ipt--pass">
			<InputPassword bind:password/>
		</div>
		<button type="button" class="btn singup" on:click={loginClick} disabled="{loadLogin}">
			{#if loadLogin}
				<div class="loading"><p></p><p></p><p></p></div>
				{:else}
				Ingresar
			{/if}
		</button>
		<div class="link">¿Olvidaste tu contraseña?</div>
    </form>
</div>