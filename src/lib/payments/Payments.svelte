<script>
    import ServerConnection from "../../js/server";
<<<<<<< HEAD
    import "../../styles/app.scss";

    export let user;
    export let onError;
=======

    export let user;
    export let onError;
    export let amountsFav;
>>>>>>> a2dc001 (modal de depoosito listo)

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
<<<<<<< HEAD

    let activePayment = null;
=======
    let activePayment;
    //DEBIDO A QUE ALGUNAS PASARELAS NO CUENTAN CON UN TAMAÑO COMPLETO DE IFRAME Y ESTO NO SE PUEDE CONTROLAR SE AGREGARA ESTA VARAIBLE
    let sizeGateway = '';
>>>>>>> a2dc001 (modal de depoosito listo)

    getPayMethods();

    async function getPayMethods() {
        try {
            loadDeposit = true;
            const {data}=await ServerConnection.wallet.getPayMethods(user.token);
<<<<<<< HEAD
            //bankPayments = data.filter((e) => e.virtual == 0);
=======
            bankPayments = data.filter((e) => e.virtual == 0);
>>>>>>> a2dc001 (modal de depoosito listo)
            gatewayPayments = data.filter((e) => e.virtual == 1);
            //if (bankPayments.length > 0) typePayment = 'bank';
            ////if (bankPayments.length > 0) typePayment = 'gateway';
            //else if (gatewayPayments.length > 0) typePayment = 'gateway';
            //else if (gatewayPayments.length > 0) typePayment = 'gateway';
<<<<<<< HEAD
            typePayment = 'gateway';
=======
            //typePayment = 'gateway';
>>>>>>> a2dc001 (modal de depoosito listo)
            console.log(data);
            loadDeposit = false;
		} catch (error) {
            console.log(error);
            if(user == null) error = "Sesión expirada!, cerrando sesión";//y hacer logout
<<<<<<< HEAD
            else error = "Error desconocido, contacte con soporte";
=======
            else error = "Ocurrio un error, contactese con soporte";
>>>>>>> a2dc001 (modal de depoosito listo)
			onError(error);
            loadDeposit = false;
		}
    }
   async function validateDeposit(amountMin, amountMax,currency,cta){
<<<<<<< HEAD
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
=======
        if (amountDeposit < amountMin) return onError("El monto mínimo de depósito es "+amountMin+" "+ currency);
        else if(amountDeposit > amountMax) return onError("El monto máximo de depósito es "+amountMax+" "+ currency);
        else{
            if (typePayment === 'gateway') {
                try {
                    loadDeposit = true;
                    paymentLink = await ServerConnection.wallet.getPayLink(user.token,amountDeposit,cta);
                    iframeGateway = paymentLink.data.link;
                    //actualmente solo izypay presenta tal problema
                    sizeGateway = iframeGateway.includes("izypay")?"small":"";
                    amountDeposit = '';
                    loadDeposit = false;
                } catch (error) {
                    onError("Ocurrio un error, contactese con soporte");
                    loadDeposit = false;
>>>>>>> a2dc001 (modal de depoosito listo)
                }
            } else {
                console.log("deposito bancario, por realizas peticion aun");
            }
        }
    }
<<<<<<< HEAD
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
           


=======

    const openGateway = (typePayment,typeGateway) => {
        dataPayment = typePayment;
        activePayment = dataPayment.id
   

        console.log(typePayment,typeGateway);
        makePayment = typeGateway
        console.log(makePayment);
    }
    console.log(activePayment);

</script>

<div class="modal-body {iframeGateway ? 'iframe' : ''} {sizeGateway}">
    {#if loadDeposit}
            <div class="loading"><p></p><p></p><p></p></div>
        {:else}
            {#if !iframeGateway}
                <b>Elige tu método de pago favorito:</b> 
                <div class="deposit__types">
                    {#each bankPayments as bank}
                       <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="deposit__type"  on:click={() => openGateway(bank,'bank')}>
                            <div class="deposit__check {bank.id === activePayment ? 'active' : ''}"></div>
                            <div class="deposit__limits">
                              
                                <span>{bank.min} {bank.iso}</span>
                                <span>-</span>
                               
                                <span>{bank.max} {bank.iso}</span>
                            </div>
                            <img src="{url_global}/payments/{bank.banco}.png" alt="gateway-{bank.banco}">
                        </div>
                    {/each}
                    {#each gatewayPayments as payment}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="deposit__type"  on:click={() => openGateway(payment,'gateway')}>
                            <div class="deposit__check {payment.id === activePayment ? 'active' : ''}"></div>
                            <div>Pagar con {payment.cta}</div>
                            <img src="{url_global}/payments/{payment.cta}.png" alt="gateway-{payment.cta}">
                        </div>
                    {/each}
                </div>
                {#if makePayment}
                    <div class="tst1">
                        <span>Tipo de transferencia:</span><span>{makePayment == 'bank'?'Directa':'Pasarela de pago'}</span>
                        <span>Tiempo de procesamiento:</span><span>{makePayment == 'bank'?'Semi-automático':'Automático'}</span>
                    </div>
                    {#if makePayment == 'bank'}


                    <div>
                            
                            <div class="deposit__info">
                                <b>Titular: </b>
                                <span>DEVIN Y ASOCIADOS SAC</span>
                                <!--span>{dataPayment.nombre}</span-->
                          
                                <b>Nro de Cuenta: </b>
                                <span>009-3001039543</span>
                                <!--span>{dataPayment.cta}</span-->
                           
                                <b>CCI: </b>
                                <span>003-009-003001039543-89</span>
                                <!--span>{dataPayment.cta}</span-->
                            </div>
                    </div>

                        <div class="deposit__info">
                            <div>
                                <div>Banco receptor</div>
                                <input type="text" class="ipt" value={dataPayment.banco} disabled>
                            </div>
                            <div>
                                <div>Banco emisor</div>
                                <select class="slc">
                                    <option selected disabled>Seleccionar banco</option>
                                    {#each bankPayments as bank}
                                        <option value={bank.banco}>{bank.banco}</option>
                                    {/each}  
                                </select>
                            </div>
                            <div>
                                <div>Nro. de referencia</div>
                                <input type="text" class="ipt">
                            </div>
                            <div>
                                <div>Nro. de cuenta</div>
                                <input type="text" class="ipt">
                            </div>
                        </div>

                        
                    {/if}

                    <div class="deposit__gateway">
                        
                        <div class="deposit__mounts">
                            {#each amountsFav as amount}
                                <button class="btn mount" on:click={()=> amountDeposit = amount}> {amount}</button>
                            {/each}  
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
                    
                    {:else}
                    <div></div>
                {/if}
            {:else}
                <button class="btn return" on:click={()=>iframeGateway = ''}></button>
                <!-- svelte-ignore a11y-missing-attribute -->
                <iframe class="" src="{iframeGateway}" frameborder="0"></iframe>
            {/if}
    {/if}
>>>>>>> a2dc001 (modal de depoosito listo)

</div>

<style>
<<<<<<< HEAD
    .dd1{
        display: flex;
=======
    .tst1{
        padding: 0.5rem;
    border: 1px solid #fff;
    border-radius: 0.25rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
>>>>>>> a2dc001 (modal de depoosito listo)
    }
</style>