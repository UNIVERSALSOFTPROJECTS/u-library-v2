<script>
    import { onMount } from "svelte";
    import { currentDate, firstDayOfMonth, formatNumber, stringToNumber } from "../../js/utils/formatUtils";
    import { watchResize } from "svelte-watch-resize";
    import moment from "moment-timezone";

    export let ServerConnection;
    export let user;
    export let timezone;
    export let onError;
    export let onOk;
    export let t;
    export let typeView = "";
    


    let filter = "TT";
    let loadMovements = false;
    let movements = [];
    // let dateFrom = firstDayOfMonth();
    let dateFrom = currentDate();
    let dateTo = currentDate();
    let heightModal;
    let totalMonto = 0;

    const getMovements = async(type) =>{
        let newFilter = (/RF|TTW|AP|CB|DV|BN/.test(type));
        filter = type;
        try {
            loadMovements = true;
            let response = await ServerConnection.users.getMovements(user.token, dateFrom, dateTo, newFilter?'TT':filter);            
            
            const betsAll = {
                'TTW': o => /-WIN-|PREMIO/.test(o.tipo_operacion),
                'AP': o => /-BET-|AP/.test(o.tipo_operacion),
                'RF': o =>/-REFUND-/.test(o.tipo_operacion),
                'CB': o =>/CASHBACK/.test(o.tipo_operacion),
                'BN': o =>/Bono/.test(o.tipo_operacion),
                'DV': o =>/DEVOLUCION/.test(o.tipo_operacion),
            };
            
            movements =  betsAll[type] ? response.data.filter(betsAll[type]) : response.data;            
            
            movements.map((m) => { 
                m.hora_reg_timezone = moment(m.lfecha*1000).tz(timezone).format("YYYY-MM-DD HH:mm:ss");
                m.opc = /-REFUND-/.test(m.tipo_operacion)?'RF':
                        (/-BET-|AP/.test(m.tipo_operacion)?'AP':
                        (/PREMIO/.test(m.tipo_operacion)?'CWI':m.opc));
                m.type = (/Bono/.test(m.tipo_operacion)? 'BN':
                        (/DEVOLUCION/.test(m.tipo_operacion)?'RF':m.opc));
                m.monto = formatNumber(m.monto);
            });            
            
            // Obteniondo la suma de los montos si es DEPOSITO o RETIRO
            totalMonto = 0
            if(filter === "RE" || filter === "DE"){
                movements.forEach(item => {
                    totalMonto += stringToNumber(item.monto)                    
                });
                totalMonto = formatNumber(totalMonto)
            }
        } catch (error) {
           if(error.response.data.errorCode == "OLD_TOKEN") error = t("msg.duplicatedSession");
           else error = t("msg.contactSupport");
           onError(error);
        }
        finally{
            loadMovements = false;
        }
    }
    
    const copyTicket = (id, reference) => {
        onOk(t("movements.copyTicket"));
        let message = t("movements.copyDataTicket",{id, reference});
        navigator.clipboard.writeText(message);
    }

    const resizeHeightModal = () => {
        let isLandscape = window.matchMedia("(orientation: landscape)").matches;
        let sizePC = visualViewport.width > 1023;
        heightModal = (sizePC? 82+"vh":(visualViewport.height + (isLandscape?180:0))+ "px") ;
     }

    onMount(async() => { getMovements(filter) });
</script>
<div class="movements {loadMovements?'load':''}">
    <span><b>{t("movements.timezone")}:</b> {timezone}</span>
    <div class="movements__consult">
        <b>{t("movements.from")}:</b>
        <b>{t("movements.until")}:</b>
        <input class="ipt" type="date" bind:value={dateFrom}>
        <input class="ipt" type="date" bind:value={dateTo}>
        <select class="slc"  bind:value={filter}>
            <!-- <option value="">Hoy</option>
            <option value="">Ayer</option>
            <option value="">Últimos 7 días</option>
            <option value="">Últimos 30 días</option>
            <option value="">Este mes</option> -->
            <option value="TT">{t("movements.all")}</option>
            <option value="TTW">{t("movements.awards")}</option>
            <option value="AP">{t("movements.bets")}</option>
            <option value="DE">{t("movements.deposits")}</option>
            <option value="RE">{t("movements.withdrawals")}</option>
            <option value="CB">{t("movements.CB")}</option>
            <option value="BN">{t("movements.BN")}</option>
            <option value="RF">{t("movements.rejectbets")}</option>
            <option value="DV">{t("movements.DV")}</option>
        </select>
        <button class="btn deposit" on:click={()=>getMovements(filter)} disabled={loadMovements}>Buscar</button>
    </div>
    {#if loadMovements}
        <div class="loading"><p></p><p></p><p></p></div>
    {:else}
        {#if !movements.length }
            <b class="movements__empty">{t("movements.noInformation")}</b>
        {:else}
        <!-- <div class="movements__totals">MONTO TOTAL: </div> -->
            <div class="movements__totals">
                {#if typeView === "machine" && totalMonto }
                <div>
                    MONTO TOTAL: {totalMonto}
                </div>
                {/if}
                {movements.length} {t("movements.results")}
            </div>
            <div class="movements__result" use:watchResize={resizeHeightModal} style="max-height: calc({heightModal} - 18.75rem);">
                {#each movements as mov}
                    <div  class="movements__ticket"> 
                        <b class="movements__concept">{mov.tipo_operacion}</b>
                        <div  class="movements__transaction">
                            <div class="movements__status {mov.type}"></div>
                            <div class="movements__data">
                                <div class="movements__info">
                                    <p>{t(`movements.${mov.opc}`)}</p>
                                    <b>{mov.monto}</b>
                                    <div class="movements__ref">
                                        <div>
                                            <span>ID: {mov.id}</span>
                                            <p class="movements__ref--text">{t("movements.reference")}</p>
                                            <p>{mov.ref_op}</p>
                                        </div>
                                        <button class="btn copy" on:click={()=>copyTicket(mov.id,mov.ref_op)}></button>
                                    </div>
                                    <p>{mov.hora_reg_timezone}</p>
                                </div>     
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    {/if}
</div>