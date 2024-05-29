<script>
    import { onDestroy, onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { watchResize } from "svelte-watch-resize";
    import { isMobile } from "mobile-device-detect";

    export let open;
    export let modalOpened = "";
    export let title = "";
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

    const resizeHeightModal = () => { 
        if (open) {
            let isLandscape = window.matchMedia("(orientation: landscape)").matches;
            let inputIsFocused = document.activeElement.tagName === 'INPUT';
            heightModal = isLandscape?"auto":(inputIsFocused? window.innerHeight:visualViewport.height)+"px"; 
        }
    }
    
    const lockTouchZoom = (e) => { if (e.touches.length > 1) e.preventDefault(); }

    $: statusModal(open);

    onMount(() => { window.addEventListener('resize', resizeHeightModal); });
    onDestroy(() => { window.removeEventListener('resize', resizeHeightModal); });
</script>

{#if open}
    <div class="{subModalOpened?'sub':''} modal {modalOpened || subModalOpened}" on:touchstart={lockTouchZoom} on:touchmove={lockTouchZoom} use:watchResize={resizeHeightModal}>
        <div class="modal-dialog {isMobile?'':'centered'}" transition:fly={{ y: -50, duration: 500 }}>
        <div class="modal-content" style="max-height:{heightModal}">
            <div class="modal-header">
            <div />
            <div>{title}</div>
            <button class="btn close" on:click={() => (open = false)} />
            </div>
            <slot />
        </div>
        </div>
    </div>
{/if}