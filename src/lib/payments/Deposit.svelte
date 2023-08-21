<script>
    import ServerConnection from "../../js/server";

    export let user;
    export let onError;
    export let amountsFav;

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
    let activePayment;
    //DEBIDO A QUE ALGUNAS PASARELAS NO CUENTAN CON UN TAMAÑO COMPLETO DE IFRAME Y ESTO NO SE PUEDE CONTROLAR SE AGREGARA ESTA VARAIBLE
    let sizeGateway = '';

    getPayMethods();

    async function getPayMethods() {
        try {
            loadDeposit = true;
            const {data}=await ServerConnection.wallet.getPayMethods(user.token);
            bankPayments = data.filter((e) => e.virtual == 0);
            gatewayPayments = data.filter((e) => e.virtual == 1);
            //if (bankPayments.length > 0) typePayment = 'bank';
            ////if (bankPayments.length > 0) typePayment = 'gateway';
            //else if (gatewayPayments.length > 0) typePayment = 'gateway';
            //else if (gatewayPayments.length > 0) typePayment = 'gateway';
            //typePayment = 'gateway';
            console.log(data);
            loadDeposit = false;
		} catch (error) {
            console.log(error);
            if(user == null) error = "Sesión expirada!, cerrando sesión";//y hacer logout
            else error = "Ocurrio un error, contactese con soporte";
			onError(error);
            loadDeposit = false;
		}
    }
   async function validateDeposit(amountMin, amountMax,currency,cta){
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
                }
            } else {
                console.log("deposito bancario, por realizas peticion aun");
            }
        }
    }

    const openGateway = (typePayment,typeGateway,id) => {
        dataPayment = typePayment;
        activePayment = dataPayment.id
   
        console.log(activePayment);
        if (activePayment === id) {
      activePayment = null;
      console.log(activePayment);
    } else {
      activePayment = activePayment;
      console.log(activePayment);
    }

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
                <div class="deposit__types {activePayment?'selected':''}">
                    {#each bankPayments as bank}
                       <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="deposit__type {bank.id === activePayment ? 'show' : ''}"  on:click={() => openGateway(bank,'bank',bank.id)}   >
                            <img src="{url_global}/payments/{bank.banco}.png" alt="gateway-{bank.banco}">
                            <div>
                                <b>{bank.banco}</b>
                                <div class="deposit__limits">{bank.min} {bank.iso} - {bank.max} {bank.iso}</div>
                            </div>
                            <div class="deposit__arrow"></div>
                        </div>
                    {/each}
                    {#each gatewayPayments as payment}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="deposit__type"  on:click={() => openGateway(payment,'gateway',payment.id)}>
                            <img src="{url_global}/payments/{payment.cta}.png" alt="gateway-{payment.cta}">
                            <div>
                                <b>{payment.nombre}</b>
                                <div class="deposit__limits">{payment.min} {payment.iso} - {payment.max} {payment.iso}</div>
                            </div>
                            <div class="deposit__arrow {payment.id === activePayment ? 'show' : ''}"></div>
                        </div>
                    {/each}
                </div>
                {#if makePayment}
                  
                    {#if makePayment == 'bank'}

                            <div>Paso 1: Realiza un depósito a la siguiente cuenta.</div>
                            <div class="deposit__step1">
                                <b>Titular: </b>
                                <p>DEVIN Y ASOCIADOS SAC</p>
                                <!--p>{dataPayment.nombre}</p-->
                          
                                <b>Nro de Cuenta: </b>
                                <p>009-3001039543</p>
                                <!--p>{dataPayment.cta}</p-->
                           
                                <b>CCI: </b>
                                <p>003-009-003001039543-89</p>
                                <!--p>{dataPayment.cta}</p-->
                            </div>
                   
                            <div>Paso 2: Llena la información del depósito realizado.</div>
                        <div class="deposit__info">
                            
                                <p>Banco receptor</p>
                                <p>Banco emisor</p>
                                <input type="text" class="ipt" value={dataPayment.banco} disabled>
                            
                                <select class="slc">
                                    <option selected disabled>Seleccionar banco</option>
                                    {#each bankPayments as bank}
                                        <option value={bank.banco}>{bank.banco}</option>
                                    {/each}  
                                </select>
                            
                                <p>Nro. de referencia</p>
                                <p>Nro. de cuenta</p>
                                <input type="text" class="ipt">
                            
                                <input type="number" class="ipt">
                           
                        </div>

                        
                    {/if}
                    <div>Detalles:</div>
                    <div class="deposit__step1">
                        <span>Tipo de transferencia:</span><span>{makePayment == 'bank'?'Directa':'Pasarela de pago'}</span>
                        <span>Tiempo de procesamiento:</span><span>{makePayment == 'bank'?'Semi-automático':'Automático'}</span>
                    </div>
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

</div>
