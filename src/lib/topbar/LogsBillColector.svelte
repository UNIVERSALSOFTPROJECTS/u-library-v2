
<script>
 
 export let fetchLogs;
 export let filter = { startDate: '', search: '',listLogs:"" };

 function logSearch() {
  filter.listLogs = '';
  fetchLogs(filter);
}
</script>


<div class="logs-body">
  <span class="logs__header">Total: {(filter.listLogs?.length) }</span>
  <div class="logs__body">
    <div class="search-container">
      <input bind:value={filter.search} placeholder="Ingrese usuario" id="searchInput" autocomplete="false" />
      <input bind:value={filter.startDate} type="date" id="dateInput" />
      <button on:click={logSearch}>Buscar</button>
    </div>

    <div class="log-list">
      {#each filter.listLogs as item  }
        <div class="log-item">{JSON.stringify(item)}</div>
      {/each}
    </div>
  </div>
</div>

<style>
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
  .search-container {
    margin-bottom: 15px; 
  }
  .search-container {
    display: flex;
    align-items: center; 
  }
  input {
    margin-right: 10px; 
    padding: 5px;
  }

  button {
    padding: 5px 10px;
    background-color: #007bff; 
    color: #fff; 
    border: none;
    cursor: pointer;
  }
    .log-list {
    margin-top: 10px; /* Ajusta según sea necesario */
    padding: 10px; /* Ajusta según sea necesario */
    border: 1px solid #ccc; /* Ajusta según sea necesario */
    border-radius: 5px; /* Ajusta según sea necesario */
  }

  .log-item {
    list-style-type: none; /* Elimina los puntos de la lista */
    margin-bottom: 5px; /* Ajusta según sea necesario */
    padding: 5px; /* Ajusta según sea necesario */
    border: 1px solid #ddd; /* Ajusta según sea necesario */
    border-radius: 3px; /* Ajusta según sea necesario */
  }
</style>