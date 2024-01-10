<script>
    import ServerConnection from "../../js/server";

    export let user;
    export let onError;
    export let onOk;
    export let amountsFav;

    // cuando se hagan platillas tiene que dividir la logica principal de las variables que solo se usan para mostrar u ocultar bbloques de divs
    let url_global = "https://assets.apiusoft.com/generic_imgs";
    let loadDeposit = false;
    let iframeGateway;
    let sizeIframeGateway = '';//Pasarelas pueden variar de tamaño
    let paySelected;
    let payMethods; 
    let bankPayments = [];
    let amountDeposit;
    let typeTranference;
    let currentDate = new Date().toISOString().split('T')[0];
    let detailsTranference = true;
    let bankDeposit = {
        reference:"",
        amount:"",
        account:"",// este paramentro nunca se usa
        aditional:"",
        originBank:undefined,
        targetBankId:undefined,
        date:currentDate,
    };
    let paymentLink;
    
    getPayMethods();

    async function getPayMethods() {
        try {
            loadDeposit = true;
            const {data} = await ServerConnection.wallet.getPayMethods(user.token);
            bankPayments = data.filter((e) => e.virtual == 0);
            data.forEach(item => { item.img = item.virtual === 0?item.banco:item.cta; });
            data.forEach(item => { item.name_pay = item.virtual === 0?item.banco:item.nombre; });
            payMethods = data;
            loadDeposit = false;
		} catch (error) {
            console.log(error);
            if(user == null) error = "Sesión expirada!, cerrando sesión";//y hacer logout
            else error = "Ocurrio un error, contactese con soporte";
			onError(error);
            loadDeposit = false;
		}
    }

   async function validateDeposit(pay){
        if (amountDeposit < pay.min) return onError("El monto mínimo de depósito es "+pay.min+" "+ pay.iso);
        else if(amountDeposit > pay.max) return onError("El monto máximo de depósito es "+pay.max+" "+ pay.iso);
        else{
            detailsTranference = false;
            if (typeTranference === 'gateway') {
                try {
                    loadDeposit = true;
                    paymentLink = await ServerConnection.wallet.getPayLink(user.token,amountDeposit,pay.cta);
                    iframeGateway = paymentLink.data.link;
                    let navigatorFirefox = navigator.userAgent.toLocaleLowerCase().includes('firefox');//firefox solo hace ventana emergente
                    if (pay.cta == "payku" || navigatorFirefox) { location.href = iframeGateway; }//esta pasarela no permite iframe
                    else{
                        sizeIframeGateway = iframeGateway.includes("izypay")?"small":"";//actualmente solo izypay presenta este tamaño
                        amountDeposit = '';
                        loadDeposit = false;
                    }
                } catch (error) {
                    onError("Ocurrio un error, contactese con soporte");
                    loadDeposit = false;
                }
            }
        }
    }

    const openPayMethod = (typePayment) => {
        paySelected = typePayment;
        if (paySelected.virtual === 0) paySelected.cta = JSON.parse(typePayment.cta);      
        typeTranference = paySelected.virtual === 0 ?'bank':'gateway';
    }
    
    const closePayMethod = () => {
        paySelected = '';
        amountDeposit = '';
        detailsTranference = true;
        iframeGateway = '';
        sizeIframeGateway = '';
        bankDeposit.targetBankId=undefined;
        bankDeposit.aditional='';
        bankDeposit.reference='';
    }

    async function validateDepositBank() {
        if (bankDeposit.targetBankId == 0 || bankDeposit.aditional == '' || bankDeposit.reference == '') return onError("Todos los campos son obligatorios"); 
            bankDeposit.originBank = paySelected.id;
            bankDeposit.amount = amountDeposit;
            let {data} = await ServerConnection.wallet.bankDeposit(user.token,bankDeposit);//siempre es STATUS 200, si hay errores del server colocar el try catch
            if (data.msg === "DEPOSITO_OK") onOk("Depósito exitoso");
            else if (data.msg === "VARIOS_REGISTROS_DEPOSITOS")  onError("Depósito cancelado, tiene una solicitud pendiente");
            else onError("Ocurrio un error, contactese con soporte");
    }
    
    const justNumbersValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\d]/g, "") }
</script>

<div class="modal-body {iframeGateway?'iframe':''} {sizeIframeGateway}">
    {#if loadDeposit}
        <div class="loading"><p></p><p></p><p></p></div>
    {:else}
        {#if iframeGateway}
            <button class="btn return" on:click={closePayMethod}></button>
            <iframe class="deposit__iframe" src="{iframeGateway}" frameborder="0" title="paymentGateway"></iframe>
        {:else}
            {#if paySelected}
                <button class="btn deposit__type" on:click={closePayMethod}>
                    <img src="{url_global}/payments/{paySelected.img}.png" alt="paymethod-{paySelected.img}">
                    <div>
                        <b>{paySelected.img}</b>
                        <p class="deposit__limits">{paySelected.min} {paySelected.iso} - {paySelected.max} {paySelected.iso}</p>
                    </div>
                    <div class="deposit__arrow bottom"></div>
                </button>
                {#if detailsTranference}
                    <b>Detalles:</b>
                    <div class="deposit__info">
                        <p>Tipo de transferencia:</p><p>{typeTranference == 'bank'?'Directa':'Pasarela de pago'}</p>
                        <p>Tiempo de procesamiento:</p><p>{typeTranference == 'bank'?'Semi-automático':'Automático'}</p>
                    </div>
                    <div class="deposit__gateway">
                        <div class="deposit__mounts">
                            {#each amountsFav as amount}
                                <button class="btn amount" on:click={()=> amountDeposit = amount}>{amount}</button>
                            {/each}  
                        </div>
                        <div class="deposit__ipt">
                            <b>{paySelected.iso}</b>
                            <input type="number" min="1" class="ipt" bind:value={amountDeposit} on:input={justNumbersValidate}>
                            <button class="btn deposit" on:click={() => validateDeposit(paySelected)} disabled={amountDeposit==undefined||amountDeposit<1}>{typeTranference == 'bank'?'Continuar':'Depositar'}</button>
                        </div>
                    </div>
                {:else}
                    <p>Paso 1: Realiza un depósito a la siguiente cuenta.</p>
                    <div class="deposit__details">
                        <b>Titular:</b>
                        <p>{paySelected.nombre}</p>
                        <b>Nro de Cuenta:</b>
                        <p>{paySelected.cta['ncuenta']}</p>
                        <b>CCI:</b>
                        <p>{paySelected.cta['cci']}</p>
                    </div>
                    <p>Paso 2: Llena la información del depósito realizado.</p>
                    <div class="deposit__info">
                        <p>Banco de destino</p>
                        <p>Banco de origen</p>
                        <input type="text" class="ipt" value={paySelected.banco} disabled>
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
                    <button class="btn deposit" on:click={validateDepositBank}>Depositar</button>
                {/if}
            {:else}
                <b>Elige tu método de pago favorito:</b>
                <div class="deposit__types">
                    {#each payMethods as paymethod}
                        <button class="btn deposit__type" on:click={() => openPayMethod(paymethod)}>
                            <img src="{url_global}/payments/{paymethod.img}.png" alt="paymethod-{paymethod.img}">
                            <div>
                                <b>{paymethod.name_pay}</b>
                                <p class="deposit__limits">{paymethod.min} {paymethod.iso} - {paymethod.max} {paymethod.iso}</p>
                            </div>
                            <div class="deposit__arrow right"></div>
                        </button>
                    {/each}
                </div>
            {/if}
        {/if}
    {/if}
</div>