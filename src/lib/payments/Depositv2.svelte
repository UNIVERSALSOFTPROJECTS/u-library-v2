<script>
    import ServerConnection from "../../js/server";

    export let user;
    export let onError;
    export let onOk;
    export let amountsFav;

    let url_global = "https://d2zzz5z45zl95g.cloudfront.net/generic_imgs";
    //Pasarelas pueden variar de tamaño
    let sizeIframeGateway = '';


    let bankPayments = [];
    let gatewayPayments = [];
    let amountDeposit;
    let typeTranference;


    let currentDate = new Date().toISOString().split('T')[0];

    let bankDeposit = {
        reference:"",
        amount:"",
        account:"",//este paramentro nunca se usa
        aditional:"",
        originBank:undefined,
        targetBankId:undefined,
        date:currentDate,
    };

  


    let paymentSelected;

    let step2bank = '';


    let paymentLink;
    let iframeGateway;

    let dataPayment = {}

    let activePayment;
    //Loadings
    let loadDeposit = false;
   

    getPayMethods();

    async function getPayMethods() {
        try {
            loadDeposit = true;
            const {data} = await ServerConnection.wallet.getPayMethods(user.token);
            bankPayments = data.filter((e) => e.virtual == 0);
            gatewayPayments = data.filter((e) => e.virtual == 1);
            loadDeposit = false;
		} catch (error) {
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
            if (typeTranference === 'gateway') {
                try {

                    loadDeposit = true;
                    paymentLink = await ServerConnection.wallet.getPayLink(user.token,amountDeposit,cta);
                    iframeGateway = paymentLink.data.link;
                    //actualmente solo izypay presenta este tamaño de ifrmae
                    sizeIframeGateway = iframeGateway.includes("izypay")?"small":"";
                    amountDeposit = '';
                    loadDeposit = false;
                } catch (error) {
                    onError("Ocurrio un error, contactese con soporte");
                    loadDeposit = false;
                }
            } else {
                step2bank = 'bank';
            }
        }
    }

    const openGateway = (typePayment,typeGateway) => {
        dataPayment = typePayment;
        activePayment = dataPayment.id
        typeTranference = typeGateway
        paymentSelected = true;
    }
    
    async function testdep() {
        if (bankDeposit.targetBankId == 0 || bankDeposit.aditional == '' || bankDeposit.reference == '') return onError("Todos los campos son obligatorios"); 
   
    
                    bankDeposit.originBank = dataPayment.id;
                    bankDeposit.amount = amountDeposit;

                    //console.log(bankDeposit);
                    // los inputs de number si tiene que ir , tengo que pasar los valore a to sting obligariamente

                    let {data} = await ServerConnection.wallet.bankDeposit(user.token,bankDeposit);

                    console.log(data);// SIEMPRE IMPRIME DATA Y DEVUELVE UN MENSAJE ME REPONDE CON 200 POR LO QUE NO PUEDO USAR UN TRY CATCH SJSJSJSSJSJ


                    if (data.msg === "DEPOSITO_OK") onOk("Depósito exitoso"); // AQUI TENGO QUE COLOCAR QUE EL MODAL SE CIERRA PS, PERO PRIMERO EVALUEA QUE LLEGE LA PÈTICION

                    // Y HAZ LA VALIDACION DE CAMPOS PARA QUE NO SEAN VACIOS AL IGUAL QUE AGREGAR EL TOSTRING();


                    else if (data.msg === "VARIOS_REGISTROS_DEPOSITOS")  onError("Depósito cancelado, tiene una solicitud pendiente");
                    else onError("Ocurrio un error, contactese con soporte");
                   
     
    }


    const justNumbersValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\d]/g, "") }
    //PODEMOS EVITAR ESCRIBIR DECIMALES Y YA, se termina esta vaina ps
</script>

