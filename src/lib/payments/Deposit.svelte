<script>
    import ServerConnection from "../../js/server";
    import { onMount } from "svelte";
    import { assetsPayments } from "../../js/utils/assetsUtils";
    import inputUtils from "../../js/utils/inputUtils";
    import { currentDate } from "../../js/utils/formatUtils";
    import { isMobile, isMobileSafari } from "mobile-device-detect";

    export let user;
    export let onError;
    export let onOk;
    export let amountsFav;
    export let configDeposit;
    export let t;

    // cuando se hagan platillas tiene que dividir la logica principal de las variables que solo se usan para mostrar u ocultar bbloques de divs
    let loadDeposit = false;
    let loadRecharge = false;
    let iframeGateway;
    let paySelected;
    let payMethods; 
    let bankPayments = [];
    let amountDeposit;
    let typeTranference;
    let date = currentDate();
    let detailsTranference = true;
    let bankDeposit = {
        reference:"",
        amount:"",
        account:"",// este paramentro nunca se usa
        aditional:"",
        originBank:undefined,
        targetBankId:undefined,
        date,
    };
    let paymentLink;
    let id_banca  = configDeposit.id_banca;
    let id_ca  = configDeposit.id_ca;
    let isRequiredVoucher  = configDeposit.isRequiredVoucher || "";
    let viewTimeDeposit = configDeposit.viewTimeDeposit || false;
    let isLocked = true;
    const detecMachine = window['chrome'] && window['chrome']['webview']?true:false;
    let base64Image;
    let fileInput;
    let viewLinkSafari = false;

    const inputJustNumbers = inputUtils.justNumbersValidator;

    const detectLockedDeposit = () => {
        isLocked = !id_banca.includes(user.id_banca) && !id_ca.includes(user.id_ca);
    }

    async function getPayMethods() {
        try {
            loadDeposit = true;
            const {data} = await ServerConnection.wallet.getPayMethods(user.token);
            bankPayments = data.filter((e) => e.virtual == 0);
            data.forEach(item => { item.img = item.virtual === 0?item.banco:item.cta; });
            data.forEach(item => { item.name_pay = item.virtual === 0?item.banco:item.nombre+(item.nota != null?" - "+item.nota:''); });
            payMethods = data;
            loadDeposit = false;
		} catch (error) {
            console.log(error);
			onError(t("msg.contactSupport"));
            loadDeposit = false;
		}
    }

    async function validateDeposit(pay){
        if (amountDeposit < pay.min) return onError(t("deposit.minDeposit")+" "+pay.min+" "+ pay.iso);
        else if(amountDeposit > pay.max) return onError(t("deposit.maxDeposit")+" "+pay.max+" "+ pay.iso);
        else{
            detailsTranference = false;
            if (typeTranference === 'gateway') {
                try {
                    loadDeposit = true;
                    paymentLink = await ServerConnection.wallet.getPayLink(user.token,amountDeposit,pay.cta);
                    iframeGateway = paymentLink.data.link;
                   
                    if(detecMachine){
                        openVirtualKeyboard();
                    
                        const message2 = {
                            action: "pop_up_window",
                            configuration: {
                                isPop_up: true ,
                                height:600,
                                width:600,
                                url:iframeGateway
                            }
                        };
                        window.chrome.webview.postMessage(message2);

                    }else if(isMobileSafari){
                        viewLinkSafari = true;
                    }else{
                        window.open(iframeGateway,"_blank",isMobile?"": windowPayment());
                    }
                } catch (error) {
                    onError(t("msg.contactSupport"));
                }
                finally{
                    detailsTranference = true;
                    amountDeposit = "";
                    loadDeposit = false;
                }
            }
        }
    }

    const windowPayment = () => {
        const width = 600;
        const height = 600;
        const left = (window.outerWidth - width) / 2 + window.screenX;
        const top = (window.outerHeight - height) / 2 + window.screenY;
        const windowSizePosition = `width=${width},height=${height},top=${top},left=${left}`;
        return windowSizePosition;
    }

    const openPayMethod = (typePayment) => {
        paySelected = typePayment;
        //solo para peru
        if (paySelected.banco === "YAPE" || paySelected.banco === "PLIN" || paySelected.banco === "DE UNA") {
            typeTranference = 'wallet';
        }else{
            typeTranference = paySelected.virtual === 0 ?'bank':'gateway';
        }
    }
    
    const closePayMethod = () => {
        paySelected = '';
        amountDeposit = '';
        detailsTranference = true;
        iframeGateway = '';
        bankDeposit.targetBankId=undefined;
        bankDeposit.aditional='';
        bankDeposit.reference='';
        viewLinkSafari = false;
    }

    async function validateDepositBank() {
        if(typeTranference === 'wallet'){
            bankDeposit.aditional = paySelected.banco;
            bankDeposit.reference = paySelected.banco;
            bankDeposit.targetBankId = paySelected.id;
        }
        if (bankDeposit.targetBankId == 0 || bankDeposit.aditional == '' || bankDeposit.reference == '' || isRequiredVoucher && !base64Image) return onError("Todos los campos son obligatorios"); 
        bankDeposit.originBank = paySelected.id;
        bankDeposit.amount = amountDeposit;
        try {
            loadRecharge = true;
            let {data} = await ServerConnection.wallet.bankDeposit(user.token, bankDeposit,base64Image);//siempre es STATUS 200, si hay errores del server colocar el try catch
            if (data.msg === "DEPOSITO_OK") onOk(t("deposit.successDeposit"));
            else if (data.msg === "VARIOS_REGISTROS_DEPOSITOS")  onError(t('deposit.pendingRequest'));
            else onError(t('msg.contactSupport'));
        } catch (error) {
            console.log(error);
        } finally {
            loadRecharge = false;
        }
    }

    const openVirtualKeyboard = () => {
        if(detecMachine){
            const message = {
                action: "isVKActive",
                configuration: {
                    isVKOpen: true 
                }
            };
            window.chrome.webview.postMessage(message);
        }
    }


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                base64Image = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }
        
    onMount(async() => {
        detectLockedDeposit();
        if (!isLocked) getPayMethods(); 
    });
