<script>
  import { onMount } from "svelte";
  import { Button, Pagination, PaginationItem, Table } from "sveltestrap";

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

<nav class="page navigation example">
  <span>Total {total} items.</span>
  <Pagination>
    <!--<PaginationItem disabled={current <= 1}>
      <Button class="page-link" on:click={() => onPageClick("prev")}>
        <span aria-hidden="true">&laquo;</span>
      </Button>
    </PaginationItem>
  -->
    {#each pages as page}
      <PaginationItem active={current == page}>
        <Button class="page-link" on:click={() => onPageClick(page)}>
          {page}
        </Button>
      </PaginationItem>
    {/each}

    <!--<PaginationItem disabled={current >= range.length}>
        <Button class="page-link" on:click={() => onPageClick("next")}>
          <span aria-hidden="true">&raquo;</span>
        </Button>
      </PaginationItem>-->
  </Pagination>
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
    }
  }
</style>
