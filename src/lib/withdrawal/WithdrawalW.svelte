
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
    let amount;
    let loadWithdrawal = true;
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

    async function checkWithdrawal() {
        loadWithdrawal = true;
        try {
            const {data} = await ServerConnection.wallet.accountNumber(user.token);
            infoAccount = data.cuenta == null?infoAccount:data.cuenta[0];
            infoUser = data.data[0];
            pendingWithdrawal = infoUser.bloqueo_fondos?true:false;
            loadWithdrawal = false;
        } catch (error) {
            onError(t("msg.contactSupport"));//falta detectar los errores
            console.log(error);
        }
    }

    async function validateWithdrawal() {
        if(amount == 0 || amount == undefined) return onError(t("withdrawal.amount0"));
        if(amount < infoUser.retiro_min) return onError(t("withdrawal.min")+infoUser.retiro_min+" "+user.currency);
        if(amount > infoUser.retiro_max) return onError(t("withdrawal.max")+infoUser.retiro_max+" "+user.currency);
        if(amount > user.balance) return onError(t("withdrawal.lowBalance"));
        let info = infoAccount.adicional;
        let account = infoAccount.numero_cta;
        let bank = infoAccount.banco;
        if(!infoUser.documento || !info || !account || !bank) return onError(t("msg.allObligatory"));
        try {
            await ServerConnection.wallet.withdrawal_w(user.token,amount,bank,account,info, infoUser.documento);
            await getUpdateBalance(user);
            user = JSON.parse(sessionStorage.getItem("user"));
            checkWithdrawal();
        } catch (error) {
             onError(t("msg.contactSupport"));//falta detectar los errores
            console.log(error);
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
            <div class="withdrawal__message--text">Comuniquese con su cajero correspondiente para procesar su retiro.</div>
        </div>
    {:else}
        {#if loadWithdrawal}
            <div class="loading"><p></p><p></p><p></p></div>
        {:else}
            {#if pendingWithdrawal}
            <b>Tú tienes actiualmente una solicitud de retiro de :</b>
            <p class="withdrawal__pending">{infoUser.bloqueo_fondos} {user.currency}</p>
            <div>
                    <p class=""></p>
                    <p>Si desea saber en que estado se encuentra su solicitud de retiro, puede comunicarse con nuestro centro de atención al cliente</p>
            </div>
            {#if messageOptional}
            <p>{messageOptional}</p>
            {/if}
            {:else}
                <div class="withdrawal__amount">
                    <b>{user.currency}</b>
                    <input type="number" class="ipt" min="0" placeholder="Ingrese el monto aquí" bind:value={amount}>
                </div>
                <p>Saldo disponible: {user.balance} {user.currency}</p>
                <p>Retiro mínimo de {infoUser.retiro_min || 0} {user.currency} y maximo de {infoUser.retiro_max || 0} {user.currency}</p>
                <div class="withdrawal__info">
                    <p>Nombre completo:</p>
                    <p>Documento de identidad:</p>
                    <input type="text" class="ipt" bind:value={infoUser.nombre} disabled>
                    <input type="text" inputmode="numeric" class="ipt" bind:value={infoUser.documento} on:input={inputJustNumbers} disabled={infoUser.documento}>
                    <p>Nombre de banco:</p>
                    <p>Nro de cuenta:</p>

                    {#if dataType != "static"}
                        <input type="text" class="ipt" bind:value={infoAccount.banco} on:input={inputJustText}>
                    {:else}
                        <select class="slc" bind:value={infoAccount.banco}>
                            <option value="" disabled>Selecciona tu banco</option>
                            {#each banksNames as banks}
                                <option value={banks.id}>{banks.name}</option>  
                            {/each}
                        </select>
                    {/if}

                    <input type="text" inputmode="numeric" class="ipt" bind:value={infoAccount.numero_cta} on:input={inputAccountBank}>
                    <p>Información adicional:</p>
                    <p class="withdrawal__text--resalt">Verificación obligatoria</p>

                    {#if dataType != "static"}
                        <input type="text" class="ipt" bind:value={infoAccount.adicional}>
                    {:else}
                        <select class="slc" bind:value={infoAccount.adicional}>
                            <option value="" disabled>Selecciona tu tipo de cuenta</option>
                            {#each typeAccount as account}
                                <option value={account.id} >{account.name}</option>
                            {/each}
                        </select>
                    {/if}
                    {#if formVerification}
                        <a class="btn verification" href={formVerification} target="_blank">Verificación de identidad</a>
                    {/if}

                    
                </div>
                {#if infoUser.horarios}
                    <p><b>Horario de retiro:</b> {infoUser.horarios}</p>
                {/if}

                <a href="https://assets.apiusoft.com/{platform}/d&w.pdf" target="_blank">{@html t("withdrawal.termsConditions")}</a>
                <div class="withdrawal__note"><b>Nota:</b>Asegúrate de completar <b>tu verificación de identidad</b> para poder proceder con el <b>retiro de tu dinero.</b> Sin esta verificación, <b>no podremos procesar tu solicitud.</b> Además, ten en cuenta que si tienes un bono activo y realizas un retiro, este se perderá.</div>
                <button class="btn withdrawal" on:click={validateWithdrawal}>Solicitar retiro</button>
                <div class="withdrawal__help">
                    <p>¿Necesitas ayuda?</p>
                    <div class="withdrawal__help--btns">
                        <button type="button" class="btn chat" on:click={openChatLive}>Chat en vivo</button>
                        {#each linksChats as linksChat}
                            <a class="btn {linksChat.name}" target="_blank" href={linksChat.url}>{linksChat.name}</a>
                        {/each}
                    </div>
                </div>
            {/if}
        {/if}
    {/if}
</div>