</script>

<div class="modal-body">
{#if isLocked}
    <div class="deposit__message">
        <div class="deposit__message--icon"></div>
        <div class="deposit__message--text">{t('deposit.cachierSupport')}.</div>
    </div>
{:else}
    {#if loadDeposit}
        <div class="loading"><p></p><p></p><p></p></div>
    {:else}
        {#if paySelected}
            <button class="btn deposit__type" on:click={closePayMethod}>
                <img src="{assetsPayments}{paySelected.img}.png" alt="paymethod-{paySelected.img}">
                <div>
                    <b>{paySelected.name_pay}</b>
                    <p class="deposit__limits">{paySelected.min} {paySelected.iso} - {paySelected.max} {paySelected.iso}</p>
                </div>
                <div class="deposit__arrow bottom"></div>
            </button>
            {#if detailsTranference}
                {#if viewLinkSafari}
                     <div class="deposit__link_blank">
                        <h1>Redirección a pasarela</h1>
                        <p>Haz clic en el botón para continuar con el proceso externo.</p>
                        <button class="btn link_blank" on:click={()=>{window.open(iframeGateway,"_blank")}}>Ir a pasarela</button>
                    </div>
                {:else}
                <b>{t('deposit.details')}:</b>
                <div class="deposit__info">
                    <p>{t('deposit.typeTransfer')}:</p><p>{typeTranference == 'bank'? t ('deposit.direct'): t('deposit.paymentGateway') }</p>
                    <p>{t('deposit.processingTime')}:</p><p>{typeTranference == 'bank'? t('deposit.semiAutomatic'): t('deposit.automatic')}</p>
                </div>
                <div class="deposit__gateway">
                    <div class="deposit__mounts">
                        {#each amountsFav as amount}
                            <button class="btn amount" on:click={()=> amountDeposit = amount}>{amount}</button>
                        {/each}  
                    </div>
                    <div class="deposit__ipt">
                        <b>{paySelected.iso}</b>
                        <input type="number" min="1" class="ipt" bind:value={amountDeposit} on:input={inputJustNumbers} on:blur={openVirtualKeyboard}>
                        <button class="btn deposit" on:click={() => validateDeposit(paySelected)} disabled={amountDeposit==undefined||amountDeposit<1}>{typeTranference == 'bank'?'Continuar': t("profile.recharge")}</button>
                    </div>
                </div>
                {/if}
            {:else}
                <p>{t('deposit.step1')}.</p>
                <div class="deposit__details">
                    <b>{t('deposit.holder')}:</b>
                    <p>{paySelected.nombre}</p>
                    <b>{t('deposit.numBankAccount')}:</b>
                    <p>{paySelected.cta}</p>
                    {#if typeTranference != 'wallet'}
                    <b>CCI:</b>
                    <p>{paySelected.cta['cci']}</p>
                    {/if}
                </div>
                <img src="{assetsPayments}{paySelected.banco}__{paySelected.cta.replace(/\+|\s/g, "")}.png" alt="" width="100%">
                <p>{t('deposit.step2')}.</p>
                <div class="deposit__info">
                    {#if typeTranference != 'wallet'}
                    <p>{t('deposit.destinationBank')}</p>
                    <p>{t('deposit.originBank')}</p>
                    <input type="text" class="ipt" value={paySelected.banco} disabled>
                    <select class="slc" bind:value={bankDeposit.targetBankId}>
                        <option value="0" selected disabled>{t('deposit.chooseBank')}</option>
                        {#each bankPayments as bank}
                            <option value={bank.id}>{bank.banco}</option>
                        {/each}  
                    </select>
                    <p>{t('deposit.numAccount')}</p>
                    <p>{t('deposit.numReference')}</p>
                    <input type="number" class="ipt" bind:value={bankDeposit.aditional} on:input={inputJustNumbers}>
                    <input type="number" class="ipt" bind:value={bankDeposit.reference} on:input={inputJustNumbers}>
                    {/if}
                    <p>{t('withdrawal.amount')}</p>
                    <p>{t('deposit.transferDate')}</p>
                    <input type="text" class="ipt" bind:value={amountDeposit} disabled>
                    <input type="date" class="ipt" bind:value={bankDeposit.date}>
                    {#if isRequiredVoucher}
                        <p>Subir Imagen de pago</p>
                        <p></p>
                        <button class="slc icon--upload" on:click={()=> fileInput.click()}>{base64Image?"Archivo subido":"Seleccionar archivo"}</button>
                        <input type="file" bind:this={fileInput} accept="image/*" on:change={handleFileChange} hidden />
                    {/if}
                </div>
                {#if isRequiredVoucher}
                    <b>NOTA: ESPERAR DE 2 A 5 MINUTOS PARA VER REFLEJADO LA RECARGA DE SALDO EN TU CUENTA</b>
                {/if}
                <button class="btn deposit" disabled={loadRecharge} on:click={validateDepositBank}>
                    {#if loadRecharge}
                        <div class="loading"><p /><p /><p /></div>
                    {:else}
                        {t("profile.recharge")}
                    {/if}
                </button>
            {/if}
        {:else}
            <b>{t('deposit.choosePayMethod')}:</b>
            <div class="deposit__types">
                {#each payMethods as paymethod}
                    <button class="btn deposit__type" on:click={() => openPayMethod(paymethod)}>
                        <img src="{assetsPayments}{paymethod.img}.png" alt="paymethod-{paymethod.img}">
                        <div>
                            <b>{paymethod.name_pay}</b>
                            <p class="deposit__limits">{paymethod.min} {paymethod.iso} - {paymethod.max} {paymethod.iso}</p>
                            {#if viewTimeDeposit}
                            <p class="deposit__time">Tiempo estimado: {paymethod.virtual == 0? "5 - 10 minutos": "Inmediato"}</p>
                            {/if}
                        </div>
                        <div class="deposit__arrow right"></div>
                    </button>
                {/each}
            </div>
        {/if}
    {/if}
{/if}
</div>