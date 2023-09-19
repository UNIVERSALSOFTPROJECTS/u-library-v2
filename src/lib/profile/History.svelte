<script>
  //export let open;
  import backend from "../../js/server"
  import EventManager from "../../js/EventManager.js";
  import { onMount } from 'svelte';
    
  export let user;

  let from = new Date(), dayFrom, monthFrom, yearFrom;
  let to = new Date(), dayTo, monthTo, yearTo;
  let dateStringFrom, dateStringTo;
  let filter;
  let movements=[];
  let active_section="record";

  onMount(()=> {
    monthFrom = '' + (from.getMonth() + 1),
    dayFrom = '' + (from.getDate() - from.getDate() +1),
    yearFrom = from.getFullYear();

    monthTo = '' + (to.getMonth() + 1),
    dayTo = '' + to.getDate(),
    yearTo = to.getFullYear();

    if (monthFrom.length < 2) monthFrom = '0' + monthTo;
    if (dayFrom.length < 2) dayFrom = '0' + dayFrom;
    dateStringFrom = [yearFrom, monthFrom, dayFrom].join('-');

    if (monthTo.length < 2) monthTo = '0' + monthTo;
    if (dayTo.length < 2) dayTo = '0' + dayTo;
    dateStringTo = [yearTo, monthTo, dayTo].join('-');
  });

  const convertDateTimeZone = (lfecha) => {
    var date = new Date(lfecha * 1000);
    let month = "0"+ (date.getMonth()+1);
    let day = "0"+ date.getDate();
    let hours = "0"+ date.getHours();
    let minutes = "0"+ date.getMinutes();
    let seconds = "0"+ date.getSeconds();
    return  date.getFullYear() + '-' + month.substr(-2) +'-'+ day.substr(-2) + ' ' +  hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) +'.'+date.getMilliseconds();
  }

  const getMovements = async ()=>{
    try {
        let data = await backend.getMovements(user.token, dateStringFrom, dateStringTo, filter );
        movements = data;
        movements.map((m) => {
          m.currentDate = convertDateTimeZone(m.lfecha);
        })
      } catch (error) {
        let msg = "Error"
        EventManager.publish("notify", {mode:"error", msg: msg});
      }
  };

</script>

<div class="u-content-info">
  <div class="u-buttons-options">
    <button class="opc" on:click={()=>{ active_section="record" }}>
      <span>Mis movimientos</span>
    </button>
    <!--CHUMBE AQUI DEBE ESTAR LA CONDICIONAL DE EL ENDPOINT DE REGISTRO DE MOVIMIENTOS-->
  </div><div class="u-content-date">
        <div class="u-control-info">
            <span class="u-sub-title">Desde:</span>
            <input class="u-input" type="date"  bind:value={dateStringFrom}>
        </div>
        <div class="u-control-info">
            <span class="u-sub-title">Hasta:</span>
            <input class="u-input" type="date" bind:value={dateStringTo}>
        </div>
        <div class="u-control-info">
            <span class="u-sub-title">Filtros:</span>
            <select class="u-select" name="filtros" bind:value={filter}>
                <option value="TT">TODOS</option>
                <option value="DE">DEPOSITOS</option>
                <option value="RE">RETIROS</option>
                <option value="PR">PREMIOS</option>
            </select>
        </div>
        <div class="u-control-info">
            <span class="u-sub-title">Consultar</span>
            <button class="u-btn-consult" on:click={getMovements}>Consultar</button>
        </div>
    </div>
    <div class="u-show-info">
        {#if !movements.length }
        <div class="u-no-record">
            <span class="u-no-record-title">No hay nada aquí todavía</span>
            <span>Las transacciones aparecerán cuando deposite o retire dinero</span>
        </div>
        {:else}

        <div class="u-show-data">
          {#each movements as mov}
            <div class="u-data-info"> 
              <div class="u-data-ID">
                <span>ID:</span>  
                <div>{mov.id}</div>
              </div>
              <div class="u-data-items">
                <div class="u-item">{mov.ref_op}</div>
                <div class="u-item">
                  <span>fecha: </span>  
                  <div> {mov.currentDate}</div>
                </div>
                <div class="u-item">
                  <span>operacion:</span>
                  <div>{mov.tipo_operacion}</div> 
                </div>
                <div class="u-item">
                  <span>monto:</span> 
                  <div>{mov.monto.toFixed(2)}</div>
                </div>
              </div>     
            </div>
          {/each}
        </div>
        {/if}
    </div>
</div>


<style>
  .u-content-info{
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    height: 80vh;
  }
  .u-buttons-options{
    display: flex;
    font-size: 16px;
    padding: 0.5rem;
    gap: 0.5rem;
  }
  .opc{
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
  .u-content-date{
    padding: 1rem;
    display: grid;
    justify-content: space-between;
    gap: 1rem;
    grid-template-columns: 47% 47%;
  }
  .u-control-info{
    display: flex;
    flex-direction: column;
    width: 100%;
    color: black;
    gap: 0.5rem;
  }
  .u-input{
    height: 2rem;
    border-radius: 0.3rem;
  }
  .u-select{
    height: 2rem;
    border-radius: 0.3rem;
  }
  .u-show-data{
    
    height: auto;
  }
  .u-show-info{
    margin: 1rem;
    overflow: auto;
    border: 1px solid black;
    max-height: 45vh;
  }
  .u-data-info{
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid black;
    padding: 0.5rem;
  }
  .u-data-ID{
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;
    background-color: red;
    border-radius: 0.3rem;
    padding: 0.3rem;
    display: flex;
    color: white;
  }
  .u-data-items{
    display: grid;
    width: 100%;
    grid-template-columns: 50% 50%;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  .u-item{
    color: black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
  }
  .u-no-record{
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;
  }
  .u-btn-consult{
    height: 2rem;
    border: none;
    font-size: 1rem;
    border-radius: 0.3rem;
    background-color: #28A745;
    color: white;
    cursor: pointer;
  }
</style>
