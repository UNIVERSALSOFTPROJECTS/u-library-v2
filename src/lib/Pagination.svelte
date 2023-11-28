<script>
  import { onMount } from "svelte";

  export let current;
  export let total;
  export let xpage;
  export let onPageClick;
  let pages = [];

  function generatePageRange() {
    let pages_ = [];
    const visiblePages = 5; // Número de páginas visibles en la paginación
    const totalPages = Math.ceil(total / xpage);
    const middlePage = Math.ceil(visiblePages / 2);
    let startPage = current - middlePage + 1;
    let endPage = current + middlePage - 1;

    if (startPage <= 0) {
      startPage = 1;
      endPage = Math.min(visiblePages, totalPages);
    } else if (endPage > totalPages) {
      startPage = Math.max(totalPages - visiblePages + 1, 1);
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages_.push(i);
    }
    return pages_;
  }
  onMount(() => {
    pages = generatePageRange();
  });
</script>

<nav aria-label="Page navigation" class="navigation">

  <span>Total {total} items.</span>
  <ul class="pagination">
    
    {#each pages as page}
      <li class="page-item {page === current ? 'active' : ''}">
        <button class="page-link" on:click={() => onPageClick(page)}>{page}</button>
      </li>
    {/each}
    
  </ul>
</nav>


<style>
  @media only screen and (max-width: 1024px) {
    .navigation {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  @media only screen and (min-width: 1025px) {
    .navigation {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
 /* Estilos generales del paginador */
.pagination {
  display: flex;
  justify-content: center;
}

/* Estilo de los elementos del paginador */
.page-item {
  list-style: none;
}

/* Estilo de los enlaces de los elementos del paginador */
.page-link {
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  margin: 0 2px;
  border: 1px solid #dee2e6;
  color: #000000;
  background-color: #fff;
  border-radius: 0.3rem;
}

/* Estilo de los botones activos */
.page-item.active .page-link {
  background-color: #0066ff;
  color: #fff;
  border: 1px solid #0066ff;
  border-radius: 0.3rem;
}



</style>
