<script>
    export let loading;
</script>
{#if loading}
    <div class="container-loading">
      <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
      <span>Cargando...</span>
    </div>
{/if}
<style>
    .container-loading{
    position: absolute;
    gap: 0.5rem;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: white;
    padding: 0.8rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    vertical-align: center;
    background-color: rgba(0, 0, 0, 0.342);
  }
</style>