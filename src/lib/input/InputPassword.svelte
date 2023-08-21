<script>
    export let password;
	let showPassword = false;
<<<<<<< HEAD
	const dataPassword=(event) =>{ password = event.target.value }
	const togglePasswordHide = () => { showPassword = !showPassword }
</script>

<input class="ipt" type={showPassword ? 'text' : 'password'}  on:input={dataPassword} placeholder="Contraseña" autocomplete="off">
<button type="button" on:click={togglePasswordHide} class="btn {showPassword ? 'no-eye' : 'eye'}"></button>
=======
	const dataPassword = (e) =>{ password = e.target.value }
	const togglePasswordHide = () => { showPassword =! showPassword }
</script>

<input class="ipt" type={showPassword ? 'text' : 'password'}  placeholder="Contraseña" autocomplete="off" on:input={dataPassword}>
<button type="button" class="btn {showPassword ? 'no-eye' : 'eye'}" on:click={togglePasswordHide}></button>
>>>>>>> a2dc001 (modal de depoosito listo)
