<script>
    import { onMount } from "svelte";
    import {
        currentDate,
        firstDayOfMonth,
        formatNumber,
        stringToNumber,
    } from "../../js/utils/formatUtils";
    import { watchResize } from "svelte-watch-resize";
    import moment from "moment-timezone";

    export let ServerConnection;
    export let user;
    export let timezone;
    export let onError;
    export let onOk;
    export let t;
    export let typeView = "";

    const filterMap = {
        machine: "BDR",
        sportbook: "BAP",
    };

    let filter = filterMap[typeView] || "TT";
    console.log("filter:", filter);
    
    let loadMovements = false;
    let movements = [];
    let dateFrom = currentDate();
    let dateTo = currentDate();
    let heightModal;
    let totalMonto = 0;

    const getMovements = async (type) => {
        let newFilter = /RF|TTW|AP|CB|DV|BN/.test(type);
        try {
            loadMovements = true;
            let response;
            response = await ServerConnection.users.getMovements(
                user.token,
                dateFrom,
                dateTo,
                newFilter ? "TT" : type,
            );
            return response.data;
        } catch (error) {
            if (error.response.errorCode == "OLD_TOKEN")
                error = t("msg.duplicatedSession");
            else error = t("msg.contactSupport");
            onError(error);
        } finally {
            loadMovements = false;
        }
    };

    // const filterMovemets = async (type) => {
    //     totalMonto = 0;
    //     filter = type;

    //     if (filter === "BDR") {
    //         let totalDepositos = 0;
    //         let totalRetiros = 0;

    //         const retiros = await getMovements("RE");
    //         const depositos = await getMovements("DE");

    //         movements = [...retiros, ...depositos];

    //         depositos.forEach((item) => {
    //             totalDepositos += item.monto;
    //         });

    //         retiros.forEach((item) => {
    //             totalRetiros += item.monto;
    //         });

    //         totalMonto = totalDepositos + totalRetiros;
    //         totalMonto = formatNumber(totalMonto);
    //     } else {
    //         movements = await getMovements(filter);
    //     }

    //     const betsAll = {
    //         TTW: (o) => /-WIN-|PREMIO/.test(o.tipo_operacion),
    //         AP: (o) => /-BET-|AP/.test(o.tipo_operacion),
    //         RF: (o) => /-REFUND-/.test(o.tipo_operacion),
    //         CB: (o) => /CASHBACK/.test(o.tipo_operacion),
    //         BN: (o) => /Bono/.test(o.tipo_operacion),
    //         DV: (o) => /DEVOLUCION/.test(o.tipo_operacion),
    //         BAP: (o) => /-WIN-|-BET-|-AP-|-PREMIO-/.test(o.tipo_operacion),
    //     };

    //     movements = betsAll[type] ? movements.filter(betsAll[type]) : movements;

    //     console.log("movements: ", movements);

    //     movements.map((m) => {
    //         m.hora_reg_timezone = moment(m.lfecha * 1000)
    //             .tz(timezone)
    //             .format("YYYY-MM-DD HH:mm:ss");
    //         m.opc = /-REFUND-/.test(m.tipo_operacion)
    //             ? "RF"
    //             : /-BET-|AP/.test(m.tipo_operacion)
    //               ? "AP"
    //               : /PREMIO/.test(m.tipo_operacion)
    //                 ? "CWI"
    //                 : m.opc;
    //         m.type = /Bono/.test(m.tipo_operacion)
    //             ? "BN"
    //             : /DEVOLUCION/.test(m.tipo_operacion)
    //               ? "RF"
    //               : m.opc;
    //         m.monto = formatNumber(m.monto);
    //     });

    //     if (/DE|RE|TTW|AP|BAP/.test(filter)) {
    //         //Sumar los montos y obtener el total
    //         console.log("filter?: ", filter);

    //         movements.forEach((item) => {
    //             totalMonto += stringToNumber(item.monto);
    //         });
    //         totalMonto = formatNumber(totalMonto.toFixed(2));
    //     }
    // };

    const filterMovemets = async (type) => {
        totalMonto = 0;
        filter = type;

        if (filter === "BDR") {
            const retiros = await getMovements("RE");
            const depositos = await getMovements("DE");

            const totalDepositos = calculateMovementSum(depositos);
            console.log(totalDepositos);
            
            const totalRetiros = calculateMovementSum(retiros);
            console.log(totalRetiros);
            
            movements = [...retiros, ...depositos];

            totalMonto = totalDepositos + (totalRetiros);

            totalMonto = formatNumber(totalMonto);
        } else {
            totalMonto = 0;
            movements = await getMovements(filter);
        }

        if (filter === "DE" || filter === "RE") {
            totalMonto = 0;
            totalMonto = calculateMovementSum(movements);
            totalMonto = formatNumber(totalMonto);
        }

        const betsAll = {
            TTW: (o) => /-WIN-|PREMIO/.test(o.tipo_operacion),
            AP: (o) => /-BET-|AP/.test(o.tipo_operacion),
            RF: (o) => /-REFUND-|-LIBERA-/.test(o.tipo_operacion),
            CB: (o) => /CASHBACK/.test(o.tipo_operacion),
            BN: (o) => /Bono/.test(o.tipo_operacion),
            DV: (o) => /DEVOLUCION/.test(o.tipo_operacion),
            BAP: (o) =>
                /-WIN-|-BET-|-AP-|-PREMIO-|-REFUND-|-LIBERA-/.test(o.tipo_operacion),
        };

        movements = betsAll[type] ? movements.filter(betsAll[type]) : movements;

        movements.map((m) => {
            m.hora_reg_timezone = moment(m.lfecha * 1000)
                .tz(timezone)
                .format("YYYY-MM-DD HH:mm:ss");
            m.opc = /-REFUND-|-LIBERA-/.test(m.tipo_operacion)
                ? "RF"
                : /-BET-|AP/.test(m.tipo_operacion)
                  ? "AP"
                  : /PREMIO/.test(m.tipo_operacion)
                    ? "CWI"
                    : m.opc;
            m.type = /Bono/.test(m.tipo_operacion)
                ? "BN"
                : /DEVOLUCION/.test(m.tipo_operacion)
                  ? "RF"
                  : m.opc;
            m.monto = formatNumber(m.monto);
        });

        if (/TTW|AP|RF/.test(filter)) {
            totalMonto = calculateMovementSum(movements);
            totalMonto = formatNumber(totalMonto);
        }
        if (/BAP/.test(filter)) {
            const premio = movements.filter(betsAll["TTW"]);
            const totalPremio = calculateMovementSum(premio);

            const apuesta = movements.filter(betsAll["AP"]);
            const totalApuesta = calculateMovementSum(apuesta);

            const rechazado = movements.filter(betsAll["RF"]);
            const totalRechazado = calculateMovementSum(rechazado);

            totalMonto = totalApuesta + totalRechazado - totalPremio;
            totalMonto = formatNumber(totalMonto);
        }
    };

    const calculateMovementSum = (data) => {
        let montoData = 0;
        data.forEach((item) => {
            montoData += parseFloat(item.monto);
        });
        return montoData;
    };

    const copyTicket = (id, reference) => {
        onOk(t("movements.copyTicket"));
        let message = t("movements.copyDataTicket", { id, reference });
        navigator.clipboard.writeText(message);
    };

    const resizeHeightModal = () => {
        let isLandscape = window.matchMedia("(orientation: landscape)").matches;
        let sizePC = visualViewport.width > 1023;
        heightModal = sizePC
            ? 82 + "vh"
            : visualViewport.height + (isLandscape ? 180 : 0) + "px";
    };

    onMount(async () => {
        filterMovemets(filter);
    });
