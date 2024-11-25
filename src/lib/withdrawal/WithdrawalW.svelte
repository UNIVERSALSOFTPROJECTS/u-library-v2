
<script>
    import { onMount } from 'svelte';
    import ServerConnection from "../../js/server";
    import inputUtils from '../../js/utils/inputUtils';
    import { getUpdateBalance } from '../../js/utils/serverUtils';
    import { stringToNumber, formatNumber } from '../../js/utils/formatUtils';

    export let user;
    export let configWithdrawal;
    export let openChatLive;
    export let onError;
    export let onOk;
    export let t;

    let platform = configWithdrawal.platform;
    let banksNames = configWithdrawal.banksNames;
    let typeAccount = configWithdrawal.typeAccount;
    let messageOptional = configWithdrawal.messageOptional;
    let formVerification = configWithdrawal.formVerification;
    let linksChats = configWithdrawal.linksChats;
    let pendingWithdrawal;
    let typeView = configWithdrawal.typeView || "";
    let amount;
    let loadWithdrawal = false;
    let infoUser = {};
    let infoAccount = { adicional:"", numero_cta:"", banco:"" };
    let id_banca  = configWithdrawal.id_banca;
    let id_ca  = configWithdrawal.id_ca;
    let isLocked = true;
    let loadWithdrawalW = false;

    const inputJustText = inputUtils.justTextValidator;
    const inputJustNumbers = inputUtils.justNumbersValidator;
    const inputAccountBank = inputUtils.validateAccountBank;

    const detectLockedDeposit = () => {
        if (id_banca.length === 0 && id_ca.length === 0) {
            isLocked = true;
        } else {
            isLocked = !id_banca.includes(user.id_banca) && !id_ca.includes(user.id_ca);
        }
    }

    async function checkWithdrawal() {
        loadWithdrawal = true;
        try {
            const {data} = await ServerConnection.wallet.accountNumber(user.token);
            infoAccount = data.cuenta == null?infoAccount:data.cuenta[0];
            infoUser = data.data[0];
            pendingWithdrawal = infoUser.bloqueo_fondos?true:false;
            loadWithdrawal = false;
            if(typeView === "payMobile"){// es para maquina y todos lausan por eso se limpia la data
                infoAccount.adicional = "";
                infoAccount.numero_cta = "";
            }
        } catch (error) {
            onError(t("msg.contactSupport"));//falta detectar los errores
            console.log(error);
        }
    }

    async function validateWithdrawal() {
        if(amount == 0 || amount == undefined) return onError(t("withdrawal.amount0"));
        if(amount < infoUser.retiro_min) return onError(t("withdrawal.min")+infoUser.retiro_min+" "+user.currency);
        if(amount > infoUser.retiro_max) return onError(t("withdrawal.max")+infoUser.retiro_max+" "+user.currency);
        //refactorizar esto ya quo searar logia de pasarelas machine de pasarelas web
        if(stringToNumber(amount) > stringToNumber(infoUser.balance)) return onError(t("withdrawal.lowBalance"));
        let info = infoAccount.adicional || "";
        let account = infoAccount.numero_cta;
        let bank = infoAccount.banco;
        let prefixPayMobile = typeView === "payMobile"?"509":"";
        if(typeView === "payMobile"){
            if(!infoUser.document){infoUser.document = ""}
            if(!infoUser.bank){infoUser.bank = ""}
            if(!account || !info) return onError(t("msg.allObligatory"));
        }else{
            if(!infoUser.documento || !info || !account || !bank) return onError(t("msg.allObligatory"));
        }
        try {
            loadWithdrawal = true;
            let {data} = await ServerConnection.wallet.withdrawal_w(user.token,amount,bank,prefixPayMobile+account,info, infoUser.documento);
            
            if(data.resp == "ok"){
                await getUpdateBalance(user);
                user = JSON.parse(sessionStorage.getItem("user"));
                //esto sguro es de HTG CRASHGAMES, DIVIRI LOIGIC CON E PAYMOBILE
                if (typeView === "payMobile") {
                    
                    loadWithdrawalW = true;
                    setTimeout(() => {
                        loadWithdrawalW = false;
                        onOk(t("msg.withdrawalRequestSend"));
                    }, 10000);
                }else{
                    onOk(t("msg.withdrawalRequestSend"));
                }
            }else{
                let error;
                if (data.msg == " Revisar Credencial Invalid receiver in  transaction. Recipient has to be registered with CPS in order to receive funds. For more information call Customer Services on {0}.") {
                    error = t("msg.phoneInvalid");
                }
                else{
                    error = t("msg.contactSupport");
                }
                onError(error);//falta detectar los errores
            }
        } finally {
            loadWithdrawal = false
        }
    }

    let activeInput = null;
    function agregarNumero(numero) {
        if (activeInput === 1) {
            let amounString = amount?amount+"":"";
            amounString += numero;
            amount = Number(amounString);
        }else if (activeInput === 2) {  
            infoAccount.numero_cta += numero;
        } else if (activeInput === 3) {
            infoAccount.adicional += numero;
        }
     
    }
    function eliminarUltimoCaracter() {
        if (activeInput === 1) {
            let amounString = amount?amount+"":"";
               if (amounString.length > 0) {
                    amounString = amounString.slice(0, -1);
                    amount = Number(amounString);
                }
        }else if (activeInput === 2) {
            if (infoAccount.numero_cta.length > 0) {
                infoAccount.numero_cta = infoAccount.numero_cta.slice(0, -1);
            }
        } else if (activeInput === 3) {
            if ( infoAccount.adicional.length > 0) {
                 infoAccount.adicional =  infoAccount.adicional.slice(0, -1);
            }
        }
    }
    function cleanPassword() {
        if (activeInput === 1) {
            amount = "";
        }else if (activeInput === 2) {  
            infoAccount.numero_cta = "";
        } else if (activeInput === 3) {
            infoAccount.adicional = "";
        }
    }


    onMount(()=>{ 
        detectLockedDeposit();
        if (!isLocked) checkWithdrawal(); 
    });    
