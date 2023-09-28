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

<nav class="navigation">
  <span>Total {total} items.</span>
  <div class="buttons">
    {#each pages as page}
        <button class="btn page-link" on:click={() => onPageClick(page)}>
          {page}
        </button>
    {/each}
  </div>
</nav>

<style>
  @media (max-width: 1024px) {
    .navigation {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  @media (min-width: 1025px) {
    .navigation {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      color: black;
    }
    .buttons{
      display: flex;
      flex-direction: row;
      gap: 0.3rem;
    }
    .btn{
      color : rgb(0, 0, 0);
      height: 25px;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
    }
    .btn:active{
      background-color: rgb(0, 255, 255);
    }
  }
</style>
