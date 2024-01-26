<script>
	import { onMount } from "svelte";
  import moment from "moment";
  import Modal from "./Modal.svelte";

  export let user;	
  export let configs;
  export let configOpen=true;
  export let activeBillCollector;
  let loading;
  let logsOpen=false;
  let internetReconnect=0;

	let logFilter = { startDate: moment().format("YYYY-MM-DD"), search: "" };
	let logs = [];
  let prevUsername;
	$:{
   
		  if(user  && activeBillCollector && isNewUser() && billCollectorActive() && isWinWebview()) sendToWinWebview('setUser', user);
    	if(!user && activeBillCollector && billCollectorActive() && isWinWebview()) sendToWinWebview('onLogout', {});
      
	}

  const isNewUser=()=>{
    let isNew=false;
    if( !prevUsername ){ isNew=true;  prevUsername=user.username;  }
    else if(!prevUsername && !user.username) {isNew=false;}
    else if(prevUsername && user.username && prevUsername==user.username) {isNew=false; }
    else if(prevUsername && user.username && prevUsername!=user.username){ isNew=true;  prevUsername=user.username;  }
    else{  console.log("BILLETERO CASO DESCONOCIDO"); }
    return isNew;
  }


	const billCollectorActive = ()=> ( configs && configs.billCollector );
  const isWinWebview = ()=> (window.chrome && window.chrome.webview);

  const showLogs=()=>{
    configOpen=false;
    logsOpen=false;
    setTimeout(()=>{logsOpen=true;}, 1000);
  }

  const saveConfig=()=>{
    try {
      localStorage.setItem("config", JSON.stringify(configs));
      window.location.reload();
    } catch (error) {
        console.error("Error al guardar la configuración:", error);
    }
  }


  const sendToWinWebview = (action, data) => {
    if (window.chrome && window.chrome.webview) {
      data.action = action;
      window.chrome.webview.postMessage(data);
    } else {
      console.log("Disponible: solo pra el billetero Gracia!.");
    }
	 }

  const getLogs=()=> {
    if(!isWinWebview()) return console.log("No esta usando UniversalPOS");
    logs=[];
    loading=true;
    sendToWinWebview("getLogs", logFilter);
  }

  onMount(()=>{
    logs=[];
  if(isWinWebview()){
    window.chrome.webview.addEventListener('message', function (e) {
        console.log("mensaje recibido C#:",e.data);
        let data=JSON.parse(e.data);
        switch(data.msg){
          case 'getLogs': logs = data.data; break;
        }
        loading=false;
        
      });
  }else{console.log("Billetero no funcionara! no esta usando la aplicacion UniversalPOS.");}
  });

  const handleOnline=()=>{
    console.log("Conectado a internet ", internetReconnect);
    if(user) sendToWinWebview('setUser', user);
    
  }
  const handleOffline=()=>{
    console.log("Desconetado a internet ");
  }


  window.addEventListener('online', handleOnline);
  window.addEventListener('offiline', handleOffline);
</script>
<Modal open={configOpen} title="Configuracion Billetero">
  <div class="config-wrapper"> 
    <div>
      <label for="checkbillcollector"> 
        <input id="checkbillcollector" type="checkbox" bind:checked={configs.billCollector} /> Activado </label>
    {#if configs && configs.billCollector}
      <!-- svelte-ignore a11y-invalid-attribute -->
    <a on:click={showLogs} href="#">Mostrar Historial</a>
    {/if}
    </div>

  <button on:click={saveConfig} class="btn">Guardar</button>
  </div>
  
</Modal>

<Modal open={logsOpen} title="Historial Billetero">
    <div class="logs-body">
     
      <div class="logs__body">
        <div>
          <input bind:value={logFilter.startDate} type="date" class="u-form-control"/>
          <input bind:value={logFilter.search} placeholder="Buscar..." autocomplete="false" class="u-form-control" />
          <button class="search-losg" on:click={getLogs}>Buscar</button>
        </div>
    
        <table class="log-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Usuario</th>
              <th>Evento</th>
              <th>Moneda</th>
              <th>Monto</th>
              <th>Balance</th>
              <th>Acumulado</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {#each logs as item  }
          <tr>
            <td>{moment(item.timestamp).format('DD/MM/YY HH:mm:ss')}</td>
            <td>{item.LoggedUser}</td>
            <td>{item.type}</td>
            <td>{item.currencyISO}</td>
            <td class="money">{item.type=='Login'?'-':item.totalMoney}</td>
            <td class="money">{item.balance}</td>
            <td class="money">{ item.type=='DEPOSITO_OK'? (Number(item.balance) + Number(item.totalMoney)).toFixed(2):'-' }</td>
            <td>{item.message}</td>
          </tr>
          {/each}
          </tbody>
          {#if loading}
          <caption>Cargando...</caption>
          {/if}
        </table>
        <span class="logs__header">Total: {(logs?.length) } registros</span>
      </div>
    </div>
</Modal>





<style>
  .money{ text-align: right;}
  tbody tr:hover{
    background-color: #c0c0c0;
  }
  tr:nth-child(even){
    background-color: #f2f2f2;
  }
  .log-table td{
    padding:0.2rem 0.7rem;
  }
   .logs-body {
    background-color: white;
    padding: 20px; 
    max-height: 500px; 
    overflow-y: auto; 
   
  }
  .logs__header {
    font-size: 18px; 
    font-weight: bold; 
  }

  .config-wrapper{
    color:white;
  }

  .config-wrapper > div{
    padding:1rem;

  }
  .config-wrapper > div a{
    color:#fafafa;
  }
  input {
    padding: 8px; 
    border: 1px solid #ccc; 
    border-radius: 4px; 
    font-size: 14px; 
  }

  button.search-losg {
  padding: 8px 16px; 
  background-color: #BD992A; 
  color: #fff; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
}
button.search-losg:hover {
  background-color: #d19e06;
}
  
 
</style>