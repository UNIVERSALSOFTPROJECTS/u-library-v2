<script>
    import { onDestroy, onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { watchResize } from "svelte-watch-resize";

    export let open;
    export let modalOpened = "";
    export let title = "";
    export let showHeader = true;
    export let subModalOpened = "";

    let heightModal;
    //let inputFocus;
    
    //Hay un conflicto con los dropdow XDDDD ptmr, f
    // const handleClickOutside = (e) => { console.log(e.target);
    //    if(!e.target.closest('.modal-content') || e.target.closest('.dropdown-menu button') ) open = false;
    //   }

    function statusModal(isActive) {
        if (subModalOpened) return;
        const body = document.body.classList;
        isActive ? body.add("modal-open"):body.remove("modal-open");
    }

    const lockTouchZoom = (e) => { if (e.touches.length > 1) e.preventDefault(); }

    //function resizeHeightModal() {
    //    heightModal = visualViewport.height; 
    //  inputFocus = document.activeElement;  d
    //  if(inputFocus && inputFocus.tagName === 'INPUT') inputFocus.blur();
    //}
    //
    //function closeVirtualKeyboard(focus) {
    //  if(focus) setTimeout(() => { heightModal = visualViewport.height; }, 500);
    //}
    //
    //$: closeVirtualKeyboard(inputFocus);
    $: statusModal(open);
</script>

{#if open}
  <div class="{subModalOpened?'sub':''} modal {modalOpened || subModalOpened}" on:touchstart={lockTouchZoom} on:touchmove={lockTouchZoom}>
    <div class="modal-dialog centered" transition:fly={{ y: -50, duration: 500 }}>
      <div class="modal-content {!showHeader?'no-header':''}" > <!--use:watchResize={resizeHeightModal} style="max-height:{heightModal}px"  Error en APK de momento no se usara-->
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