<script>
    import { onMount } from 'svelte';
  
    export let activedBonus;
    export let bonusView;
    export let currency;
    export let t;

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
    <button class={activedBonus.length > 1?'slc':'btn'} on:click={toggleDropdown}>
        <b>{t(`bonus.${bonusView.type}`)} :</b> <span>{bonusView.value} {currency}</span>
    </button>
    {#if isDropdownOpen && activedBonus.length > 1}
      <div class="dropdown-menu">
          {#each activedBonus as bonus}
                <div>
                    <b>{t(`bonus.${bonus.type}`)}:</b>
                    <span>{bonus.value} {currency}</span>
                </div>
          {/each}
      </div>
    {/if}
  </div>

  
  