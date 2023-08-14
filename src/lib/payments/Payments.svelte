<script>
    import ServerConnection from "../../js/server";
    import "../../styles/app.scss";

    export let user;
    export let onError;

    let url_global = "https://d2zzz5z45zl95g.cloudfront.net/generic_imgs";

    let bankPayments = [];
    let gatewayPayments = [];
    let typePayment;
    let amountDeposit;
    let paymentLink;
    let iframeGateway;

    let makePayment;
    let dataPayment = {}

    let loadDeposit = false;

    let activePayment = null;

    getPayMethods();

    async function getPayMethods() {
        try {
            loadDeposit = true;
            const {data}=await ServerConnection.wallet.getPayMethods(user.token);
            //bankPayments = data.filter((e) => e.virtual == 0);
            gatewayPayments = data.filter((e) => e.virtual == 1);
            //if (bankPayments.length > 0) typePayment = 'bank';
            ////if (bankPayments.length > 0) typePayment = 'gateway';
            //else if (gatewayPayments.length > 0) typePayment = 'gateway';
            //else if (gatewayPayments.length > 0) typePayment = 'gateway';
            typePayment = 'gateway';
            console.log(data);
            loadDeposit = false;
		} catch (error) {
            console.log(error);
            if(user == null) error = "Sesión expirada!, cerrando sesión";//y hacer logout
            else error = "Error desconocido, contacte con soporte";
			onError(error);
            loadDeposit = false;
		}
    }
   async function validateDeposit(amountMin, amountMax,currency,cta){
        if (amountDeposit < amountMin) return onError("El monto de depósito mínimo es "+amountMin+" "+ currency);
        else if(amountDeposit > amountMax) return onError("El monto de depósito máximo es "+amountMax+" "+ currency);
        else{
            if (typePayment === 'gateway') {
                try {
                    paymentLink = await ServerConnection.wallet.getPayLink(user.token,amountDeposit,cta);
                    iframeGateway = paymentLink.data.link;
                    amountDeposit = '';
                } catch (error) {
                    alert("Error inesperado, comunicate con soporte")
                }
            } else {
                console.log("deposito bancario, por realizas peticion aun");
            }
        }
    }
    const openGateway = (typePayment) => {
        //dataPayment = {amounts:[5000,10000,30000,50000]};
        dataPayment = typePayment;
        activePayment = dataPayment.id;
        makePayment=true;
        console.log(dataPayment);
    }
</script>

<div class="modal-body">
    
        {#if loadDeposit}
            <div class="loading"><p></p><p></p><p></p></div>
            {:else}
            <b>Elige tu método de pago favorito:</b> 
            <div class="deposit__types">
                {#each gatewayPayments as payment}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div class="deposit__type"  on:click={() => openGateway(payment)}>
                        <div class="deposit__check {payment.id === activePayment ? 'active' : ''}"></div>
                        <div>Pagar con {payment.cta}</div>
                        <img src="{url_global}/payments/{payment.cta}.png" alt="gateway-{payment.cta}">
                    </div>
                {/each}
            </div>
            {#if makePayment}
                <div class="deposit__gateway">
                    <div>Monto a depositar en moneda <b>{dataPayment.iso}</b> :</div>
                    <div class="deposit__mounts"> <!--ESTO debe ser un foreach!!!!! -->
                        <button class="btn mount" on:click={()=> amountDeposit = 5000}> 5000</button>
                        <button class="btn mount" on:click={()=> amountDeposit = 10000}> 10000</button>
                        <button class="btn mount" on:click={()=> amountDeposit = 30000}> 30000</button>
                        <button class="btn mount" on:click={()=> amountDeposit = 50000}> 50000</button>
                    </div>
                    <div class="deposit__ipt">
                        <b>{dataPayment.iso}</b>
                        <input type="number" class="ipt" bind:value={amountDeposit}>
                        <!--ESTO debe REFACTORIZAR para banko y pasarela!!!!! -->
                        <button class="btn deposit" on:click={validateDeposit(dataPayment.min,dataPayment.max,dataPayment.iso,dataPayment.cta)} disabled={amountDeposit==undefined||amountDeposit<1}>Depositar</button>
                    </div>
                    <div class="deposit__limits">
                        <b>Mínimo</b>
                        <span>{dataPayment.min} {dataPayment.iso}</span>
                        <span>/</span>
                        <b>Máximo</b>
                        <span>{dataPayment.max} {dataPayment.iso}</span>
                    </div>
                </div>
            {/if}
        {/if}
           



</div>

<style>
    .dd1{
        display: flex;
    }
</style>