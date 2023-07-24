<script>
  import { onMount } from 'svelte';

  let options = ['Opción 1', 'Opción 2'];
  //let options = [
  //  {prefix:"+57",country:"col"},
  //  {prefix:"+58",country:"ven"}
  //];
  let selectedOption = '';
  let isDropdownOpen = false;
  
  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }
  
  function selectOption(option) {
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
</script>

<div class="dropdown">
  <button class="slc" on:click={toggleDropdown}>
    {selectedOption || 'Selecciona una opción'}
  </button>
  {#if isDropdownOpen}
    <div class="dropdown-menu">
        {#each options as option}
            <button class="btn" on:click={() => selectOption(option)}>{option}</button>
        {/each}
    </div>
  {/if}
</div>
<style>
    .dropdown > *{
        color: #000;
    }
    .btn{
        text-align: left;
        border-radius: 0;
    }
</style>

