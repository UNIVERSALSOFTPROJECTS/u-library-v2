<script>
  import { onMount } from 'svelte';

  export let idioms;
  export let changeIdiom;

  let isDropdownOpen = false;
  let url_global = "https://assets.apiusoft.com/generic_imgs";
  // let idiomDefault = idioms.find(idiom => idiom.id === localStorage.getItem('idiom'));
  let idiomDefault = (idioms ?? []).find(idiom => idiom.id === localStorage.getItem('idiom')) || {id: "es"};

  function selectOption(idiomSelected) {
    idiomDefault = idioms.find(idiom => idiom.id === idiomSelected);
    changeIdiom(idiomSelected);
    isDropdownOpen = false;
  }
  
  const toggleDropdown = () => { isDropdownOpen = !isDropdownOpen }
  
  onMount(() => {
      const handleClickOutside = (e) => { if (!e.target.closest('.dropdown.idiom')) isDropdownOpen = false }
      document.addEventListener('click', handleClickOutside);
      return () => { document.removeEventListener('click', handleClickOutside) };
  });
</script>
  
<div class="dropdown idiom">
  <button type="button" class="slc" on:click={toggleDropdown}>
      <img src="{url_global}/flags/{idiomDefault.id}.png" alt="{idiomDefault.id}-country">{idiomDefault.id}
  </button>
  {#if isDropdownOpen}
    <div class="dropdown-menu">
        {#each idioms as idiom}
          <button type="button" class="btn" on:click={() => selectOption(idiom.id)}>
            <img src="{url_global}/flags/{idiom.id}.png" alt="{idiom.id}-country">
            {idiom.id}
          </button>
        {/each}
    </div>
  {/if}
</div>