<div class="modal-body {iframeGateway ? 'iframe' : ''} {sizeIframeGateway}">
    {#if loadDeposit}
            <div class="loading"><p></p><p></p><p></p></div>
        {:else}
            {#if iframeGateway}
                <button class="btn return" on:click={()=>iframeGateway = ''}></button>
                <!-- svelte-ignore a11y-missing-attribute -->
                <iframe class="" src="{iframeGateway}" frameborder="0"></iframe>
    
                {:else}
                    {#if paymentSelected}
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                                    <div class="deposit__type" on:click={() => {paymentSelected = false; step2bank = ''; amountDeposit = '';bankDeposit.targetBankId=undefined;bankDeposit.aditional='';bankDeposit.reference='';}}>
                                        <img src="{url_global}/payments/{typeTranference == 'bank'?dataPayment.banco:dataPayment.cta}.png" alt="gateway-{typeTranference == 'bank'?dataPayment.banco:dataPayment.cta}">
                                        <div>
                                            <b>{typeTranference == 'bank'?dataPayment.banco:dataPayment.cta}</b>
                                            <div class="deposit__limits">{dataPayment.min} {dataPayment.iso} - {dataPayment.max} {dataPayment.iso}</div>
                                        </div>
                                        <div class="deposit__arrow show"></div>
                                    </div>
                                    {#if step2bank == 'bank'}

                                    <div>Paso 1: Realiza un depósito a la siguiente cuenta.</div>
                                    <div class="deposit__step1">
                                        <b>Titular: </b>
                                        <p>DEVIN Y ASOCIADOS SAC</p><!--p>{dataPayment.nombre}</p-->
                                        <b>Nro de Cuenta: </b>
                                        <p>009-3001039543</p><!--p>{dataPayment.cta}</p-->
                                        <b>CCI: </b>
                                        <p>003-009-003001039543-89</p><!--p>{dataPayment.cta}</p-->
                                    </div>
                        
                                    <div>Paso 2: Llena la información del depósito realizado.</div>
                                <div class="deposit__info">
                                    
                                        <p>Banco de destino</p>
                                        <p>Banco de origen</p>
                                        <input type="text" class="ipt" value={dataPayment.banco} disabled>
                                    
                                        <select class="slc" bind:value={bankDeposit.targetBankId}>
                                            <option value="0" selected disabled>Seleccionar banco</option>
                                            {#each bankPayments as bank}
                                                <option value={bank.id}>{bank.banco}</option>
                                            {/each}  
                                        </select>
                                    
                                        <p>Nro. de cuenta</p>
                                        <p>Nro. de referencia</p>
                                        <input type="number" class="ipt" bind:value={bankDeposit.aditional} on:input={justNumbersValidate}>
                                        <input type="number" class="ipt" bind:value={bankDeposit.reference} on:input={justNumbersValidate}>
                                    

                                        <p>Monto</p>
                                        <p>Fecha de transferencia</p>
                                        <input type="text" class="ipt" bind:value={amountDeposit} disabled>
                                    
                                        <input type="date" class="ipt" bind:value={bankDeposit.date}>
                                </div>
                                <button class="btn deposit" on:click={testdep}>Depositar</button>

                                
                            {/if}
                            
                            {#if typeTranference && !step2bank}
                                <div>Detalles:</div>
                                <div class="deposit__step1">
                                    <span>Tipo de transferencia:</span><span>{typeTranference == 'bank'?'Directa':'Pasarela de pago'}</span>
                                    <span>Tiempo de procesamiento:</span><span>{typeTranference == 'bank'?'Semi-automático':'Automático'}</span>
                                </div>
                                <div class="deposit__gateway">
                                    <div class="deposit__mounts">
                                        {#each amountsFav as amount}
                                            <button class="btn mount" on:click={()=> amountDeposit = amount}> {amount}</button>
                                        {/each}  
                                    </div>
                                    <div class="deposit__ipt">
                                        <b>{dataPayment.iso}</b>
                                        <input type="number" min="1" class="ipt" bind:value={amountDeposit}>
                                        <button class="btn deposit" on:click={validateDeposit(dataPayment.min,dataPayment.max,dataPayment.iso,dataPayment.cta)} disabled={amountDeposit==undefined||amountDeposit<1}>{typeTranference == 'bank'? 'Continuar':'Depositar'}</button>
                                    </div>
                                </div>

                                {:else}
                                <div></div>
                            {/if}

                        {:else}
                        <b>Elige tu método de pago favorito:</b> 
                        <div class="deposit__types {activePayment?'selected':''}">
                            {#each bankPayments as bank}
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div class="deposit__type" on:click={() => openGateway(bank,'bank')}>
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
                                <div class="deposit__type"  on:click={() => openGateway(payment,'gateway')}>
                                    <img src="{url_global}/payments/{payment.cta}.png" alt="gateway-{payment.cta}">
                                    <div>
                                        <b>{payment.nombre}</b>
                                        <div class="deposit__limits">{payment.min} {payment.iso} - {payment.max} {payment.iso}</div>
                                    </div>
                                    <div class="deposit__arrow"></div>
                                </div>
                            {/each}
                        </div>

                        {/if}
                
            {/if}

    {/if}
</div>
