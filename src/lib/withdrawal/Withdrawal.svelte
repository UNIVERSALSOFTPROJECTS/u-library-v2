<script>
    import ServerConnection from "../../js/server";

    export let user;
    export let onError;
    export let onOk;

    const justNumbersValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\d]/g, "") };

    nameeddd();
    async function nameeddd() {
        const {data} = await ServerConnection.wallet.checkPreviewWithdrawal(user.token)
        console.log(data);
    }
</script>
<div class="modal-body">
    <div>Ingrese el monto a retirar</div>
    <input type="number" class="ipt" on:input={justNumbersValidate}>
    <p>Saldo disponible: 8000 PEN</p>

    <p>Retiro mínimo de 50 PEN y maximo de 2000 PEN</p>

    <div>
        <p>Nombre completo:</p>
        <input type="text" class="ipt">
        <p>Documento de identidad:</p>
        <input type="number" class="ipt" on:input={justNumbersValidate}>
        <p>Nombre de banco:</p>
        <input type="text" class="ipt">
        <p>Nro de cuenta:</p>
        <input type="text" class="ipt">
        <p>Información adicional:</p>
        <input type="text" class="ipt">
    </div>

    <div>
        <p>Horario de retiro:</p> 
        <p>Lunes a Viernes de 9:00 am a 5:00 pm</p>
    </div>
    <p> Al solicitar su retiro usted esta aceptando los términos y condiciones</p>

    <button class="btn singup">Solicitar retiro</button>
</div>