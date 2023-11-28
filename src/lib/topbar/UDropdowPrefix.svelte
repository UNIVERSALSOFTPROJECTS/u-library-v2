<script>
    import { onMount } from 'svelte';
    const url_global = "https://assets.apiusoft.com/generic_imgs";
    const fullCountryList= [{prefix: "+51", flag: "pe", code: "PE"},{prefix: "+54", flag: "ar", code: "ARS"}];
    export let countries;
    export let countryPrefix;
    export let countryCode;
    let selectedFlag;
    //export let countryPrefix = countries[0].prefix;
   // export let countryCode = countries[0].code;
    //let selectedFlag = countries[0].flag;

    onMount(()=>{
      countryPrefix = fullCountryList.find( e=> e.code == countries[0] ).prefix;
      countryCode   = fullCountryList.find( e=> e.code == countries[0] ).code;
      selectedFlag  = fullCountryList.find( e=> e.code == countries[0] ).flag;
      console.log(countryPrefix);
    });
    
    function selectOption(country_) {
      countryPrefix = country_.prefix;
      countryCode = country_.code;
      selectedFlag =country_.flag;
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
		<!-- singup__prefix  {classModal}__prefix -->
        <img src="{url_global}/flags/{selectedFlag}.png" alt="{selectedFlag}-country">{countryPrefix}
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
  