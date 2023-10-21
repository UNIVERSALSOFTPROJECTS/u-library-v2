<script>
  //export let open;
  import backend from "../../js/server";
  import EventManager from "../../js/EventManager.js";
  import { onMount } from "svelte";
  import Pagination from "../Pagination.svelte";
  import moment from "moment";
  import Loading from "../Loading.svelte";

  export let user;

  
  let filters = { page: 1, xpage: 20 };
  let movements = { list: [] };
  let active_section = "record";
  let promise;

  const onPageClick = (page) => {
    filters.page = page;
    console.log("page", page);
    getMovements();
  };

  onMount(() => {
    let actualDate = moment();
    let dateRest = actualDate.subtract(0, "days");
    filters.from = dateRest.format("YYYY-MM-DD");
    filters.to = moment().format("YYYY-MM-DD");
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
      let params = {...filters,
        token:user.token
      }
      let { data } = await backend.u_wallet.transactions(params);
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
      <input class="ipt" type="date" bind:value={filters.from} />
    </div>
    <div class="u-control-info">
      <span class="u-sub-title">Hasta:</span>
      <input class="ipt" type="date" bind:value={filters.to} />
    </div>
    <div class="u-control-info">
      <span class="u-sub-title">Filtros:</span>
      <select class="ipt" name="filtros" bind:value={filters.type}>
        <option value="TT">TODOS</option>
        <option value="DE">DEPOSITOS</option>
        <option value="RE">RETIROS</option>
        <option value="PR">PREMIOS</option>
      </select>
    </div>
    <div class="u-control-info">
      <span class="u-sub-title">Consultar</span>
      <button
        class="u-btn-consult ipt"
        on:click={() => {
          promise = getMovements();
        }}>CONSULTAR</button
      >
    </div>
  </div>
  <div class="u-show-info">
    <table class="table table-striped responsive">
      <thead class="table_header">
        <tr>
          <th>ID</th>
          <th>FECHA</th>
          <th>DESCRIP.</th>
          <th>GAME</th>
          <th>TIPO</th>
          <th>OUT</th>
          <th>IN</th>
          <th>WALLET</th>
          <th>BLC</th>
        </tr>
      </thead>
      {#if movements.list.length > 0}
        {#await promise}
          <tbody>
            <tr>
              <td colspan="9" style="position:relative"><Loading loading /></td>
            </tr>
          </tbody>
        {:then l}
          <tbody>
            {#each movements.list as mov}
              <tr>
                <td>{mov.serial}</td>
                <td>{moment(mov.created).format("YY-MM-DD HH:mm:ss")}</td>
                <td>{mov.description}</td>
                <td style="min-width: 6rem; text-align:center;">{mov.game_name} ({mov.category} - {mov.brand})</td>
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
          <tfoot>
            <tr>
              <td colspan="9">
                {#if movements.list.length}
                  <Pagination
                    bind:total={movements.total}
                    bind:xpage={movements.xpage}
                    bind:current={movements.page}
                    {onPageClick}
                  />
                {/if}
              </td>
            </tr>
          </tfoot>
        {/await}
      {/if}
    </table>
  </div>
</div>

<style>
  .table {
    min-width: 100%;
    min-height: 100%;
  }
  table.table-striped tr:nth-child(odd) {
    background-color: #f2f2f2;
  }
  .table_header {
    background-color: #f8f9fa;
  }
  /* Texto en negritas */
  thead th {
    font-weight: bold;
  }
  thead th {
    border-bottom: 2px solid #dee2e6;
  }
  .ipt {
    border: 1px solid #000000;
  }
  .u-content-info {
    display: flex;
    flex-direction: column;
    height: 80vh;
  }
  .u-show-info {
    margin: 0.5rem;
    overflow: auto;
    border: 1px solid black;
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
    background-color: #8ea497;
    border-radius: 1rem;
    height: 1.8rem;
  }
  .u-content-date {
    padding: 0.5rem;
    display: grid;
    justify-content: space-between;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }
  .u-control-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    color: black;
    gap: 0.5rem;
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
