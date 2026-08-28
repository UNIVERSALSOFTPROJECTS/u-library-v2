<script>
    import ServerConnection from "../../js/server";
    import { onMount } from "svelte";
    import { assetsPayments } from "../../js/utils/assetsUtils";
    import inputUtils from "../../js/utils/inputUtils";
    import { currentDate } from "../../js/utils/formatUtils";
    import GatewayModal from './GatewayModal.svelte'
    import { isMobile, isMobileSafari } from "mobile-device-detect";
    import Modal from "../Modal.svelte";

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
    let gateways = (configDeposit.gateways || []).map(gateway => ({ ...gateway, banco: "GATEWAY_PAY" }));
    let payMethods = [...gateways];
    let bankPayments = [];
    let amountDeposit;
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
    let banksOrigin = configDeposit.banksOrigin || [];
    let originBankJustText = configDeposit.originBankJustText || false;
    let typeTranference = configDeposit.typeTranference || "";
    let imgR4 = configDeposit.imgR4 || "";
    let isLocked = true;
    const detecMachine = window['chrome'] && window['chrome']['webview']?true:false;
    let base64Image;
    let fileInput;
    let viewLinkSafari = false;
    let copiedAccount = false;
    let OPEN_MODAL_GATEWAY_PAY=false;
    let data_pay ;

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
            payMethods = [...gateways, ...data];
        } catch (error) {
            console.log(error);
            payMethods = [...gateways];
        }finally {
            loadDeposit = false;
        }
    }


    async function getAccountDoc() {
        try {
            const { data } = await ServerConnection.users.getMyAccount(user.token);
            return {
                doctype: data.doctype || user.doctype || "DNI",
                document: data.document || user.document || "12312312"
            };
        } catch (error) {
            console.log(error);
            return {
                doctype: user.doctype || "DNI",
                document: user.document || "12312312"
            };
        }
    }

    async function validateDeposit(pay){
        if(typeTranference == "GATEWAY_PAY"){
            if (amountDeposit < pay.min) return onError(t("deposit.minDeposit")+" "+pay.min+" "+ pay.iso);
            else if(amountDeposit > pay.max) return onError(t("deposit.maxDeposit")+" "+pay.max+" "+ pay.iso);
            const { doctype, document } = await getAccountDoc();
            OPEN_MODAL_GATEWAY_PAY = true;
            data_pay = {
                amount: amountDeposit,
                currency: pay.currency || user.currency,
                reference: crypto.randomUUID().replaceAll("-","").substring(0,30),
                payinMethods: pay.payinMethods || "QR,TRANSFER",
                customerName:user.username,
                customerLastname: "Test",
                customerDocType: doctype,
                customerDocNumber: document
            };
        }else{
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
        if(paySelected.banco == 'GATEWAY_PAY'){
            typeTranference = "GATEWAY_PAY";
            return;
        }
        //solo para peru
        if (paySelected.banco === "YAPE" || paySelected.banco === "PLIN" || paySelected.banco === "DE UNA") {
            typeTranference = 'wallet';
        }else if((paySelected.banco || "").toLowerCase().includes("r4")){
            typeTranference = 'r4';
        }else if((paySelected.banco || "").toLowerCase().includes("binance")){
            typeTranference = 'minimal';
        }
        else{
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
        copiedAccount = false;
    }

    const copyAccountNumber = async () => {
        const value = String(paySelected?.cta ?? "");
        if (!value) return;
        try {
            await navigator.clipboard.writeText(value);
            copiedAccount = true;
            setTimeout(() => (copiedAccount = false), 1500);
        } catch (error) {
            onError(t("msg.contactSupport"));
        }
    }

    async function validateDepositBank() {
        if(typeTranference == "GATEWAY_PAY"){
            const { doctype, document } = await getAccountDoc();
            OPEN_MODAL_GATEWAY_PAY = true;
            data_pay = {
                amount: amountDeposit,
                currency: user.currency,
                reference: user.serial + "-"+Date.now(),
                payinMethods: "QR,TRANSFER,CASH",
                customerName:user.username,
                customerDocType: doctype,
                customerDocNumber: document
            };
        }else{
            if(typeTranference === 'wallet'){
                bankDeposit.aditional = paySelected.banco;
                bankDeposit.reference = paySelected.banco;
                bankDeposit.targetBankId = paySelected.id;
            }else if(typeTranference === 'minimal'){
                bankDeposit.aditional = "";
                bankDeposit.targetBankId = "";
                if (!bankDeposit.reference || (isRequiredVoucher && !base64Image)) {
                    return onError("Todos los campos son obligatorios");
                }
            }else if (bankDeposit.targetBankId == 0 || bankDeposit.aditional == '' || bankDeposit.reference == '' || isRequiredVoucher && !base64Image) {
                return onError("Todos los campos son obligatorios");
            }
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
        
        if (!file) return;
        
        const maxSize = 1 * 1024 * 1024; // 1 MB
        
        if (!file.type.startsWith("image/")) {
            event.target.value = "";
            return onError("El archivo seleccionado debe ser una imagen");
        }
    
        if (file.size > maxSize) {
            event.target.value = "";
            return onError("La imagen no puede superar 1 MB");
        }
    
        const reader = new FileReader();
    
        reader.onload = () => {
            base64Image = reader.result;
        };
    
        reader.readAsDataURL(file);
    };
        
    onMount(async() => {
        detectLockedDeposit();
        if (!isLocked) await getPayMethods();
        if (payMethods.length===1)
            openPayMethod(payMethods[0]);
    });
</script>


<div class="modal-body">
{#if OPEN_MODAL_GATEWAY_PAY == true}
    <Modal
    bind:open={OPEN_MODAL_GATEWAY_PAY}
    modalOpened={"gateway_pay"}
    >
        <GatewayModal
            bind:data_payin={data_pay}
            bind:open={OPEN_MODAL_GATEWAY_PAY}
        />
    </Modal>
    
{/if}
{#if isLocked && gateways.length === 0}
    <div class="deposit__message">
        <div class="deposit__message--icon"></div>
        <div class="deposit__message--text">{t('deposit.cachierSupport')}.</div>
    </div>
{:else}
    {#if loadDeposit}
        <div class="loading"><p></p><p></p><p></p></div>
    {:else}
        {#if paySelected}
            {#if typeTranference == 'r4'}
                <img src={imgR4} width="100%" alt="gateway-r4">
            {/if}
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
                    {#if typeTranference == 'r4'}
                        <div class="deposit__info">
                            <p>Banco: R4</p>
                            <p>Rif: j405427230</p>
                            <p>Teléfono: 04241670598</p>
                            <p>Monto: El que desees recargar en tu cuenta.</p>
                        </div>
                    {:else}
                    <div class="deposit__info">
                        {#if typeTranference == 'GATEWAY_PAY' }
                            <p>{t('deposit.typeTransfer')}:</p><p>Automatico</p>
                            <p>{t('deposit.processingTime')}:</p><p>{paySelected.processingTime || ""}</p>
                        {:else}
                            <p>{t('deposit.typeTransfer')}:</p><p>{typeTranference == 'bank'? t ('deposit.direct'): t('deposit.paymentGateway') }</p>
                            <p>{t('deposit.processingTime')}:</p><p>{typeTranference == 'bank'? t('deposit.semiAutomatic'): t('deposit.automatic')}</p>
                        {/if}
                    </div>
                    {/if}
                    {#if typeTranference != 'r4' }
                        {#if typeTranference == 'GATEWAY_PAY' }
                            <div class="deposit__gateway">
                                <div class="deposit__mounts">
                                    {#each (paySelected.amountsFav || amountsFav) as amount}
                                        <button class="btn amount" on:click={()=> amountDeposit = amount}>{amount}</button>
                                    {/each}  
                                </div>
                                <div class="deposit__ipt">
                                    <b>{paySelected.iso}</b>
                                    <input type="number" min="1" class="ipt" bind:value={amountDeposit} on:input={inputJustNumbers} on:blur={openVirtualKeyboard}>
                                    <button class="btn deposit" on:click={() => validateDeposit(paySelected)} disabled={amountDeposit==undefined||amountDeposit<1}>{typeTranference == 'bank'?'Continuar': t("profile.recharge")}</button>
                                </div>
                            </div>
                        {:else}
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
                        
                        
                    {/if}
                {/if}
            {:else}
                <p>{t('deposit.step1')}.</p>
                <div class="deposit__details">
                    <b>{t('deposit.holder')}:</b>
                    <p>{paySelected.nombre}</p>
                    <b>{t('deposit.numBankAccount')}:</b>
                    <p class="deposit__cta-copy">
                        <span>{paySelected.cta}</span>
                        <button
                            type="button"
                            class="btn deposit__copy"
                            on:click={copyAccountNumber}
                            aria-label="Copiar número de cuenta"
                            title={copiedAccount ? "Copiado" : "Copiar"}
                        >
                            {#if copiedAccount}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <g clip-path="url(#clip0_410_15684)">
                                  <path d="M14.75 3.5H5.25C5.05109 3.5 4.86032 3.57902 4.71967 3.71967C4.57902 3.86032 4.5 4.05109 4.5 4.25V16.25C4.5 16.4489 4.57902 16.6397 4.71967 16.7803C4.86032 16.921 5.05109 17 5.25 17H14.75C14.9489 17 15.1397 16.921 15.2803 16.7803C15.421 16.6397 15.5 16.4489 15.5 16.25V4.25C15.5 4.05109 15.421 3.86032 15.2803 3.71967C15.1397 3.57902 14.9489 3.5 14.75 3.5ZM14.5 16H5.5V4.5H14.5V16Z" fill="white"/>
                                  <path d="M13 1.75C13 1.55109 12.921 1.36032 12.7803 1.21967C12.6397 1.07902 12.4489 1 12.25 1H2.75C2.55109 1 2.36032 1.07902 2.21967 1.21967C2.07902 1.36032 2 1.55109 2 1.75V13.75C2 13.9489 2.07902 14.1397 2.21967 14.2803C2.36032 14.421 2.55109 14.5 2.75 14.5H3V2H13V1.75Z" fill="white"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_410_15684">
                                    <rect width="18" height="18" fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>
                            {/if}
                        </button>
                        {#if copiedAccount}
                            <small class="deposit__copied">Copiado</small>
                        {/if}
                    </p>
                </div>
                <img
                    src="{assetsPayments}{paySelected.banco}__{paySelected.cta.replace(/\+|\s/g, "")}.png"
                    alt=""
                    width="100%"
                    on:error={(e) => e.currentTarget.style.display = "none"}
                    on:load={(e) => e.currentTarget.style.display = ""}
                >
                <p>{t('deposit.step2')}.</p>
                <div class="deposit__info">
                    {#if typeTranference === 'minimal'}
                    <p>{paySelected.iso == "ECU" ? t('deposit.codTransaction') : t('deposit.numReference')}</p>
                    <p>{t('withdrawal.amount')}</p>
                    <input type="text" class="ipt" bind:value={bankDeposit.reference}>
                    <input type="text" class="ipt" bind:value={amountDeposit} disabled>
                    <p>{t('deposit.transferDate')}</p>
                    <p>{isRequiredVoucher ? "Subir Imagen de pago" : ""}</p>
                    <input type="date" class="ipt" bind:value={bankDeposit.date}>
                    {#if isRequiredVoucher}
                        <button class="slc icon--upload" on:click={()=> fileInput.click()}>{base64Image?"Archivo subido":"Seleccionar archivo"}</button>
                        <input type="file" bind:this={fileInput} accept="image/*" on:change={handleFileChange} hidden />
                    {:else}
                        <p></p>
                    {/if}
                    {:else}
                    {#if typeTranference != 'wallet'}
                    <p>{t('deposit.destinationBank')}</p>
                    <p>{t('deposit.originBank')}</p>
                    <input type="text" class="ipt" value={paySelected.banco} disabled>
                    {#if originBankJustText}
                        <input type="text" class="ipt" placeholder={t('deposit.chooseBank')} bind:value={bankDeposit.targetBankId}>
                    {:else}
                        <select class="slc" bind:value={bankDeposit.targetBankId}>
                            <option value="0" selected disabled>{t('deposit.chooseBank')}</option>
                                {#if banksOrigin.length > 0}
                                    {#each banksOrigin as bank}
                                        <option value={bank.id}>{bank.name}</option>
                                    {/each}
                                {:else}
                                    {#each bankPayments as bank}
                                        <option value={bank.id}>{bank.banco}</option>
                                    {/each}
                                {/if}
                            </select>
                    {/if}

                    <p>{t('deposit.numAccount')}</p>
                    <p>{paySelected.iso == "ECU" ? t('deposit.codTransaction') : t('deposit.numReference')}</p>
                    <input type="text" class="ipt" bind:value={bankDeposit.aditional} on:input={inputJustNumbers}>
                    <input type="text" class="ipt" bind:value={bankDeposit.reference} on:input={inputJustNumbers}>
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

<style>
    .deposit__cta-copy {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .deposit__copy {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        padding: 2px;
        border: 0;
        background: #1a1a1a;
        color: #fff;
        cursor: pointer;
        flex-shrink: 0;
    }

    .deposit__copy:hover {
        opacity: 0.9;
    }

    .deposit__copied {
        color: #34b93d;
        font-size: 0.75rem;
    }
</style>