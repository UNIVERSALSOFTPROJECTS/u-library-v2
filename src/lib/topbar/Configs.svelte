<script>
  export let configsAllowed;
  export let onShowCustomConfig;
 
</script>

<div >
  {#if configsAllowed.billCollector}
  <button on:click={()=>onShowCustomConfig('billColector')} class="btn config--btn" style="margin: 5px;">Billetero</button>
  <button on:click={()=>onShowCustomConfig('printer')} class="btn config--btn" style="margin: 5px;">Impresora</button>
  {/if}

</div>
