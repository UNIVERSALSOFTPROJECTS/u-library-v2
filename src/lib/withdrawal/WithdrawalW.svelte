
<script>
    import { onMount } from 'svelte';
    import ServerConnection from "../../js/server";
    import inputUtils from '../../js/utils/inputUtils';
    import { getUpdateBalance } from '../../js/utils/serverUtils';

    export let user;
    export let configWithdrawal;
    export let openChatLive;
    export let onError;
    export let onOk;
    export let t;

    let platform = configWithdrawal.platform;
    let dataType = configWithdrawal.dataType;
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

    // async function checkWithdrawal() {
    //     loadWithdrawal = true;
    //     try {
    //         const {data} = await ServerConnection.wallet.accountNumber(user.token);
    //         infoAccount = data.cuenta == null?infoAccount:data.cuenta[0];
    //         infoUser = data.data[0];
    //         pendingWithdrawal = infoUser.bloqueo_fondos?true:false;
    //         loadWithdrawal = false;
    //     } catch (error) {
    //         onError(t("msg.contactSupport"));//falta detectar los errores
    //         console.log(error);
    //     }
    // }

    async function validateWithdrawal() {
        if(amount == 0 || amount == undefined) return onError(t("withdrawal.amount0"));
        if(amount < infoUser.retiro_min) return onError(t("withdrawal.min")+infoUser.retiro_min+" "+user.currency);
        if(amount > infoUser.retiro_max) return onError(t("withdrawal.max")+infoUser.retiro_max+" "+user.currency);
        if(amount > user.balance) return onError(t("withdrawal.lowBalance"));
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
                onOk("msg.withdrawalRequestSend");
            }else{
                let error;
                if (data.msg == " Revisar Credencial Invalid receiver in  transaction. Recipient has to be registered with CPS in order to receive funds. For more information call Customer Services on {0}.") {
                    error = t("msg.phoneInvalid");
                }else{
                    error = t("msg.contactSupport");
                }
                onError(error);//falta detectar los errores
            }
        } finally {
            loadWithdrawal = false
        }
    }

    onMount(()=>{ 
        detectLockedDeposit();
        // if (!isLocked) checkWithdrawal(); 
    });
    console.log("tipeView: ", );
    
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
                <div class="withdrawal__amount">
                    <b>{user.currency}</b>
                    <input type="number" class="ipt" min="0" placeholder="Ingrese el monto aquí" bind:value={amount}>
                </div>
                <p>{t('withdrawal.availableBalance')}: {user.balance} {user.currency}</p>
                <p>{t('withdrawal.min')} {infoUser.retiro_min || 0} {user.currency} y {t('withdrawal.max')} {infoUser.retiro_max || 0} {user.currency}</p>
                <div class="withdrawal__info">
                    {#if typeView == "payMobile"}
                    <p>{t('withdrawal.phoneNumber')}</p>
                    <p>{t('withdrawal.additionalInformation')}</p>
                    <!-- SOLO HAITI , SI EXISTEN MAS REFACTORIZAR TOO -->
                    <div class="withdrawal__phone">
                        <input type="telf" class="ipt" value="+509" disabled>
                        <input type="text" inputmode="numeric" class="ipt" bind:value={infoAccount.numero_cta} on:input={inputAccountBank}>
                    </div>
                    <input type="text" class="ipt" bind:value={infoAccount.adicional}>
                    {:else}
                    <p>{t('profile.fullname')}</p>
                    <p>{t('profile.dni')}</p>
                    <input type="text" class="ipt" bind:value={infoUser.nombre} disabled>
                    <input type="text" inputmode="numeric" class="ipt" bind:value={infoUser.documento} on:input={inputJustNumbers} disabled={infoUser.documento}>
                    <p>{t('deposit.bankName')}:</p>
                    <p>{t('deposit.numBankAccount')}:</p>

                    {#if dataType != "static"}
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

                    {#if dataType != "static"}      
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
    <!-- {/if} -->
</div>