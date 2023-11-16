<script>
    export let password;
	export let t;
	let showPassword = false;
	const dataPassword = (e) =>{ password = e.target.value }
	const togglePasswordHide = () => { showPassword =! showPassword }
</script>
<input class="ipt" type={showPassword ? 'text' : 'password'} autocomplete="off"  placeholder={t("login.password")} on:input={dataPassword}>
<button type="button" class="btn {showPassword ? 'no-eye' : 'eye'}" name="passowrd" on:click={togglePasswordHide}></button>