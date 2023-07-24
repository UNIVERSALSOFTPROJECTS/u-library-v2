<script>
	import ServerConnection from "../../js/server";
	import InputPassword from "../input/InputPassword.svelte";

	export let onOk;
	export let onError;
	export let assetsUrl;

	let password;
	let username;

	async function loginClick(){
		if(!username || !password ) return alert("Credenciales incompletas");
		try {
			const {data}=await ServerConnection.users.login(username,password);
			if(data.username=='') throw("USER_NOT_FOUND");
			sessionStorage.setItem("user",JSON.stringify(data));
			sessionStorage.setItem("token",data.token);
			sessionStorage.setItem("agregatorToken",data.agregatorToken);
			onOk(data);
		} catch (error) {
			onError(error);
		}
	}
</script>

<div class="modal-body">
  	<div class="login__title">Bienvenido a</div>
    <img class="login__logo" src="{assetsUrl}/logo4.png" alt="logo-main">
    <div></div>
    <form class="login__form">
		<input type="text" class="ipt" placeholder="Usuario" autocomplete="off" bind:value={username}>
		<div class="login__ipt--pass">
			<InputPassword bind:password/>
		</div>
		<button type="button" class="btn singup" on:click={loginClick}>Ingresar</button>
		<div class="link">¿Olvidaste tu contraseña?</div>
    </form>
</div>