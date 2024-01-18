<script>
  import { onMount } from "svelte";
  export let bonus;
  let isOpen = false;




onMount(()=>{
  console.log("bonus", bonus);
})
  
  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function closeDropdown() {
    isOpen = false;
  }

  function bonusExists() {
    let exists=false;
    if(bonus && bonus.find(e => e.amount !== 0)) exists = true;
    return exists;
  }
</script>

<div class="dropdown-container">
  <button class="btn" on:click={toggleDropdown} on:blur={closeDropdown}>
    {bonusExists() ? 'No hay bonos' : 'Bonos ▼'}
 </button>


  {#if isOpen}
    <div class="dropdown">
      <ul>
          {#each bonus as bono}
          {#if bono.amount > 0}
            <li>
              <div class="bono">
                <span class="tipo">{bono.name}</span>
                <span class="currency">{bono.currencyISO}</span>
                <span class="amount">{bono.amount}</span>
              </div>
            </li>
          {/if}
          {/each}
      </ul>
    </div>
  {/if}
</div>

<style>

  .dropdown-container {
    position: relative;
  }
  .btn{
    border-radius: 0.2rem;
    border: none;
  }
  .btn:focus-visible {
      outline: 0;
    }

  .dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #737373;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 200px;
    max-height: 200px;
    overflow-y: auto;
    transition: opacity 0.2s ease;
    z-index: 1;
    border-radius: 0.5rem;
    font-size: 1.2em;
  }

  .bono {
    padding: 8px;
    border-bottom: 1px solid #ccc; /* Línea divisoria entre elementos */
    display: flex;
    justify-content: space-between;
  }

  .tipo {
    flex: 1; /* Distribuye el espacio uniformemente entre las partes */
    color: rgb(255, 255, 255); /* Color de texto negro */
  }

  .currency, .amount {
    flex: 1;
    text-align: right; /* Alinea el texto a la derecha */
  }

 
</style>

