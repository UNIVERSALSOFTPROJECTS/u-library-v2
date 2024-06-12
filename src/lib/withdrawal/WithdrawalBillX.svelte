<script>
    import ServerConnection from "../../js/server";
    import moment from "moment";
    import { onMount } from "svelte";

    export let user;
    export let onOk;
    export let onError;
    export let t;

    let pendingWithdrawal;
    // let amount = Math.floor(user.balance * 10) / 10;
    let amount = "";
    let loadWithdrawal = true;
    let isCopied = false;

    const getPendingWithdrawal = async () => {
       try {
        let resp = await ServerConnection.wallet.checkPreviewWithdrawal(user.token);
        if(resp.data.monto) pendingWithdrawal = resp.data; // si tiene monto quiere decir que tiene un retiro pendiente
        loadWithdrawal = false;
       } catch (error) {
            onError(t("msg.contactSupport"));//falta detectar los errores
            console.log(error);
       }
    };

    const justNumbersValidate = (e) =>{ e.target.value = e.target.value.replace(/[^\d]/g, "") }

    const updateBalance = async() => {
        let data = JSON.parse(sessionStorage.getItem("user"));
        let updateBalance = await ServerConnection.users.getBalance(data.agregatorToken);
        const { balance, bonus_global, bonus_horses, bonus_slot, bonus_sportbook } = updateBalance.data;
        data.balance         = balance;
        data.bonus_global    = bonus_global;
        data.bonus_horses    = bonus_horses;
        data.bonus_slot      = bonus_slot;
        data.bonus_sportbook = bonus_sportbook;
        data.bonus_sumTotal  = bonus_global + bonus_horses + bonus_slot + bonus_sportbook;
        sessionStorage.setItem("user", JSON.stringify(data));
        user = data;
    }
 
    async function validateWithdrawal() {
        if (amount === "" || amount === undefined || amount === null) return onError(t("withdrawal.amount0"));
        if (user.balance < amount) return onError(t("withdrawal.lowBalance"));
        try {
            let data = await ServerConnection.wallet.retailWithdrawal(user.token, amount);
            pendingWithdrawal = data;
            loadWithdrawal = true;
            getPendingWithdrawal();
            updateBalance();
            let printData = {
                username: user.username,
                amount: data.data.monto,
                currency: user.currency,
                idUser: user.id,
                barcode: "000"+data.data.codigo,
                str: "Crashgames platform"
            }
            printTicketWithdrawal(printData);
        } catch (error) {
            //error.data.message = "SALDO_INSUFICIENTE"
            onError(t("msg.contactSupport"));//falta detectar los errores
            console.log(error);
        }
    }



    const printTicketWithdrawal = (data) => {
        if(window.chrome){
            data.action='printWithdrawInvoice';
            console.log("enviando a billColector dese printer:", data);
          window.chrome.webview.postMessage(data);
      }
	}

    function agregarNumero(numero) {
        
            amount += numero;
      
    }
    function eliminarUltimoCaracter() {
        if (amount.length > 0) {
            amount = amount.slice(0, -1);
        }
    }
    function cleanPassword() {
        let newAmount = Math.floor(user.balance * 10) / 10;
        amount = newAmount.toString();
    }



    const copyCodeWhitdrawal = () => {
        isCopied = true;
        setTimeout(() => { isCopied = false }, 2000);
        let finalMessage = t("withdrawal.copyCode",{user: user.username, id: user.id, code: pendingWithdrawal.codigo});
        navigator.clipboard.writeText(finalMessage);
    };

    onMount(()=>{ getPendingWithdrawal(); })
</script>

