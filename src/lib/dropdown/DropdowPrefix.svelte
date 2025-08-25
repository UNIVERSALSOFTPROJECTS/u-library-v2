<script>
    import { onMount } from 'svelte';
    let url_global = "https://d1dkqs4jlldj3s.cloudfront.net/generic_imgs";

    export let countries;
    export let country = countries[0].prefix;

    let selectedFlag = countries[0].flag;

    function selectOption(a) {
      country = a.prefix;
      selectedFlag = a.flag;
      isDropdownOpen = false;
    }
    
    //todo es el el DROPSOW y puede estar el utils o algo asi, preguntar a apndo, este tipo de dropdow te borra el texto inicial al cambiar
    let selectedOption = '';
    let isDropdownOpen = false;
    const toggleDropdown = () => { isDropdownOpen = !isDropdownOpen }
    
    onMount(() => {
        const handleClickOutside = (e) => { if (!e.target.closest('.dropdown.prefix')) isDropdownOpen = false }
        document.addEventListener('click', handleClickOutside);
        return () => { document.removeEventListener('click', handleClickOutside) };
    });
  </script>
  
  <div class="dropdown prefix">
    <button type="button" class="slc signup__prefix" on:click={toggleDropdown}>
		<!-- signup__prefix  {classModal}__prefix -->
        <img src="{url_global}/flags/{selectedFlag}.png" alt="{selectedFlag}-country">{country}
    </button>
    {#if isDropdownOpen}
      <div class="dropdown-menu">
          {#each countries as country}
                <button type="button" class="btn signup__prefix" on:click={() => selectOption(country)}>
                    <img src="{url_global}/flags/{country.flag}.png" alt="{selectedFlag}-country">
                    {country.prefix}
                </button>
          {/each}
      </div>
    {/if}
  </div>
  