<script>
    import ServerConnection from "../../js/server";
    import moment from "moment";
    import { onMount } from "svelte";

    export let user;
    export let onOk;
    export let onError;


    let pendingWithdrawal;
    let amount;
    let loadWithdrawal = true;

    const getPendingWithdrawal = async () => {
        let resp = await ServerConnection.wallet.checkPreviewWithdrawal(user.token);
        if(resp.data.monto) pendingWithdrawal = resp.data; // si tiene monto quiere decir que tiene un retiro pendiente
        loadWithdrawal = false;
    };

    const justNumbersValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\d]/g, "") }
 
    async function validateWithdrawal() {
        let data = await ServerConnection.wallet.retailWithdrawal(user.token, amount);
        pendingWithdrawal = data;
        console.log(data);
    }

    const copyCodeWhitdrawall = () => {
        const copyUser = "Usuario: " + user.username + ", ";
        const copyId = "Id: " + user.code + ", ";
        const copyCode = "Codigo Retiro: " + pendingWithdrawal.codigo;
        const finalMessage = copyUser + copyId + copyCode;
        navigator.clipboard.writeText(finalMessage);
    };

    onMount(()=>{
        getPendingWithdrawal();
    })
</script>

<div class="modal-body">
    {#if loadWithdrawal}
        <div class="loading"><p></p><p></p><p></p></div>
        {:else}
        {#if pendingWithdrawal && pendingWithdrawal.monto>0}
            <b>Datos generales:</b>
            <div class="withdrawal__info">
                <b>Usuario:</b>
                <p> {user.username}</p>
                <b>ID:</b>
                <p> {user.id}</p>   
                <b>Fecha y hora:</b>
                <p> {moment.unix(pendingWithdrawal.efecha).format("DD/MM/YYYY")} - {moment.unix(pendingWithdrawal.efecha).format("HH:mm")}</p>   
            </div>
            <div class="withdrawal__info">
                <div>
                    <b>Código:</b>
                    <p>{pendingWithdrawal.codigo}</p>
                </div>
                <div>
                    <b>Monto:</b>
                    <p>{pendingWithdrawal.monto}</p>
                    <button title="Copiar Código" class="btn withdrawal__copy" on:click={copyCodeWhitdrawall}></button>
                </div>
            </div>
            <p>Acercate a nuestras sucursales, para proceder con el retiro.</p>
            <p>Nota: No es necesario imprimir este ticket, solo debe identificar su usuario junto con el código de referencia</p>
        {:else}
        
            <p>Ingrese el monto a retirar</p>
            <input type="number" min="1" class="ipt" bind:value={amount} on:input={justNumbersValidate} placeholder="Ingrese un monto">
            <p>Al solicitar su retiro usted esta aceptando los <b><a class="link" href="#">Términos y Condiciones</a></b></p>
            <button class="btn deposit" on:click={validateWithdrawal}>Solicitar retiro</button>
    
        {/if}
    {/if}
</div>