<div class="modal-body {pendingWithdrawal && pendingWithdrawal.monto>0?'':'noPending'}">
    {#if loadWithdrawal}
        <div class="loading"><p></p><p></p><p></p></div>
        {:else}
        {#if pendingWithdrawal && pendingWithdrawal.monto>0}
            <img class="logo" src="https://assets.apiusoft.com/crashgames/logo.png" alt="">
            <b>Pago de retiro</b>
            <div class="withdrawal__info">
                <b>Usuario:</b>
                <p> {user.username}</p>
                <b>{t("withdrawal.id")}</b>
                <p> {user.id}</p>   
                <b>PIN:</b>
                <p>000{pendingWithdrawal.codigo}</p>
                <b>Fecha:</b>
                <p> {moment.unix(pendingWithdrawal.efecha).format("DD/MM/YYYY")}</p>   
                <b>Hora:</b>
                <p>{moment.unix(pendingWithdrawal.efecha).format("HH:mm")}</p>
                <b>{t("withdrawal.amount")}</b>
                <p>{pendingWithdrawal.monto} {user.currency}</p>
            </div>
            <img class="barcode" src="https://assets.apiusoft.com/generic_imgs/utils/barcode.webp" alt="">
        {:else}
            <p>Saldo total: {user.balance}</p>
            <p>{t("withdrawal.withdraw")}</p>
            <div class="withdrawal__amount">
                <input type="text" class="ipt" bind:value={amount} on:input={justNumbersValidate} placeholder={t("withdrawal.amount0")}>
                <b>{user.currency}</b>
            </div>
            <div class="tools__keyboard">
                <button class="btn keyboard" on:click={() => agregarNumero('1')}>1</button>
                <button class="btn keyboard" on:click={() => agregarNumero('2')}>2</button>
                <button class="btn keyboard" on:click={() => agregarNumero('3')}>3</button>
                <button class="btn keyboard" on:click={() => agregarNumero('4')}>4</button>
                <button class="btn keyboard" on:click={() => agregarNumero('5')}>5</button>
                <button class="btn keyboard" on:click={() => agregarNumero('6')}>6</button>
                <button class="btn keyboard" on:click={() => agregarNumero('7')}>7</button>
                <button class="btn keyboard" on:click={() => agregarNumero('8')}>8</button>
                <button class="btn keyboard" on:click={() => agregarNumero('9')}>9</button>
                <button class="btn keyboard"on:click={cleanPassword}>Total</button>
                <button class="btn keyboard" on:click={() => agregarNumero(0)}>0</button>
                <button class="btn keyboard" on:click={eliminarUltimoCaracter}>
                    <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.7071 15.2938C11.3166 14.9033 11.3166 14.2701 11.7071 13.8796L13.5839 12.0027L11.7079 10.1267C11.3174 9.73617 11.3174 9.103 11.7079 8.71248C12.0984 8.32195 12.7316 8.32195 13.1221 8.71248L14.9982 10.5885L16.8796 8.70702C17.2702 8.3165 17.9033 8.3165 18.2938 8.70702C18.6844 9.09755 18.6844 9.73071 18.2938 10.1212L16.4124 12.0027L18.293 13.8833C18.6835 14.2739 18.6835 14.907 18.293 15.2975C17.9025 15.6881 17.2693 15.6881 16.8788 15.2975L14.9982 13.4169L13.1213 15.2938C12.7308 15.6843 12.0976 15.6843 11.7071 15.2938Z" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.6131 5.14653C6.18186 4.42266 7.05148 4 7.97206 4H20C21.6568 4 23 5.34315 23 7V17C23 18.6569 21.6568 20 20 20H7.97206C7.05148 20 6.18186 19.5773 5.6131 18.8535L1.68453 13.8535C0.829805 12.7656 0.829807 11.2344 1.68453 10.1465L5.6131 5.14653ZM7.97206 6C7.6652 6 7.37533 6.14089 7.18574 6.38218L3.25717 11.3822C2.97226 11.7448 2.97226 12.2552 3.25717 12.6178L7.18574 17.6178C7.37533 17.8591 7.6652 18 7.97206 18H20C20.5523 18 21 17.5523 21 17V7C21 6.44772 20.5523 6 20 6H7.97206Z" />
                    </svg>
                </button>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <button class="btn deposit" on:click={validateWithdrawal}>{t("withdrawal.request")}</button>
        {/if}
    {/if}
</div>