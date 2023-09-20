<script>
    export let password;

	let showPassword = false;
	const dataPassword = (e) =>{ password = e.target.value }
	const togglePasswordHide = () => { showPassword =! showPassword }
</script>

<input class="ipt" type={showPassword ? 'text' : 'password'}  placeholder="Contraseña" autocomplete="new-password"  on:input={dataPassword}>
<button type="button" class="btn {showPassword ? 'no-eye' : 'eye'}" name="passowrd" on:click={togglePasswordHide}></button>