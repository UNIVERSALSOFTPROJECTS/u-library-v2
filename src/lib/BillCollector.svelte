<script>
	import { onMount } from "svelte";
  import moment from "moment";
  import Modal from "./Modal.svelte";
  import notify from "../js/notify";
  import Notifier from "./Notifier.svelte";
  import EventManager from "../js/EventManager";

  export let user;	
  export let configs;
  export let configOpen=true;
  export let activeBillCollector;
  let loading;
  let logsOpen=false;
  let internetReconnect=0;
  let messengerInf="";
  let messageSaving="";
  let showNotifyModal = false;
  let machineCrashed = false;
  let notifyData = {};

	let logFilter = { startDate: moment().format("YYYY-MM-DD"), search: "" };
	let logs = [];
  let prevUsername;
	$:{
   
		  if(user  && activeBillCollector && isNewUser() && billCollectorActive() && isWinWebview()) sendToWinWebview('setUser', user);
    	if(!user && activeBillCollector && billCollectorActive() && isWinWebview()) sendToWinWebview('onLogout', {});
      
      //if( machineCrashed===true && showNotifyModal==false) showNotifyModal=true; 
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
      if(!configs.billCollector){
        messageSaving="Apagando Billetero. Espere...";
        sendToWinWebview('onLogout', {});
        console.log("avisando shutdown");

      }else{
        window.location.reload();
      }
      notify.success("Configuracion Guardada");
      //window.location.reload();
      configOpen=false;
    } catch (error) {
        console.error("Error al guardar la configuración:", error);
        notify.success("Fallo al guardar Configuracion");
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
    if(!isWinWebview()) {messengerInf ="No esta usando UniversalPOS"; return;};
    logs=[];
    loading=true;
    messengerInf='';
    sendToWinWebview("getLogs", logFilter);
  }

  onMount(()=>{
    notify.setEM(EventManager);
    logs=[];
  if(isWinWebview()){
    window.chrome.webview.addEventListener('message', function (e) {
        console.log("mensaje recibido C#:",e.data);
        let data=JSON.parse(e.data);
        switch(data.action){
          case 'getLogs': logs = data.data; break;
          case 'shutdownOk': window.location.reload(); break;
          case 'notify': showNotifyAll(data); break;
          
        }
        loading=false;
        
      });
  }else{console.log("Billetero no funcionara! no esta usando la aplicacion UniversalPOS.");}
  });

  const handleOnline=()=>{
    console.log("Conectado a internet ", internetReconnect);
    if(user) sendToWinWebview('setUser', user);
    
  }
  const showNotifyAll = (result) => {
    notifyData = result;
    console.log("Notify", notifyData);
    notifyData.title=getNotifyTitle();
    showNotifyModal = true;
    //if( result.type=='error' ) machineCrashed= true;
    
  };
  const handleOffline=()=>{
    console.log("Desconetado a internet ");
    onLogginExitUserCurrent();
  }
  const onLogginExitUserCurrent=()=>{
    const u = sessionStorage.getItem("user");
    if(u){
      sessionStorage.removeItem("user");
      sendToWinWebview('onLogout', {});
    }

  }


  window.addEventListener('online', handleOnline);
  window.addEventListener('offiline', handleOffline);

  /*action,
code,
message,
type
*/
const ERROR_CODES = {
    'INVALID_GET_LOGS': 'Error al obtener registros de logs.' ,
    'INVALID_CURRENCY': 'Tipo de moneda no permitido.' ,
    'BILLCOLLECTOR_DISCONNECT': 'El billetero está desconectado.' ,
    'LOGOUT_ERROR': 'Error al cerrar sesión.' ,
    'BILLCOLLECTOR_CONNECTED': 'El billetero está conectado.',
    'BILLCOLLECTOR_INITIALIZE_ERROR': 'Error al inicializar el billetero.' ,
    'TOKEN_EXPIRED': 'Token expirado.' ,
    'ERROR': 'Error general.',
    'DEPOSIT_TO_INCORRECT_USER': 'Depósito en usuario incorrecto.',
    'USER_NOT_FOUND': 'Usuario no encontrado.' ,
    'ERROR_NETWORK': 'Error de red.' ,
    'DEPOSITO_OK': 'Depósito exitoso.' ,
    'DEPOSITO_FALLO': 'Fallo en el depósito.' ,
    'GENERAL_ERROR': 'Error general.' ,
    'BILLCOLLECTOR_DISCONECT':'El billetero está desconectado.'
  };

  const getNotifyTitle=()=>{
    let title="";
    switch(notifyData.type){
      case 'error': title='ERROR'; break;
      case 'warning': title='PRECAUCION'; break;
      case 'info': title= 'INFORMACION'; break;
      case 'success': title= 'EXITO'; break;
    }
    return title;
  }

</script>
<Modal open={configOpen} title="Configuracion Billetero">
  <div class="config-wrapper"> 
    <div>
      <p class="messenger-info">{messageSaving}</p>
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
<Modal bind:open={showNotifyModal} title={notifyData.title}>
  <div class="config-wrapper" style="background-color: aliceblue;"> 
    
    <div style="margin: 0; text-align: center; font-weight: bold;color: black;">

      {#if notifyData.type === 'error'}
        <div class="icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#dc3545" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
          </svg>
        </div>
      {/if}
    
      {#if notifyData.type === 'warning'}
        <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#ffc107" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
        </svg>
      </div>
      {/if}
    
      <p>{ERROR_CODES[notifyData.code]}</p>
    
      {#if /error|warning/.test(notifyData.type)}
        <p style="padding:5px; color: #888;">{notifyData.message} :: {notifyData.data || ''} </p>
      {/if}
    </div>
    
  </div>
</Modal>

<Modal open={logsOpen} title="Historial Billetero">
    <div class="logs-body">
      <p class="messenger-info">{messengerInf}</p>
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

<Notifier />




<style>
  .icon-wrapper{
    text-align: center;
    padding:1rem;
  }
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
.messenger-info {
  
    color: blue; 
    font-size: 14px; 
    margin: 10px; 
    
}
  
 
</style>