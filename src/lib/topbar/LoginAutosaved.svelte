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
	let typeView = localStorage.getItem('typeView') || "";
	let password;
	let username;
	let loadLogin = false;
	let autoLogin = localStorage.getItem('autoSaved')?true:false;
	let isAutoservice = autoLogin && typeView == "autoservice";
	let isAutoserviceError = false;
	let timerLogin;

	async function loginClick(){
		console.log("entras");
		
		if(!username || !password ) return onError(t("msg.allObligatory"));
		try {
			console.log("tryIn");
			
			loadLogin = true
			let data ;
			data = await ServerConnection.users.login(username,password);
			console.log("data? ", data);
			
			data = data.data;
			console.log("data.data? ", data);
			
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
			// @ts-ignore
			console.log("data-error? ", data);
			
			if (error.message == "Network Error" || error.response.data.message.includes("Connection refused"))
				error = t("msg.pageMaintenance");
			else if(error.response.data.message == "NECO_LOGIN_FAILED" || error.response.data.message == "LOGIN_ERROR")
				error = t("msg.incorrectUserPass");
			else error = t("msg.contactSupport");
			onError(error);
			loadLogin = false;
			if (isAutoservice) isAutoserviceError = true;
		}
	}

	function cancelAutologin(status) {
		if (!status){
			clearTimeout(timerLogin);
			localStorage.removeItem('autoSaved');
		}
	}

	onMount(() => {
		if (autoLogin) {
			let userSaved = JSON.parse(localStorage.getItem('autoSaved'));
			username = userSaved[0].user;
			password = userSaved[0].pass;
			timerLogin = setTimeout(function() { loginClick(); }, typeView == "autoservice"?2000:10000);
		}
	});
	
	$:cancelAutologin(autoLogin);
</script>

{#if isAutoservice}
<div class="modal-body">
	{#if isAutoserviceError}
		<div class="login__autoservice error">
			<p>{t("login.autoserviceError")}</p>
			<button class="btn" on:click={()=>location.reload()}>{t("msg.refresh")}</button>
		</div>
	{:else}
		<div class="login__autoservice">
			<!-- esto de momento es solo para mahcines -->
			<div class="loading">
				<div>
				  <b><b><b><b><b><b><b><b><b><b><b></b></b></b></b></b></b></b></b></b></b></b>
				</div>
			</div>
			<p>{t("lobby.loading")}</p>
		</div>
	{/if}
</div>
{/if}
<div class="modal-body {isAutoservice?'autoservice':''}">
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