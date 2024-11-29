<script>
  //export let open;
  import backend from "../../js/server";
  import EventManager from "../../js/EventManager.js";
  import { onMount } from "svelte";
  import Pagination from "../Pagination.svelte";
  import moment from "moment";
  import Loading from "../Loading.svelte";
  import notify from "../../js/notify";

  export let user;

  
  let filters = { page: 1, xpage: 20 };
  let movements = { list: [] };
  let active_section = "record";
  let promise;

  const onPageClick = (page) => {
    filters.page = page;
    filters.type = "TT"
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
    if(filters.type == "") delete filters.type;
    try { let params = {
        ...filters,
        playerId: user.playerId,
        token:user.token
      }
      console.log("params1", params);
      let { data } = await backend.u_wallet.transactions(params);
      movements = data;
      movements.list.map((m) => {
        m.currentDate = convertDateTimeZone(m.lfecha);
      });
    } catch (error) {
      notify.error("Error al listar los movimientos")
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
        <option value="DEPOSIT">DEPOSITOS</option>
        <option value="WITHDRAW">RETIROS</option>
        <option value="WIN">PREMIOS</option>
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
          <th style="min-width: 8rem; text-align:center;">FECHA</th>
          <th style="min-width: 8rem; text-align:center;">DESCRIP.</th>
          <th style="min-width: 12rem; text-align:center;">GAME</th>
          <th style="min-width: 10rem;">TIPO</th>
          <th style="min-width: 5rem;">OUT</th>
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
              {#if mov.status != 4}
                <tr>
                  <td>{mov.trxId}</td>
                  <td>{moment(mov.created).format("YY-MM-DD HH:mm:ss")}</td>
                  <td>{mov.description}</td>
                  <td style="text-align:center;">{mov.game_name} ({mov.category} - {mov.brand})</td>
                  <td>{mov.txType} ({mov.paymentMethod?mov.paymentMethod:'' })</td>
                  <td style="color: {mov.amount < 0 ? 'red' : 'green'};">{mov.amount.toFixed(2)}</td>
                  <td>{mov.balanceType}</td>
                  <td>{mov.newBalance.toFixed(2)}</td>
                </tr>
              {/if}
            {/each}
          </tbody>
        {/await}
      {/if}
    </table>
  </div>
  <div class="paginator">
    {#if movements.list.length}
      <Pagination
        bind:total={movements.total}
        bind:xpage={movements.xpage}
        bind:current={movements.page}
        {onPageClick}
      />
    {/if}
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
    border-bottom: 2px solid #000000;
  }
  .paginator{
    padding: 0.5rem;
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
    height: 100%;
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
