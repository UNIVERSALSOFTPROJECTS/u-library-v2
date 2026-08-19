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
            let user_recharge = JSON.parse(user);
            let response = await ServerConnection.u_user.generateSignatureToOrderPayIn(data_payin,user_recharge.token+"_"+user_recharge.id+"_"+user_recharge.username);
            let data = response.data;
            await loadSdk();
            // si customerDocType es vacio enviar DNI , cuando es cedula enviar DNI
            // si customerDocNumber vacio o 0 enviar 12312312
            data_payin.customerName = data.customerName ; 
            data_payin.customerLastname = data.customerLastname ; 
            data_payin.customerDocType = data.customerDocType ; 
            data_payin.customerDocNumber = data.customerDocNumber ; 
            console.log("data_payin",data_payin); 

            window.NexoPay.render({
                elementId: "pay-orchestrator-widget",
                apiKey: data.merchantKey,
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
                    // recargar la pagina
                    window.location.reload();
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

            script.src = "https://payments02-dev.nexopayment.net/widget.js";

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