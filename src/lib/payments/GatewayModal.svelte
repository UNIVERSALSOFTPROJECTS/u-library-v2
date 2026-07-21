<script>
    import { onMount } from 'svelte';
    import ServerConnection from '../../js/server'

    export let open;
    export let data_payin ;

    let loading = true;
    let error = "";

    async function loadGateway() {
        try {
            let user = sessionStorage.getItem("user");
            if(!user) return ;
            data_payin.amount = data_payin.amount*100;
            let secret_wallet_gateway = ServerConnection.u_user.getSecretGateway();
            console.log("secret "+secret_wallet_gateway)
            let response = await ServerConnection.u_user.generateSignatureToOrderPayIn(data_payin,(JSON.parse(user)).token)
            const data = response.data;
            await loadSdk();

            window.PayOrchestrator.render({
                elementId: "pay-orchestrator-widget",
                apiKey: secret_wallet_gateway,
                amount: data_payin.amount,
                currency: data_payin.currency,
                reference: data_payin.reference, 
                payinMethods: data_payin.payinMethods,
                customerName: data_payin.customerName,
                customerLastname: data_payin.customerLastname,
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