</script>

<div class="movements {loadMovements ? 'load' : ''}">
    <span><b>{t("movements.timezone")}:</b> {timezone}</span>
    <div class="movements__consult">
        <b>{t("movements.from")}:</b>
        <b>{t("movements.until")}:</b>
        <input class="ipt" type="date" bind:value={dateFrom} />
        <input class="ipt" type="date" bind:value={dateTo} />
        <select class="slc" bind:value={filter}>
            <!-- <option value="">Hoy</option>
            <option value="">Ayer</option>
            <option value="">Últimos 7 días</option>
            <option value="">Últimos 30 días</option>
            <option value="">Este mes</option> -->
            {#if typeView === "machine"}
                <option value="BDR">{t("movements.BDR")}</option>
            {:else if typeView === "sportbook"}
                <option value="BAP">{t("movements.BAP")}</option>
            {:else}
                <option value="TT">{t("movements.all")}</option>
            {/if}
            <option value="TTW">{t("movements.awards")}</option>
            <option value="AP">{t("movements.bets")}</option>
            <option value="DE">{t("movements.deposits")}</option>
            <option value="RE">{t("movements.withdrawals")}</option>
            <option value="CB">{t("movements.CB")}</option>
            <option value="BN">{t("movements.BN")}</option>
            <option value="RF">{t("movements.rejectbets")}</option>
            <option value="DV">{t("movements.DV")}</option>
        </select>
        <button
            class="btn deposit"
            on:click={() => filterMovemets(filter)}
            disabled={loadMovements}>{t("common.search")}</button
        >
    </div>
    {#if loadMovements}
        <div class="loading">
            <p></p>
            <p></p>
            <p></p>
        </div>
    {:else if !movements.length}
        <b class="movements__empty">{t("movements.noInformation")}</b>
    {:else}
        <!-- <div class="movements__totals">MONTO TOTAL: </div> -->
        <div class="movements__totals">
            {#if typeView === "machine" && totalMonto}
                <div>
                    MONTO TOTAL: {totalMonto}
                </div>
            {/if}
            {movements.length}
            {t("movements.results")}
        </div>
        <div
            class="movements__result"
            use:watchResize={resizeHeightModal}
            style="max-height: calc({heightModal} - 18.75rem);"
        >
            {#each movements as mov}
                <div class="movements__ticket">
                    <b class="movements__concept">{mov.tipo_operacion}</b>
                    <div class="movements__transaction">
                        <div class="movements__status {mov.type}"></div>
                        <div class="movements__data">
                            <div class="movements__info">
                                <p>{t(`movements.${mov.opc}`)}</p>
                                <b>{mov.monto}</b>
                                <div class="movements__ref">
                                    <div>
                                        <span>ID: {mov.id}</span>
                                        <p class="movements__ref--text">
                                            {t("movements.reference")}
                                        </p>
                                        <p>{mov.ref_op}</p>
                                    </div>
                                    <button
                                        class="btn copy"
                                        on:click={() =>
                                            copyTicket(mov.id, mov.ref_op)}
                                    ></button>
                                </div>
                                <p>{mov.hora_reg_timezone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>
