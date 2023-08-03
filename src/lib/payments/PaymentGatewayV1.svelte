<script>
    import ServerConnection from "../../js/server";
    import "../../styles/app.scss";

    let TokenPayments = '5fbad17b25bfd4d0babf98e62322b48b1bb2a40aaee8f59ab3185af543e19ad9';
    let bankPayments = [];
    let gatewayPayments = [];
    let typePayment;
    async function getPayMethods() {
        try {
            const {data}=await ServerConnection.wallet.getPayMethods(TokenPayments);
            bankPayments = data.filter((e) => e.virtual == 0);
            gatewayPayments = data.filter((e) => e.virtual == 1);
            if (bankPayments.length > 0) typePayment = 'bank';
            else if (gatewayPayments.length > 0) typePayment = 'gateway';
		} catch (error) {
            console.log(error);
			alert(error);
		}
    }

</script>
<button class="btn" on:click={getPayMethods}>Mostar métodos de Pago</button>

<div class="modal-body">
    <div class="deposit__types">
        {#if bankPayments.length > 0}
        <button class="btn payment {typePayment=='bank'?'active':''}" on:click={()=>typePayment='bank'}>Transferencia directa</button>
        {/if}
        {#if gatewayPayments.length > 0}
        <button class="btn payment {typePayment=='gateway'?'active':''}" on:click={()=>typePayment='gateway'}>Pasarela de Pago</button>
        {/if}
    </div>
    {#if typePayment == 'bank'}
        {#each bankPayments as payment}
            <div class="deposit__bank">
                <img src="https://d2zzz5z45zl95g.cloudfront.net/payment_methods/{payment.banco}.png" alt="">
                <div>
                    <div>
                        <b>Titular: </b>
                        <span>{payment.nombre}</span>
                    </div>
                    <div>
                        <b>Cuenta: </b>
                        <span>{payment.cta}</span>
                    </div>
                    <div>
                        <b>Min: </b>
                        <span>{payment.min} {payment.iso}</span>
                        <b>Max: </b>
                        <span>{payment.max} {payment.iso}</span>
                    </div>
                </div>
            </div>
        {/each}
    {:else if typePayment == 'gateway'}
        {#each gatewayPayments as payment}
            <div class="deposit__gateway">
                <img src="https://d2zzz5z45zl95g.cloudfront.net/payment_methods/{payment.cta}.png" alt="">
                <div>
                    <div>
                        <div>
                            <b>Min: </b>
                            <span>{payment.min} {payment.iso}</span>
                            <b>Max: </b>
                            <span>{payment.max} {payment.iso}</span>
                        </div>
                   </div>
                   <div class="deposit__gateway--deposit">
                        <div>Monto a depositar :</div>
                        <div class="deposit__mounts">
                            <button class="btn mount">{payment.iso} 50</button>
                            <button class="btn mount">{payment.iso} 100</button>
                            <button class="btn mount">{payment.iso} 300</button>
                            <button class="btn mount">{payment.iso} 500</button>
                        </div>
                        <div class="deposit__ipt">
                            <b>{payment.iso}</b>
                            <input type="number" class="ipt">
                            <button class="btn deposit">Depositar</button>
                        </div>
                   </div>
                </div>
            </div>
        {/each}
    {/if}

    {#if typePayment=='bank'}
        <div class="deposit__form">
            <div>
                <div>Banco Receptor</div>
                <select class="slc">
                    <option value="">BCP</option>
                    <option value="">BBVA</option>
                    <option value="">Interbank</option>
                </select>
            </div>
            <div>
                <div>Fecha de Transferencia</div>
                <input class="ipt" type="text" disabled value="25-07-2023">
            </div>
            <div>
                <div>Número de referencia</div>
                <input class="ipt" type="number">
            </div>
            <div>
                <div>Monto</div>
                <input class="ipt" type="number">
            </div>
            <div>
                <div>Número de cuenta</div>
                <input class="ipt" type="number">
            </div>
            <div>
                <div>Su banco</div>
                <input class="ipt" type="text" disabled>
            </div>
        </div>
        <button class="btn payment active">Depositar</button>
    {/if}
</div>