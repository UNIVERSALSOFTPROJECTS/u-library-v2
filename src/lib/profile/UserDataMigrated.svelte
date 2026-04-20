<script>
    import { onMount } from "svelte";

    export let ServerConnection;
    export let accountUser = {};
    export let onError = (_message) => {};
    export let onOk = (_message) => {};
    export let getMyAccount = () => {};

    let loadUserData = false;
    let doctypes = ["CI", "RUT", "DNI"];
    let selectDoctype = "";
    let exampleDoctype = "";

    const avoidSubmit = (e) => { e.preventDefault(); };

    const changeDoctype = () => {
        if (selectDoctype === "RUT") exampleDoctype = "Ejemplo: 15.363.225-1";
        else if (selectDoctype === "DNI") exampleDoctype = "Ejemplo: 47087611";
        else if (selectDoctype === "CI") exampleDoctype = "Ejemplo: V12345678";
        else exampleDoctype = "";
    };

    const saveMyAccount = async () => {
        if (!accountUser.birthday || !accountUser.document || !accountUser.phone) {
            return onError("Todos los campos obligatorios deben estar completos.");
        }
        try {
            loadUserData = true;
            accountUser.doctype = selectDoctype || accountUser.doctype || "CI";
            await ServerConnection.users.saveMyAccount(accountUser);
            onOk("Datos guardados correctamente.");
            await getMyAccount();
        } catch (error) {
            onError("Ocurrio un error. Contacte soporte.");
        } finally {
            loadUserData = false;
        }
    };

    onMount(() => {
        selectDoctype = accountUser.doctype || doctypes[0] || "CI";
        changeDoctype();
    });
</script>

<div class="userdata">
    <b>Datos personales</b>
    <form class="userdata__form" on:submit={avoidSubmit}>
        <p>Usuario</p>
        <p>Nombre y apellido</p>
        <input class="ipt" type="text" bind:value={accountUser.username} disabled>
        <input class="ipt" type="text" bind:value={accountUser.name} disabled>

        <p>Correo</p>
        <p>Fecha de nacimiento *</p>
        <input class="ipt" type="text" bind:value={accountUser.email} disabled>
        <input class="ipt" type="date" bind:value={accountUser.birthday}>

        <p>Telefono *</p>
        <p>Tipo de documento</p>
        <input class="ipt" type="text" bind:value={accountUser.phone}>
        <select class="slc" bind:value={selectDoctype} on:change={changeDoctype}>
            {#each doctypes as doctype}
                <option value={doctype}>{doctype}</option>
            {/each}
            {#if doctypes.length === 0}
                <option value="CI">CI</option>
            {/if}
        </select>

        <p>Numero de documento *</p>
        <p>Direccion</p>
        <input class="ipt" type="text" placeholder={exampleDoctype} bind:value={accountUser.document}>
        <input class="ipt" type="text" bind:value={accountUser.address}>

        <p>Ciudad</p>
        <div></div>
        <input class="ipt" type="text" bind:value={accountUser.city}>
        <div></div>
    </form>

    <button class="btn save" type="button" on:click={saveMyAccount} disabled={loadUserData}>
        {#if loadUserData}
            <div class="loading"><p></p><p></p><p></p></div>
        {:else}
            Guardar
        {/if}
    </button>
</div>
