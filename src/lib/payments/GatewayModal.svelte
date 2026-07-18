<script>
    import { onMount } from 'svelte';

    export let open;

    let loading = true;
    let error = "";

    async function loadGateway() {

        try {

            // 1. Solicitar firma al backend

            const body = {
                amount: 100,
                currency: "PEN",
                reference: "ORD-"+Date.now()+"-",
                "payinMethods": "QR,TRANSFER,CASH",
                "customerName":"Juan Perez",
                "customerDocType":"DNI",
                customerDocNumber: "43766099"
            };

            const response = await fetch("https://api-test.usoft-api88.net/wallet-service/webhooks/payment/nxpay/signature", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            // data.signature
            // data.timestamp

            await loadSdk();

            window.PayOrchestrator.render({

                elementId: "pay-orchestrator-widget",

                apiKey: "mch_key_SYrD0iFLCwQQRLSc8W6QVALnvcA0yqjG",

                amount: body.amount,

                currency: body.currency,

                reference: body.reference, 

                payinMethods: "QR,TRANSFER,CASH",

                customerName: "Juan Perez",

                customerDocType: "DNI",

                customerDocNumber: "43766099",

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