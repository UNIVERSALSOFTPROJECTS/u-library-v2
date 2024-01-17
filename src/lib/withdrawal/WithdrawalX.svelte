<script>
    import ServerConnection from "../../js/server";
    import moment from "moment";
    import { onMount } from "svelte";

    export let user;
    export let onOk;
    export let onError;
    export let openTermsConditions;
    export let t;

    let pendingWithdrawal;
    let amount;
    let loadWithdrawal = true;
    let isCopied = false;

    const getPendingWithdrawal = async () => {
       try {
        let resp = await ServerConnection.wallet.checkPreviewWithdrawal(user.token);
        if(resp.data.monto) pendingWithdrawal = resp.data; // si tiene monto quiere decir que tiene un retiro pendiente
        loadWithdrawal = false;
       } catch (error) {
            onError(t("msg.contactSupport"));//falta detectar los errores
            console.log(error);
       }
    };

    const justNumbersValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\d]/g, "") }

    const updateBalance = async() => {
        let data = JSON.parse(sessionStorage.getItem("user"));
        let updateBalance = await ServerConnection.users.getBalance(data.agregatorToken);
        const { balance, bonus_global, bonus_horses, bonus_slot, bonus_sportbook } = updateBalance.data;
        data.balance         = balance;
        data.bonus_global    = bonus_global;
        data.bonus_horses    = bonus_horses;
        data.bonus_slot      = bonus_slot;
        data.bonus_sportbook = bonus_sportbook;
        data.bonus_sumTotal  = bonus_global + bonus_horses + bonus_slot + bonus_sportbook;
        sessionStorage.setItem("user", JSON.stringify(data));
        user = data;
    }
 
    async function validateWithdrawal() {
        if (amount === 0 || amount === "" || amount === undefined) return onError(t("withdrawal.amount0"));
        if (user.balance < amount) return onError(t("withdrawal.lowBalance"));
        try {
            let data = await ServerConnection.wallet.retailWithdrawal(user.token, amount);
            pendingWithdrawal = data;
            loadWithdrawal = true;
            getPendingWithdrawal();
            updateBalance();
        } catch (error) {
            //error.data.message = "SALDO_INSUFICIENTE"
            onError(t("msg.contactSupport"));//falta detectar los errores
            console.log(error);
        }
    }

    const copyCodeWhitdrawal = () => {
        isCopied = true;
        setTimeout(() => { isCopied = false }, 2000);
        let finalMessage = t("withdrawal.copyCode",{user: user.username, id: user.id, code: pendingWithdrawal.codigo});
        navigator.clipboard.writeText(finalMessage);
    };

    onMount(()=>{ getPendingWithdrawal(); })
</script>

<div class="modal-body">
    {#if loadWithdrawal}
        <div class="loading"><p></p><p></p><p></p></div>
        {:else}
        {#if pendingWithdrawal && pendingWithdrawal.monto>0}
            <b>{t("withdrawal.generalData")}</b>
            <div class="withdrawal__info">
                <b>{t("withdrawal.user")}</b>
                <p> {user.username}</p>
                <b>{t("withdrawal.id")}</b>
                <p> {user.id}</p>   
                <b>{t("withdrawal.dateHour")}</b>
                <p> {moment.unix(pendingWithdrawal.efecha).format("DD/MM/YYYY")} - {moment.unix(pendingWithdrawal.efecha).format("HH:mm")}</p>   
            </div>
            <div class="withdrawal__info--main">
                <b>{t("withdrawal.code")}</b>
                <p>{pendingWithdrawal.codigo}</p>
                <b>{t("withdrawal.amount")}</b>
                <p>{pendingWithdrawal.monto} {user.currency}</p>
                <button class="btn withdrawal__copy" on:click={copyCodeWhitdrawal}>
                    {#if isCopied}
                    <div class="withdrawal__copied">{t("withdrawal.copied")}</div>
                    {/if}
                </button>
            </div>
            {@html t("withdrawal.info")}
        {:else}
            <p>{t("withdrawal.withdraw")}</p>
            <div class="withdrawal__amount">
                <input type="number" min="1" class="ipt" bind:value={amount} on:input={justNumbersValidate} placeholder={t("withdrawal.amount0")}>
                <b>{user.currency}</b>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={openTermsConditions}>{@html t("withdrawal.termsConditions")}</div>
            <button class="btn deposit" on:click={validateWithdrawal}>{t("withdrawal.request")}</button>
        {/if}
    {/if}
</div>