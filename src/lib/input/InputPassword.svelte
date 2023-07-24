<script>
    export let password;
	let showPassword = false;
	const dataPassword=(event) =>{ password = event.target.value }
	const togglePasswordHide = () => { showPassword = !showPassword }
</script>

<input class="ipt" type={showPassword ? 'text' : 'password'}  on:input={dataPassword} placeholder="Contraseña" autocomplete="off">
<button type="button" on:click={togglePasswordHide} class="btn {showPassword ? 'no-eye' : 'eye'}"></button>