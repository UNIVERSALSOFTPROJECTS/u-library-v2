<script>
  export let configsAllowed;
  export let onShowCustomConfig;
 
</script>

<div>
  {#if configsAllowed.billCollector}
  <button on:click={()=>onShowCustomConfig('billColector')} class="btn config--btn">Billetero</button>
  {/if}

</div>
