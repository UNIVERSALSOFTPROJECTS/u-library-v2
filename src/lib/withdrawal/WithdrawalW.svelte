<script>
    import { useReducer } from "react";
    import ServerConnection from "../../js/server";
    import moment from "moment";

    export let user;
    export let onError;
    export let onOk;

    let amount;
    let infoAccount = {};
    let infoUser = {};

    const justNumbersValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\d]/g, "") };

    checkWithdrawal();

    async function checkWithdrawal() {
        const {data} = await ServerConnection.wallet.accountNumber(user.token);
        infoAccount = data.cuenta == null?'':data.cuenta[0];
        infoUser = data.data[0];

        //pendingWithdrawal = data.monto?true:false;
        //dataWithdrawal = data;
    }

    async function validateWithdrawal() {
        if(amount > user.balance){ console.log("No tienes saldo suficiente"); }
        let info = infoAccount.adicional;
        let account = infoAccount.numero_cta;
        let bank = infoAccount.banco;
        try {
            let data = await ServerConnection.wallet.withdrawal_w(user.token,amount,bank,account,info);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
</script>
<div class="modal-body">
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
        <input type="number" class="ipt" min="0" bind:value={infoUser.documento}>
        <p>Nombre de banco:</p>
        <p>Nro de cuenta:</p>
        <input type="text" class="ipt" bind:value={infoAccount.banco}>
        <input type="number" class="ipt" bind:value={infoAccount.numero_cta}>
        <p>Información adicional:</p>
        <p></p>
        <input type="text" class="ipt" bind:value={infoAccount.adicional}>
    </div>
    <p><b>Horario de retiro:</b> {infoUser.horarios || ''}</p>
    <p> Al solicitar su retiro usted esta aceptando los <b><a class="link" href="#">Términos y Condiciones</a></b></p>
    <button class="btn singup" on:click={validateWithdrawal}>Solicitar retiro</button>
</div>