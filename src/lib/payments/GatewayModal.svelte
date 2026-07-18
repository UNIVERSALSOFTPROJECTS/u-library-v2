<script>
    import { onMount } from 'svelte';

    export let open;
    export let data_payin;

    let loading = true;
    let error = "";

    async function loadGateway() {
        try {
            let user = sessionStorage.getItem("user");
            if(!user) return ;
            // 1. Solicitar firma al backend
            console.log("data to send ",data_payin)
            const response = await fetch("https://api-test.usoft-api88.net/wallet-service/webhooks/payment/nxpay/signature", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-token":(JSON.parse(user)).token
                },
                body: JSON.stringify(data_payin)
            });

            const data = await response.json();

            // data.signature
            // data.timestamp

            await loadSdk();

            window.PayOrchestrator.render({
                elementId: "pay-orchestrator-widget",
                apiKey: "mch_key_SYrD0iFLCwQQRLSc8W6QVALnvcA0yqjG",
                amount: data_payin.amount,
                currency: data_payin.currency,
                reference: data_payin.reference, 
                payinMethods: "QR,TRANSFER,CASH",
                customerName: data_payin.customerName,
                customerDocType: data_payin.customerDocType,
                customerDocNumber: data_payin.customerDocNumber,
                signature: data.signature,
                timestamp: data.timestamp,
                // customerPhoneCode: "+51",

                // customerPhoneNumber: "999999999",

                // customerEmail: "comprador@gmail.com",

                onSuccess: function (payin) {

                    console.log(payin);

                    open = false;

                }

            });

            loading = false;

        } catch (e) {

            error = e.message;

        }

    }

    function loadSdk() {

        return new Promise((resolve, reject) => {

            if (window.PayOrchestrator) {
                resolve();
                return;
            }

            const script = document.createElement("script");

            script.src = "https://payments01.doncaerp.com/widget.js";

            script.onload = resolve;

            script.onerror = reject;

            document.body.appendChild(script);

        });

    }

    onMount(() => {

        loadGateway();

    });

</script>

{#if loading}
    <p>Cargando gateway...</p>
{/if}

{#if error}
    <p>{error}</p>
{/if}

<div id="pay-orchestrator-widget"></div>