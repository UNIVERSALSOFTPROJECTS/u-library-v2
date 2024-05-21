<script>
    import { onMount } from 'svelte';
  
    export let bonus;
    export let user;

    let isDropdownOpen = false;
    
    const toggleDropdown = () => { isDropdownOpen = !isDropdownOpen; }
    
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
    <button class={bonus.length > 1?'slc':'btn'} on:click={toggleDropdown}>
        <b>{bonus[0].name} :</b> <span> {user.currency}</span>
    </button>
    {#if isDropdownOpen && bonus.length > 1}
      <div class="dropdown-menu">
          {#each bonus as bono}
                <div>
                    <b>{bono.name}:</b>
                    <span>{bonus.amount} {bono.currencyISO}</span>
                </div>
          {/each}
      </div>
    {/if}
  </div>

  
  