<script>
    export let password;
	export let t;
	
	let hidePassword = true;
	const togglePasswordHide = () => { hidePassword =! hidePassword }
</script>
{#if hidePassword}
	<input class="ipt icon--password" type="password" placeholder={t("login.password")} bind:value={password} autocomplete="off">
{:else}
	<input class="ipt icon--password" type="text" placeholder={t("login.password")} bind:value={password} autocomplete="off">
{/if}
<button type="button" class="btn {hidePassword ? 'no-eye' : 'eye'}" name="password" on:click={togglePasswordHide}></button>