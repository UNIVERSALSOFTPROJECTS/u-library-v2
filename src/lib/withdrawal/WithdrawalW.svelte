<script>
    import { useReducer } from "react";
    import ServerConnection from "../../js/server";
    import moment from "moment";

    export let user;
    export let configWithdrawal;
    export let onError;
    export let onOk;
    export let openTermsConditions;
    export let t;

    let pendingWithdrawal;
    let amount;
    let loadWithdrawal = true;
    let infoUser = {};
    let infoAccount = {
        adicional:"",
        numero_cta:"",
        banco:""
    };

    const justTextValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\p{L}\s]/gu, "") }
    const justNumbersAccountValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\d-]/g, "") };
    const justNumbersValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\d]/g, "") };

    checkWithdrawal();

    const updateBalance = async() => {
        let updateBalance = await ServerConnection.users.getBalance(user.agregatorToken);
        user.balance = updateBalance.data.balance;
    }

    async function checkWithdrawal() {
        loadWithdrawal = true;
        try {
            const {data} = await ServerConnection.wallet.accountNumber(user.token);
            infoAccount = data.cuenta == null?infoAccount:data.cuenta[0];
            infoUser = data.data[0];
            pendingWithdrawal = infoUser.bloqueo_fondos?true:false;
            loadWithdrawal = false;
        } catch (error) {
            onError(t("msg.contactSupport"));//falta detectar los errores
            console.log(error);
        }
    }

    async function validateWithdrawal() {
        if(amount == 0 || amount == undefined) return onError("Ingrese un monto a retirar");
        if(amount < infoUser.retiro_min) return onError("El retiro mínimo es "+infoUser.retiro_min+" "+user.currency);
        if(amount > infoUser.retiro_max) return onError("El retiro maximo es "+infoUser.retiro_max+" "+user.currency);
        if(amount > user.balance) return onError("No tienes saldo suficiente");
        let info = infoAccount.adicional;
        let account = infoAccount.numero_cta;
        let bank = infoAccount.banco;
        if(!infoUser.documento || !info || !account || !bank) return onError("Todos los campos son obligatorios");
        try {
            let data = await ServerConnection.wallet.withdrawal_w(user.token,amount,bank,account,info, infoUser.documento);
            updateBalance();
            checkWithdrawal();
            console.log(data);
        } catch (error) {
             onError(t("msg.contactSupport"));//falta detectar los errores
            console.log(error);
        }
    }
</script>
<div class="modal-body">
    {#if loadWithdrawal}
        <div class="loading"><p></p><p></p><p></p></div>
    {:else}
        {#if pendingWithdrawal}
           <p>Usted cuenta actualmente con una solicitud de retiro de :</p>
           <p class="withdrawal__pending">{infoUser.bloqueo_fondos} {user.currency}</p>
           <p>Si desea saber en que estado se encuentra su solicitud de retiro, puede comunicarse con nuestro centro de atención al cliente</p>
        {:else}
            <div class="withdrawal__amount">
                <b>{user.currency}</b>
                <input type="number" class="ipt" min="0" placeholder="Ingrese el monto aquí" bind:value={amount}>
            </div>
            <p>Saldo disponible: {user.balance} {user.currency}</p>
            <p>Retiro mínimo de {infoUser.retiro_min || 0} {user.currency} y maximo de {infoUser.retiro_max || 0} {user.currency}</p>
            <div class="withdrawal__info">
                <p>Nombre completo:</p>
                <p>Documento de identidad:</p>
                <input type="text" class="ipt" bind:value={infoUser.nombre} disabled>
                <input type="text" inputmode="numeric" class="ipt" bind:value={infoUser.documento} on:input={justNumbersValidate}>
                <p>Nombre de banco:</p>
                <p>Nro de cuenta:</p>

                {#if configWithdrawal.dataType != "static"}
                    <input type="text" class="ipt" bind:value={infoAccount.banco} on:input={justTextValidate}>
                {:else}
                    <select class="slc" bind:value={infoAccount.banco}>
                        <option value="" disabled>Selecciona tu banco</option>
                        {#each configWithdrawal.banksNames as banks}
                            <option value={banks.id}>{banks.name}</option>
                        {/each}
                    </select>
                {/if}

                <input type="text" inputmode="numeric" class="ipt" bind:value={infoAccount.numero_cta} on:input={justNumbersAccountValidate}>
                <p>Información adicional:</p>
                <p></p>

                {#if configWithdrawal.dataType != "static"}
                    <input type="text" class="ipt" bind:value={infoAccount.adicional}>
                {:else}
                    <select class="slc" bind:value={infoAccount.adicional}>
                        <option value="" disabled>Selecciona tu tipo de cuenta</option>
                        {#each configWithdrawal.typeAccount as account}
                            <option value={account.id}>{account.name}</option>
                        {/each}
                    </select>
                {/if}

                
            </div>
            <p><b>Horario de retiro:</b> {infoUser.horarios || ''}</p>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={openTermsConditions}>{@html t("withdrawal.termsConditions")}</div>
            <button class="btn withdrawal" on:click={validateWithdrawal}>Solicitar retiro</button>
        {/if}
    {/if}
</div>