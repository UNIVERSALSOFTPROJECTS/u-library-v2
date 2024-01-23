
<script>
 
 export let fetchLogs;
 export let filter = { startDate: '', search: '',listLogs:"" };

 function logSearch() {
  filter.listLogs = '';
  fetchLogs(filter);
}
</script>

<div class="modal-log">
  <div class="modal-content">
    <span class="close" >&times;</span>
    <h2>Registro de log {(filter.listLogs?.length) }</h2>
    <div class="search-container">
      <input bind:value={filter.search} placeholder="Ingrese usuario" id="searchInput"  autocomplete="false" />
      <input bind:value={filter.startDate} type="date" id="dateInput"  />
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

  .modal-log {

  }

  .modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 600px;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
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