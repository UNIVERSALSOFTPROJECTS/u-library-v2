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

<style>
    /*
    .deposit{
        & img{
            border-radius: $borderR-btn;
            max-width: 200px;
            margin: 0 auto;
        }
        &__types{
            display: grid;
            grid-template-columns: repeat(2,10rem);
        }
        &__bank{
            display: grid;
            align-items: center;
            grid-template-columns: 8rem 1fr;
            gap: 0.5rem;
            border: 1px solid #fff;
            padding: 0.75rem;
            border-radius: $borderR-btn;
        }
        &__form{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
        }
        &__ipt{
            display: grid;
            grid-template-columns: 2rem 1fr 6rem;
            gap: 0.25rem;
            align-items: center;
            justify-items: center;
            & .ipt{
                font-size: $g-font-size + 6;
            }
        }
        &__mounts{
            display: flex;
            justify-content: center;
            gap: 0.35rem;
        }
        &__gateway{
            display: grid;
            gap: 0.75rem;
            align-items: center;
            max-width: 350px;
            align-content: center;
            &--deposit{
                display: grid;
                gap: 0.75rem;
            }
        }
        &__limits{
            text-align: center;
        }
        & .modal{
            &-body{
                padding: 2rem 1rem;
                align-content: normal;
            }
            &-dialog{
                max-width: 500px;
            }
            &-header{
                background: #dbb919;
            }
            @include modalFullScreen("mobile");
        }
    }*/
</style>