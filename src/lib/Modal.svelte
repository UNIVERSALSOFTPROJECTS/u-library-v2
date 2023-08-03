<script>
  import { fly } from 'svelte/transition';
  export let open;
  export let modalOpened="";
  export let title="";

  function statusModal(isActive) {
    const body = document.body.classList;
    isActive?body.add('modal__open'):body.remove('modal__open');
  }
  $: statusModal(open);
</script>

{#if open}
  <div class="modal {modalOpened}">
    <div class="modal-dialog centered" transition:fly={{ y: -50, duration: 500 }}>
      <div>
      </div>
      <div class="modal-content">
          <div class="modal-header">
              <div></div>
              <div>{title}</div>
              <button class="btn close" on:click={()=> open=false}></button>
          </div>
          <slot></slot>
      </div>
    </div>
  </div>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!--div class="modal-backdrop"  on:click={()=>open=false}></div-->
{/if}
<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    width: 100vw;
    height: 100vh;
    opacity: .5;
    background-color: #000;
}
</style>