<script>
	import ServerConnection from "../../js/server";
	import InputPassword from "../input/InputPassword.svelte";
	import { onMount } from "svelte";

	export let onOk;
	export let onError;
	export let assetsUrl;
	export let userGateway="neco";//neco/universal

	let password;
	let username;
	let loadLogin = false;
	let autoLogin =  localStorage.getItem('autoSaved')?true:false;
	let timerLogin;

	const loginEnter = (e) => { if (e.charCode === 13) loginClick(); };

	async function loginClick(){
		if(!username || !password ) return onError("Todos los campos son obligatorios");
		try {
			loadLogin = true
			let data ;
			if (userGateway=='neco')  data = await ServerConnection.users.login(username,password);
			else  data = await ServerConnection.u_user.login(username,password);
			//console.log("data: ",data);
			data = data.data;
			if(data.username=='') throw("USER_NOT_FOUND");
			let date = new Date();
      		date.setDate(date.getDate() + 1);
			data.expireToken= date.getTime();
			sessionStorage.setItem("user",JSON.stringify(data));
			if (autoLogin && !localStorage.getItem('autoSaved'))localStorage.setItem('autoSaved',`[{"user":"${username}", "pass":"${password}"}]`);
			if(timerLogin) clearTimeout(timerLogin);
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

	onMount(() => {
		if (autoLogin) {
			let userSaved = JSON.parse(localStorage.getItem('autoSaved'));
			username = userSaved[0].user;
			password = userSaved[0].pass;
			timerLogin = setTimeout(function() { loginClick(); }, 10000);
		}
	});

	function cancelAutologin(status) {
		if (!status){
			clearTimeout(timerLogin);
			localStorage.removeItem('autoSaved');
		}
	}
	$:cancelAutologin(autoLogin);
</script>

<div class="modal-body">
  	<div class="login__title">Bienvenido a</div>
    <img class="login__logo" src="{assetsUrl}/logo.png" alt="logo-main">
    <div></div>
    <form class="login__form">
		<input type="text" class="ipt" placeholder="Usuario" on:keypress={loginEnter} bind:value={username} disabled="{autoLogin}" >
		<input class="ipt" type="password"  placeholder="Contraseña" on:keypress={loginEnter} on:input={password} bind:value={password} disabled="{autoLogin}" >
		<div class="login__autosaved">
			<input type="checkbox" id="autosaved" bind:checked={autoLogin} >
			<label for="autosaved">Recordar</label>
		</div>
		<button type="button" class="btn singup" disabled="{loadLogin}" on:click={loginClick}>
			{#if loadLogin}
				<div class="loading"><p></p><p></p><p></p></div>
				{:else}
				Ingresar
			{/if}
		</button>
		<div class="link">¿Olvidaste tu contraseña?</div>
    </form>
</div>