<script>
  //export let open;
  import backend from "../../js/server";
  import EventManager from "../../js/EventManager.js";
  import { onMount } from "svelte";
  import Pagination from "../Pagination.svelte";
  import moment from "moment";
  import Loading from "../Loading.svelte";

  export let user;

  let from = new Date(),
    dayFrom,
    monthFrom,
    yearFrom;
  let to = new Date(),
    dayTo,
    monthTo,
    yearTo;
  let dateStringFrom, dateStringTo;
  let filter;
  let filters = { page: 1, xpage: 10 };
  let movements = { list: [] };
  let active_section = "record";
  let promise;

  const onPageClick = (page) => {
    filters.page = page;
    getMovements();
  };

  onMount(() => {
    (monthFrom = "" + (from.getMonth() + 1)),
      (dayFrom = "" + (from.getDate() - from.getDate() + 1)),
      (yearFrom = from.getFullYear());

    (monthTo = "" + (to.getMonth() + 1)),
      (dayTo = "" + to.getDate()),
      (yearTo = to.getFullYear());

    if (monthFrom.length < 2) monthFrom = "0" + monthTo;
    if (dayFrom.length < 2) dayFrom = "0" + dayFrom;
    dateStringFrom = [yearFrom, monthFrom, dayFrom].join("-");

    if (monthTo.length < 2) monthTo = "0" + monthTo;
    if (dayTo.length < 2) dayTo = "0" + dayTo;
    dateStringTo = [yearTo, monthTo, dayTo].join("-");
    promise = getMovements();
  });

  const convertDateTimeZone = (lfecha) => {
    var date = new Date(lfecha * 1000);
    let month = "0" + (date.getMonth() + 1);
    let day = "0" + date.getDate();
    let hours = "0" + date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    return (
      date.getFullYear() +
      "-" +
      month.substr(-2) +
      "-" +
      day.substr(-2) +
      " " +
      hours.substr(-2) +
      ":" +
      minutes.substr(-2) +
      ":" +
      seconds.substr(-2) +
      "." +
      date.getMilliseconds()
    );
  };

  const getMovements = async () => {
    try {
      let { data } = await backend.u_wallet.transactions(
        user.token,
        dateStringFrom,
        dateStringTo,
        filter
      );
      movements = data;
      movements.list.map((m) => {
        m.currentDate = convertDateTimeZone(m.lfecha);
      });
    } catch (error) {
      let msg = "Error";
      EventManager.publish("notify", { mode: "error", msg: msg });
    }
  };
</script>

<div class="u-content-info">
  <div class="u-buttons-options">
    <button
      class="opc"
      on:click={() => {
        active_section = "record";
      }}
    >
      <span>Mis movimientos</span>
    </button>
    <!--CHUMBE AQUI DEBE ESTAR LA CONDICIONAL DE EL ENDPOINT DE REGISTRO DE MOVIMIENTOS-->
  </div>
  <div class="u-content-date">
    <div class="u-control-info">
      <span class="u-sub-title">Desde:</span>
      <input class="ipt" type="date" bind:value={dateStringFrom} />
    </div>
    <div class="u-control-info">
      <span class="u-sub-title">Hasta:</span>
      <input class="ipt" type="date" bind:value={dateStringTo} />
    </div>
    <div class="u-control-info">
      <span class="u-sub-title">Filtros:</span>
      <select class="ipt" name="filtros" bind:value={filter}>
        <option value="TT">TODOS</option>
        <option value="DE">DEPOSITOS</option>
        <option value="RE">RETIROS</option>
        <option value="PR">PREMIOS</option>
      </select>
    </div>
    <div class="u-control-info">
      <span class="u-sub-title">Consultar</span>
      <button class="u-btn-consult ipt" on:click={getMovements}>CONSULTAR</button>
    </div>
  </div>
  <div class="u-show-info">
    {#if !movements.list.length}
      <div class="u-no-record">
        <span class="u-no-record-title">No hay nada aquí todavía</span>
        <span>Las transacciones aparecerán cuando deposite o retire dinero</span>
      </div>
    {:else}
      <div class="u-show-data">
        <table>
          <thead class="table_header">
            <tr>
              <th>ID</th>
              <th>FECHA</th>
              <th>DESCRIPCIÓN</th>
              <th>TIPO</th>
              <th>OUT</th>
              <th>ING</th>
              <th>WALLET</th>
              <th>BLC</th>
            </tr>
          </thead>
          {#await promise}
              <tbody>
                <tr>
                  <td colspan="8" style="position:relative"><Loading loading/></td>
                </tr >
              </tbody>
            {/await}
          <tbody>
            {#each movements.list as mov}
              <tr>
                <td>{mov.trxId}</td>
                <td>{moment(mov.created).format("YY-MM-DD HH:mm:ss")}</td>
                <td>{mov.description}</td>
                <td>{mov.txType}</td>
                {#if mov.txType == "BET" || mov.txType == "WITHDRAW"}
                  <td style="color: red;">- {mov.amount.toFixed(2)}</td>
                {:else}
                  <td />
                {/if}
                {#if mov.txType === "WIN" || mov.txType == "DEPOSIT"}
                  <td style="color: green;">{mov.amount.toFixed(2)}</td>
                {:else}
                  <td />
                {/if}
                <td>{mov.balanceType}</td>
                <td>{mov.newBalance}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      {/if}
      {#if movements.list.length}
        <Pagination
          bind:total={movements.total}
          bind:xpage={movements.xpage}
          current={1}
          {onPageClick}
        />
      {/if}
  </div>
</div>

<style>
  .ipt {
    border: 1px solid #000000;
  }
  .u-content-info {
    display: flex;
    flex-direction: column;
    height: 70vh;
  }
  .u-show-info {
    margin: 1rem;
    overflow: auto;
    border: 1px solid black;
    max-height: 50vh;
  }
  td {
    padding: 0.5rem;
  }
  .u-buttons-options {
    display: flex;
    font-size: 16px;
    padding: 0.5rem;
    gap: 0.5rem;
  }
  .opc {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    width: 8rem;
    padding: 0.5rem;
    background-color: #d3e6db;
    border-radius: 1rem;
    height: 1.8rem;
  }
  .u-content-date {
    padding: 1rem;
    display: grid;
    justify-content: space-between;
    gap: 1rem;
    grid-template-columns: 47% 47%;
  }
  .u-control-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    color: black;
    gap: 0.5rem;
  }
  .u-show-data {
    height: auto;
    color: #000000;
  }
  
  .u-no-record {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;
  }
  .u-btn-consult {
    color: white;
    background-color: #28a745;
    cursor: pointer;
  }
  .u-btn-consult:hover {
    background-color: #005d16;
  }
</style>
