<script>
    export let password;
	export let loginEnter;
	export let t;
	
	let showPassword = false;
	const dataPassword = (e) =>{ password = e.target.value }
	const togglePasswordHide = () => { showPassword =! showPassword }
</script>

<input class="ipt" type={showPassword ? 'text' : 'password'}  placeholder={t("login.password")} on:keypress={loginEnter} on:input={dataPassword}>
<button type="button" class="btn {showPassword ? 'no-eye' : 'eye'}" name="passowrd" on:click={togglePasswordHide}></button>