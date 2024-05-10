<script>
    import { onDestroy, onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { watchResize } from "svelte-watch-resize";
    import { isMobile } from "mobile-device-detect";

    export let open;
    export let modalOpened = "";
    export let title = "";
    export let showHeader = true;
    export let subModalOpened = "";

    let heightModal;
    
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

    const resizeHeightModal = () => { 
      if (open) {
        let isLandscape = window.matchMedia("(orientation: landscape)").matches;
        let inputIsFocused = document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA'; 
        heightModal = isLandscape?"auto":(inputIsFocused? window.innerHeight:visualViewport.height)+"px"; 
      }
    }

    const interval = setInterval(resizeHeightModal, 250);

    $: statusModal(open);

    onDestroy(() => { clearInterval(interval); });
    
</script>

{#if open}
  <div class="{subModalOpened?'sub':''} modal {modalOpened || subModalOpened}" on:touchstart={lockTouchZoom} on:touchmove={lockTouchZoom} use:watchResize={resizeHeightModal} style="max-height:{heightModal}">
    <div class="modal-dialog {isMobile?'':'centered'}" transition:fly={{ y: -50, duration: 500 }}>
      <div class="modal-content {!showHeader?'no-header':''}" > <!--   Error en APK de momento no se usara-->
        {#if showHeader}
            <div class="modal-header">
            <div />
            <div>{title}</div>
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