<script>
	import ServerConnection from "../../js/server";
	import InputPassword from "../input/InputPassword.svelte";
	import { onMount } from "svelte";

	export let onOk;
	export let onError;
	export let assetsUrl;
	export let platform;
	export let userGateway="neco";//neco/universal
	export let onOpenRecoverPass;
	export let t;//traduccion
	
	let password;
	let username;
	let loadLogin = false;
	let autoLogin =  localStorage.getItem('autoSaved')?true:false;
	let timerLogin;

	const loginEnter = (e) => { if (e.charCode === 13) loginClick(); };

	async function loginClick(){
		if(!username || !password ) return onError(t("msg.allObligatory"));
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
			if(error.message == "Network Error" || error.response.data.message.includes("Connection refused")) error = t("msg.pageMaintenance");
			else if(error.response.data.message == "NECO_LOGIN_FAILED") error = t("msg.incorrectUserPass");
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
    <img class="login__logo" src="{assetsUrl}/logo.png" alt="logo-main">
    <div></div>
    <form class="login__form">
		<input type="text" class="ipt" placeholder={t("login.user")} on:keypress={loginEnter} bind:value={username} disabled="{autoLogin}" >
		<input class="ipt" type="password"  placeholder={t("login.password")} on:keypress={loginEnter} on:input={password} bind:value={password} disabled="{autoLogin}" >
		<div class="login__autosaved">
			<input type="checkbox" id="autosaved" bind:checked={autoLogin} >
			<label for="autosaved">{t("login.remember")}</label>
		</div>
		<button type="button" class="btn login" disabled="{loadLogin}" on:click={loginClick}>
			{#if loadLogin}
				<div class="loading"><p></p><p></p><p></p></div>
				{:else}
				<p>{t("login.access")}</p>
			{/if}
		</button>
		<button on:click={onOpenRecoverPass} class="btn link">{t("login.forgetPassword")}</button>
    </form>
</div>