<script>
	import ServerConnection from "../../js/server";
	import DropdowIdiom from "../dropdown/DropdowIdiom.svelte";
	import { onMount } from "svelte";
	
	export let configLogin;
	export let onOk;
	export let onError;
	export let onOpenRecoverPassword;
	export let t;//traduccion

	const changeIdiom = configLogin.changeIdiom;
	const platform = configLogin.platform;
	const assetsUrl = configLogin.assetsUrl;
	let  idioms = configLogin.idioms;
	let password;
	let username;
	let loadLogin = false;
	let autoLogin = localStorage.getItem('autoSaved')?true:false;
	let timerLogin;

	async function loginClick(){
		if(!username || !password ) return onError(t("msg.allObligatory"));
		try {
			loadLogin = true
			let data ;
			data = await ServerConnection.users.login(username,password);
			data = data.data;
			if (data.username=='')throw("USER_NOT_FOUND");
			let date = new Date();
      		date.setDate(date.getDate() + 1);
			data.expireToken= date.getTime();
			sessionStorage.setItem("user",JSON.stringify(data));
			if (autoLogin && !localStorage.getItem('autoSaved'))localStorage.setItem('autoSaved',`[{"user":"${username}", "pass":"${password}"}]`);
			if (timerLogin) clearTimeout(timerLogin);
			onOk(data);
		} catch (error) {
			console.log("error: ", error);
			if (error.message == "Network Error" || error.response.data.message.includes("Connection refused"))
				error = t("msg.pageMaintenance");
			else if(error.response.data.message == "NECO_LOGIN_FAILED")
				error = t("msg.incorrectUserPass");
			else error = t("msg.contactSupport");
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
  	<div class="login__title">{t("login.title")}</div>
    <img class="login__logo" src="{assetsUrl}/{platform}/logo.png" alt="logo-main">
    <div></div>
    <form class="login__form">
		<input type="text" class="ipt" placeholder={t("login.user")} autocapitalize="off" disabled="{autoLogin}" bind:value={username}>
		<input type="password" class="ipt" placeholder={t("login.password")} autocomplete="off" disabled="{autoLogin}" bind:value={password}>
		<div class="login__autosaved">
			<input type="checkbox" id="autosaved" bind:checked={autoLogin}>
			<label for="autosaved">{t("login.remember")}</label>
			<div></div>
			<DropdowIdiom bind:idioms {changeIdiom}/>
		</div>
		<button type="button" class="btn login" disabled="{loadLogin}" on:click={loginClick}>
			{#if loadLogin}
				<div class="loading"><p></p><p></p><p></p></div>
			{:else}
				<p>{t("login.access")}</p>
			{/if}
		</button>
		<!-- <button type="button" on:click={onOpenRecoverPassword} class="btn openForgotPass"><b>{t("login.forgetPassword")}</b></button> -->
    </form>
</div>