<script>
  import Config from './Config.svelte';
  import { onMount } from "svelte";

  export let configs;
  export let onShowConfigs1;

  let config_ = { ...configs }; 

  onMount(() => {
    console.log("configs", configs);
  });

  const saveConfig = () => {
    try {
      // Aplicar los cambios a configs solo cuando el usuario hace clic en "Guardar"
      configs = { ...config_ };

      // Almacenar todo el objeto config en el localStorage
      localStorage.setItem("config", JSON.stringify(configs));
    } catch (error) {
      console.error("Error al guardar la configuración:", error);
    }
  };
</script>

<div class="config-body">
  <span class="config__header">Estado del billetero:</span>
  <div class="config__body">
    <label for="bill-collector-config"> 
      <input id="bill-collector-config" type="checkbox" bind:checked={config_.billCollector}> 
      Billetero 
    </label>
    <button on:click={onShowConfigs1}>show logs</button>
    <button on:click={saveConfig} class="btn config--btn">Guardar</button>
  </div>
</div>