</script>
<div class="modal-body {isLocked?'locked':''}">
    {#if isLocked}
        <div class="withdrawal__message">
            <div class="withdrawal__message--icon"></div>
            <div class="withdrawal__message--text">{t('withdrawal.cashierSupport')}</div>
        </div>
    {:else}
        <!-- {#if loadWithdrawal}
            <div class="loading"><p></p><p></p><p></p></div>
        {:else} -->
            {#if pendingWithdrawal}
            <b>{t('withdrawal.pendingWithdrawal')}:</b>
            <p class="withdrawal__pending">{infoUser.bloqueo_fondos} {user.currency}</p>
            <div>
                    <p class=""></p>
                    <p>{t('withdrawal.contactServiceCenter')}</p>
            </div>
            {#if messageOptional}
            <p>{messageOptional}</p>
            {/if}
            {:else}
                {#if loadWithdrawalW &&  typeView === "payMobile"}
                    <div class="loading"><p></p><p></p><p></p></div>
                {:else}
                    <div class="withdrawal__amount">
                        <b>{user.currency}</b>
                        <input type="text" class="ipt" placeholder="Ingrese el monto aquí" bind:value={amount} on:focus={() => activeInput = 1}>
                    </div>
                    <p>{t('withdrawal.availableBalance')}: {infoUser.balance} {user.currency}</p>
                    <p>{t('withdrawal.min')} {infoUser.retiro_min || 0} {user.currency} y {t('withdrawal.max')} {infoUser.retiro_max || 0} {user.currency}</p>
                    <div class="withdrawal__info">
                        {#if typeView == "payMobile"}
                        <p>{t('withdrawal.phoneNumber')}</p>
                        <p>{t('withdrawal.additionalInformation')}</p>
                        <!-- SOLO HAITI , SI EXISTEN MAS REFACTORIZAR TOO -->
                        <div class="withdrawal__phone">
                            <input type="telf" class="ipt" value="+509" disabled>
                            <input type="text" inputmode="numeric" class="ipt" bind:value={infoAccount.numero_cta} on:input={inputAccountBank} on:focus={() => activeInput = 2}>
                        </div>
                        <input type="text" class="ipt" bind:value={infoAccount.adicional} on:focus={() => activeInput = 3}>
                        {:else}
                        <p>{t('profile.fullname')}</p>
                        <p>{t('profile.dni')}</p>
                        <input type="text" class="ipt" bind:value={infoUser.nombre} disabled>
                        <input type="text" inputmode="numeric" class="ipt" bind:value={infoUser.documento} on:input={inputJustNumbers} disabled={infoUser.documento}>
                        <p>{t('deposit.bankName')}:</p>
                        <p>{t('deposit.numBankAccount')}:</p>

                        {#if banksNames.length == 0}
                            <input type="text" class="ipt" bind:value={infoAccount.banco} on:input={inputJustText}>
                        {:else}
                            <select class="slc" bind:value={infoAccount.banco}>
                                <option value="" disabled>{t('deposit.chooseBank')}</option>
                                {#each banksNames as banks}
                                    <option value={banks.id}>{banks.name}</option>  
                                {/each}
                            </select>
                        {/if}

                        <input type="text" inputmode="numeric" class="ipt" bind:value={infoAccount.numero_cta} on:input={inputAccountBank}>
                        <p>{t('withdrawal.additionalInformation')}:</p>
                        {#if formVerification}
                        <p class="withdrawal__text--resalt">{t('withdrawal.mandatoryVerification')}</p>
                        {:else}
                        <p></p>
                        {/if}

                        {#if typeAccount.length == 0}      
                            <input type="text" class="ipt" bind:value={infoAccount.adicional}>
                        {:else}
                            <select class="slc" bind:value={infoAccount.adicional}>
                                <option value="" disabled>{t('deposit.chooseTypeBankAccount')}</option>
                                {#each typeAccount as account}
                                    <option value={account.id} >{account.name}</option>
                                {/each}
                            </select>
                        {/if}
                        {#if formVerification}
                            <a class="btn verification" href={formVerification} target="_blank">{t('deposit.identityVerification')}</a>
                        {/if}
                        {/if}

                        
                    </div>
                    {#if infoUser.horarios}
                        <p><b>{t('withdrawal.time')}:</b> {infoUser.horarios}</p>
                    {/if}

                    {#if formVerification}
                    <a href="https://assets.apiusoft.com/{platform}/d&w.pdf" target="_blank">{@html t("withdrawal.termsConditions")}</a>
                    <div class="withdrawal__note">{@html t('withdrawal.reminderCompleteVerification')}</div>
                    {/if}
                    {#if typeView === "payMobile"}
                    <div class="tools__keyboard">
                        <button class="btn keyboard" on:click={() => agregarNumero(1)}>1</button>
                        <button class="btn keyboard" on:click={() => agregarNumero(2)}>2</button>
                        <button class="btn keyboard" on:click={() => agregarNumero(3)}>3</button>
                        <button class="btn keyboard" on:click={() => agregarNumero(4)}>4</button>
                        <button class="btn keyboard" on:click={() => agregarNumero(5)}>5</button>
                        <button class="btn keyboard" on:click={() => agregarNumero(6)}>6</button>
                        <button class="btn keyboard" on:click={() => agregarNumero(7)}>7</button>
                        <button class="btn keyboard" on:click={() => agregarNumero(8)}>8</button>
                        <button class="btn keyboard" on:click={() => agregarNumero(9)}>9</button>
                        <button class="btn keyboard"on:click={cleanPassword}>CE</button>
                        <button class="btn keyboard" on:click={() => agregarNumero(0)}>0</button>
                        <button class="btn keyboard" on:click={eliminarUltimoCaracter}>
                            <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.7071 15.2938C11.3166 14.9033 11.3166 14.2701 11.7071 13.8796L13.5839 12.0027L11.7079 10.1267C11.3174 9.73617 11.3174 9.103 11.7079 8.71248C12.0984 8.32195 12.7316 8.32195 13.1221 8.71248L14.9982 10.5885L16.8796 8.70702C17.2702 8.3165 17.9033 8.3165 18.2938 8.70702C18.6844 9.09755 18.6844 9.73071 18.2938 10.1212L16.4124 12.0027L18.293 13.8833C18.6835 14.2739 18.6835 14.907 18.293 15.2975C17.9025 15.6881 17.2693 15.6881 16.8788 15.2975L14.9982 13.4169L13.1213 15.2938C12.7308 15.6843 12.0976 15.6843 11.7071 15.2938Z" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.6131 5.14653C6.18186 4.42266 7.05148 4 7.97206 4H20C21.6568 4 23 5.34315 23 7V17C23 18.6569 21.6568 20 20 20H7.97206C7.05148 20 6.18186 19.5773 5.6131 18.8535L1.68453 13.8535C0.829805 12.7656 0.829807 11.2344 1.68453 10.1465L5.6131 5.14653ZM7.97206 6C7.6652 6 7.37533 6.14089 7.18574 6.38218L3.25717 11.3822C2.97226 11.7448 2.97226 12.2552 3.25717 12.6178L7.18574 17.6178C7.37533 17.8591 7.6652 18 7.97206 18H20C20.5523 18 21 17.5523 21 17V7C21 6.44772 20.5523 6 20 6H7.97206Z" />
                            </svg>
                        </button>
                    </div>
                    {/if}
                    <button class="btn withdrawal" on:click={validateWithdrawal} disabled={loadWithdrawal}> 
                    {#if loadWithdrawal}
                        <div class="loading"><p></p><p></p><p></p></div>
                    {:else}
                        <p> {t('withdrawal.request')}</p>
                    {/if}
                    </button>
                    {#if linksChats.length != 0}
                    <div class="withdrawal__help">
                        <p>{t('withdrawal.needHelp')}</p>
                        <div class="withdrawal__help--btns">
                            <!-- <button type="button" class="btn chat" on:click={openChatLive}>Chat en vivo</button> -->
                            {#each linksChats as linksChat}
                                <a class="btn {linksChat.name}" target="_blank" href={linksChat.url}>{linksChat.name}</a>
                            {/each}
                        </div>
                    </div>
                    {/if}
                {/if}
            {/if}
        {/if}
    <!-- {/if} -->
</div>