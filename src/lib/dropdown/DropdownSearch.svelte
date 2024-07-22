<script>
    import { onDestroy, onMount } from "svelte";
    import { watchResize } from 'svelte-watch-resize';
  
    export let dataSearched;
    export let onSelectBrand;
    export let t;

    let heightModal;
    let searchData = "";
    let selectedOption = t("gameOptions.selectProviders");
    let isDropdownOpen = false;
    
    function toggleDropdown() {
      searchData = "";
      isDropdownOpen = !isDropdownOpen;
    }
    
    function selectOption(option) {
      onSelectBrand(option)
      selectedOption = option;
      isDropdownOpen = false;   
    }
    
    onMount(() => {
      function handleClickOutside(event) {
        if (!event.target.closest('.dropdown')) {
          isDropdownOpen = false;
        }
      }
      
      document.addEventListener('click', handleClickOutside);
      
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    });

    const resizeHeightModal = () => { 
      let isLandscape = window.matchMedia("(orientation: landscape)").matches;
      let sizePC = visualViewport.width > 1023;
      heightModal = sizePC?400:(innerHeight - (isLandscape?150:400)) ; 
    }

    onMount(() => { window.addEventListener('resize', resizeHeightModal); });
    onDestroy(() => { window.removeEventListener('resize', resizeHeightModal); });

</script>
  
<div class="dropdown" >
    <button class="slc {isDropdownOpen?'active':''}" on:click={toggleDropdown}>{selectedOption}</button>
    {#if isDropdownOpen}
    <div class="dropdown-menu" use:watchResize={resizeHeightModal} style="max-height:{heightModal}px">
        <input type="search" class="ipt" bind:value={searchData} placeholder={t("gameOptions.searchProvider")}>
        <div class="dropdown-list" style="max-height:{heightModal - 42}px">
            {#each dataSearched as option}
            {#if option.id != 0 && option.name.toLowerCase().includes(searchData.toLowerCase())}
                <button class="btn {selectedOption == option.code?'active':''}" on:click={() => selectOption(option.code)}>
                    <p>{option.code}</p>
                    <p>({option.total})</p>
                </button>
            {/if}
            {/each}
        </div>
    </div>
    {/if}
</div>
  
  