<script>
    import { onMount } from "svelte";

    export let ServerConnection;
    export let accountUser;
    export let t;
    export let onError;
    export let onOk;
    export let configProfile;
    export let getMyAccount;

    let loadUserData;
    let doctypes = configProfile.doctype;
    let exampleDoctype;
    let selectDoctype;
    let isDataComplete =  accountUser.dataComplete;
    
    const avoidSubmit = (e) =>{ e.preventDefault(); }

    const saveMyAccount = async()  =>{
        if(!isDataComplete) return onError(t("msg.allObligatory"));
        try {
            loadUserData = true;
            accountUser.doctype = selectDoctype;
            await ServerConnection.users.saveMyAccount(accountUser);
            isDataComplete = true;
            onOk(t("msg.saveData"));
            getMyAccount();
        } catch (error) {
            console.log(error); 
            onError(t("msg.contactSupport"));
        } finally{
            loadUserData = false;
        }                                                                                        
    }
    const changeDoctype = () =>{
        if (selectDoctype == "RUT") exampleDoctype = "Ejemplo: 15.363.225-1";
        else if(selectDoctype == "DNI") exampleDoctype = "Ejemplo: 47087611";
        else exampleDoctype = "";
    }

    onMount(async() => {
        if (accountUser.isViewWeb && !isDataComplete) {
            selectDoctype = doctypes[0];
            changeDoctype();
        }
    });

</script>
<div class="userdata">
    <b>{t("profile.personalData")}</b>
    <form class="userdata__form" on:submit={avoidSubmit}>
        <p>{t("profile.username")}</p>
        <p>{t("profile.nameLastname")}</p>
        <input class="ipt" type="text" bind:value={accountUser.username} disabled>
        <input class="ipt" type="text" bind:value={accountUser.name} disabled>
        <p>{t("profile.email")}</p>
        <p>{t("profile.birthday")}</p>
        <input class="ipt" type="text" bind:value={accountUser.email} disabled>
        <input class="ipt" type="text" bind:value={accountUser.birthday} disabled>
        <p>{t("profile.phone")}</p>
        {#if !accountUser.isViewWeb}<p></p>{:else}<p>{t("profile.typeDoc")}</p>{/if}
        <input class="ipt" type="text" bind:value={accountUser.phone} disabled>
        {#if accountUser.isViewWeb}
            {#if accountUser.doctype}
            <input class="ipt" type="text" bind:value={accountUser.doctype} disabled>
            {:else}
            <select class="slc" bind:value={selectDoctype} on:change={changeDoctype}>
                {#each doctypes as doctype}
                    <option value={doctype}>{doctype}</option>
                {/each}
            </select>
            {/if}
            <p>{t("profile.numberDoc")}</p>
            <p>{t("profile.address")}</p>
            <input class="ipt" type="text" placeholder={exampleDoctype} bind:value={accountUser.document} disabled={isDataComplete}>
            <input class="ipt" type="text" bind:value={accountUser.address} disabled={isDataComplete}>
            <p>{t("profile.city")}</p>
            <div></div>
            <input class="ipt" type="text" bind:value={accountUser.city} disabled={isDataComplete}>
            <div></div>
            {/if}
        </form>
        {#if !isDataComplete && accountUser.isViewWeb}
            <button class="btn save" on:click={saveMyAccount} disabled={loadUserData}>
                {#if loadUserData}
                    <div class="loading"><p></p><p></p><p></p></div>
                {:else}
                    {t("profile.save")}
                {/if}
            </button>
        {/if}
</div>