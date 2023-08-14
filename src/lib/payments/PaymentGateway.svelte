<script>
    import ServerConnection from "../../js/server";
    import "../../styles/app.scss";

    let url_global = "https://d2zzz5z45zl95g.cloudfront.net/generic_imgs";

    let TokenPayments = 'c352ba50396dcc8c399273c134599a57f598c31773ff2982ca86be5c66a4e887';
    let user = {"token":TokenPayments}
    let bankPayments = [];
    let gatewayPayments = [];
    let typePayment;
    let amountDeposit;
    let paymentLink;
    let iframeGateway;

    let arr2 = {"token":'123'}

    let x = {...arr2}



    async function getPayMethods() {
        try {
            const {data}=await ServerConnection.wallet.getPayMethods(TokenPayments);
            bankPayments = data.filter((e) => e.virtual == 0);
            gatewayPayments = data.filter((e) => e.virtual == 1);
            //if (bankPayments.length > 0) typePayment = 'bank';
            if (bankPayments.length > 0) typePayment = 'gateway';
            else if (gatewayPayments.length > 0) typePayment = 'gateway';
            console.log(data);
		} catch (error) {
            console.log(error);
			alert(error);
		}
    }
   async function validateDeposit(amountMin, amountMax,currency,cta){
        if (amountDeposit < amountMin) alert("el monto de depósito minimo es "+amountMin+" "+ currency);
        else if(amountDeposit > amountMax) alert("el monto de depósito máximo es "+amountMax+" "+ currency);
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
</script>
<button class="btn" on:click={getPayMethods}>Mostar métodos de Pago</button>

<div class="modal-body">

    {#if typePayment == 'gateway'}
        {#if !iframeGateway}
            {#each gatewayPayments as payment}
                <div class="deposit__gateway">
                    <img src="{url_global}/payments/{payment.cta}.png" alt="">
                    <div>
                    <div class="deposit__gateway--deposit">
                            <div>Monto a depositar :</div>
                            <div class="deposit__mounts"> <!--ESTO debe ser un foreach!!!!! -->
                                <button class="btn mount" on:click={()=> amountDeposit = 50}>{payment.iso} 50</button>
                                <button class="btn mount" on:click={()=> amountDeposit = 100}>{payment.iso} 100</button>
                                <button class="btn mount" on:click={()=> amountDeposit = 300}>{payment.iso} 300</button>
                                <button class="btn mount" on:click={()=> amountDeposit = 500}>{payment.iso} 500</button>
                            </div>
                            <div class="deposit__ipt">
                                <b>{payment.iso}</b>
                                <input type="number" class="ipt" bind:value={amountDeposit}>
                                <!--ESTO debe REFACTORIZAR para banko y pasarela!!!!! -->
                                <button class="btn deposit" on:click={validateDeposit(payment.min,payment.max,payment.iso,payment.cta)} disabled={amountDeposit==undefined||amountDeposit<1}>Depositar</button>
                            </div>
                            <div class="deposit__limits">
                                <b>Mínimo</b>
                                <span>{payment.min} {payment.iso}</span>
                                <span>/</span>
                                <b>Máximo</b>
                                <span>{payment.max} {payment.iso}</span>
                        </div>
                    </div>
                    </div>
                </div>
            {/each}
        {:else}
            <button class="btn return" on:click={()=>iframeGateway =''}>Volver</button>
            <!-- svelte-ignore a11y-missing-attribute  SOLO APRA P'ASAERLA-->
            <iframe class="" src="{iframeGateway}" style="height: 22rem;" frameborder="0"></iframe>
        {/if}
    {/if}

</div>