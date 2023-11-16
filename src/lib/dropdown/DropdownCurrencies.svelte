<script>
    import { onMount } from "svelte";
    export let currencies;
    export let codeAgent;

    const onChangeCurrency = (option) =>{
        selectedOption = option.name;
        codeAgent = option.agent;
        isDropdownOpen = false;
    }

    //todo es el el DROPSOW y puede estar el utils o algo asi, preguntar a apndo, este tipo de dropdow te borra el texto inicial al cambiar
    let selectedOption = '';
    let isDropdownOpen = false;
    const toggleDropdown = () => { isDropdownOpen = !isDropdownOpen }
    
    onMount(() => {
        const handleClickOutside = (e) => {if (!e.target.closest('.dropdown.currencies')) isDropdownOpen = false; }
        document.addEventListener('click', handleClickOutside);
        return () => { document.removeEventListener('click', handleClickOutside) };
    });
</script>

  
<div class="dropdown currencies">
    <button type="button" class="slc" on:click={toggleDropdown}>{selectedOption || 'Seleccionar moneda'}</button>
    {#if isDropdownOpen}
        <div class="dropdown-menu">
            {#each currencies as currency}
                <button type="button" class="btn" on:click={() => onChangeCurrency(currency)}>{currency.name}</button>
            {/each}
        </div>
    {/if}
</div>


