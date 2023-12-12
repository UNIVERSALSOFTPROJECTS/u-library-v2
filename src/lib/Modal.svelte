<script>
  import { onDestroy, onMount } from "svelte";
  import { fly } from "svelte/transition";
  export let open;
  export let modalOpened = "";
  export let title = "";
  export let showHeader = true;
  //Hay un conflicto con los dropdow XDDDD ptmr, f
  // const handleClickOutside = (e) => { console.log(e.target);
  //    if(!e.target.closest('.modal-content') || e.target.closest('.dropdown-menu button') ) open = false;
  //   }

  function statusModal(isActive) {
    const body = document.body.classList;
    if (isActive) {
      body.add("modal-open");
      //document.addEventListener('click', handleClickOutside);
    } else {
      body.remove("modal-open");
      //document.removeEventListener('click', handleClickOutside)
    }
  }

  const lockTouchZoom = (e) => { if (e.touches.length > 1) e.preventDefault(); }

  $: statusModal(open);
</script>

{#if open}
  <div class="modal {modalOpened}" on:touchstart={lockTouchZoom} on:touchmove={lockTouchZoom}>
    <div
      class="modal-dialog centered"
      transition:fly={{ y: -50, duration: 500 }}
    >
      <div class="modal-content {!showHeader?'no-header':''}">
        {#if showHeader}
        <div class="modal-header">
            <div />
            <div style="color: white;">{title}</div>
            <button class="btn close" on:click={() => (open = false)} />
            </div>
            {/if}
        <slot />
      </div>
    </div>
  </div>
{/if}
<style>
  .no-header{
    display: flex;
    background: none;
    align-items: center;
    justify-content: center;
    height: auto;
    overflow: inherit;
  }
</style>