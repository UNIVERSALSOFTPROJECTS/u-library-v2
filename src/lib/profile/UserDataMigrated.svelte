<script>
    import { onMount } from "svelte";
    import DropdowPrefix from "../dropdown/DropdowPrefix.svelte";

    export let ServerConnection;
    export let accountUser = {};
    export let countries = [
        { prefix: "+58", flag: "ven" },
        { prefix: "+54", flag: "ars" },
        { prefix: "+297", flag: "aw" },
        { prefix: "+61", flag: "au" },
        { prefix: "+591", flag: "bol" },
        { prefix: "+55", flag: "bra" },
        { prefix: "+359", flag: "bg" },
        { prefix: "+1", flag: "ca" },
        { prefix: "+56", flag: "chl" },
        { prefix: "+57", flag: "col" },
        { prefix: "+506", flag: "cr" },
        { prefix: "+1 809", flag: "do" },
        { prefix: "+593", flag: "ecu" },
        { prefix: "+34", flag: "esp" },
        { prefix: "+33", flag: "fr" },
        { prefix: "+44", flag: "gb" },
        { prefix: "+972", flag: "il" },
        { prefix: "+39", flag: "it" },
        { prefix: "+82", flag: "kr" },
        { prefix: "+52", flag: "mx" },
        { prefix: "+507", flag: "pa" },
        { prefix: "+595", flag: "prg" },
        { prefix: "+51", flag: "pe" },
        { prefix: "+351", flag: "por" },
        { prefix: "+598", flag: "uy" },
        { prefix: "+1", flag: "usa" },
    ];
    export let onError;
    export let onOk;

    let loadUserData = false;
    let doctypes = ["CI", "RUT", "DNI"];
    let selectDoctype = "";
    let exampleDoctype = "";

    const parseExistingPhone = (phone, countryList) => {
        if (!phone) return { phoneNumber: "" };
        const match = [...countryList]
            .sort((a, b) => b.prefix.length - a.prefix.length)
            .find((c) => phone.startsWith(c.prefix));
        if (match) {
            return {
                countryPrefix: match.prefix,
                phoneNumber: phone.slice(match.prefix.length).trim(),
            };
        }
        return { phoneNumber: phone };
    };

    const parsedPhone = parseExistingPhone(accountUser.phone || "", countries);
    let phoneNumber = parsedPhone.phoneNumber;
    let countryPrefix = parsedPhone.countryPrefix || countries[0]?.prefix || "";
    accountUser.birthday = "";

    $: accountUser.phone = `${countryPrefix || ""}${phoneNumber || ""}`;


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
        <p>Fecha de nacimiento <span class="required">*</span></p>
        <input class="ipt" type="text" bind:value={accountUser.email} disabled>
        <input class="ipt" type="date" bind:value={accountUser.birthday}>

        <p>Telefono <span class="required">*</span></p>
        <p>Tipo de documento</p>
        <div class="userdata__phone">
            <DropdowPrefix {countries} bind:country={countryPrefix} />
            <input class="ipt" type="text" bind:value={phoneNumber}>
        </div>
        <select class="slc" bind:value={selectDoctype} on:change={changeDoctype}>
            {#each doctypes as doctype}
                <option value={doctype}>{doctype}</option>
            {/each}
            {#if doctypes.length === 0}
                <option value="CI">CI</option>
            {/if}
        </select>

        <p>Numero de documento <span class="required">*</span></p>
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

<style>
    .userdata__phone {
        display: grid;
        grid-template-columns: 6.2rem 1fr;
    }

    .userdata__phone :global(.slc) {
        border-radius: 0.25rem 0 0 0.25rem;
        padding-right: 0.25rem;
        background-color: #e9e9e9;
    }

    .userdata__phone .ipt {
        border-radius: 0 0.25rem 0.25rem 0;
        padding-left: 0.25rem;
    }
</style>
