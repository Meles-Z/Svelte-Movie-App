<script>
  import { onMount } from "svelte";
  import { similarMoviesPage, topRatedMoviesPage, visiblePageStore } from "$lib/store/store";
  export let pagenationType;
  let totalPages = 10;
  let visiblePages = 5;
  let pages = [];
  let currentPage = $pagenationType;

  if (typeof window !== "undefined") {
    const mediaQuery = window.matchMedia(`max-width:640px`);
    const handlerMediaQueryChange = (e) => {
      visiblePageStore.set(e.matches ? 3 : 5);
    };
    handlerMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener("change", handlerMediaQueryChange);
  }
  visiblePageStore.subscribe((value)=>{
    visiblePages = value;
    updatePage();
  })

  onMount(() => {
    updatePage();
  });

  function updatePage() {
    pages = [];
    let start = Math.max(
      1,
      Math.min(
        currentPage - Math.floor(visiblePages / 2),
        totalPages - visiblePages + 1
      )
    );
    let end = Math.min(totalPages, start + visiblePages - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    console.log(pages);
  }

  function setPage(page) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
    } else if (page < 1) {
      currentPage = 1;
    } else {
      currentPage = totalPages;
    }
    topRatedMoviesPage.set(currentPage);
    similarMoviesPage.set(currentPage);
    updatePage();
  }
  function goToPrevPage() {
    setPage(currentPage - 1);
  }
  function goToNextPage() {
    setPage(currentPage + 1);
  }
</script>

<div class="pagination">
  <button
    on:click="{goToPrevPage}"
    disabled="{currentPage === 1}"
    class="prevNext">Previous</button
  >
  {#each pages as page}
    <button class:active="{currentPage == page}">{page}</button>
  {/each}
  <button
    on:click="{goToNextPage}"
    disabled="{currentPage === totalPages}"
    class="prevNext">Next</button
  >
</div>

<style lang="postcss">
  .pagination {
    @apply flex justify-center mt-8;
  }

  .pagination button.active {
    @apply bg-white text-black;
  }

  .pagination button:disabled {
    @apply opacity-50 cursor-not-allowed;
  }

  .pagination .prevNext,
  button {
    @apply px-3 py-1 mx-1 text-white border border-gray-300 rounded hover:bg-gray-200 transition-colors duration-300;
    width: 6rem;
  }

  .pagination .prevNext:hover {
    @apply bg-gray-700;
  }

  @media (max-width: 640px) {
    .pagination button,
    .pagination .prevNext {
      width: 2rem;
      text-align: center;
    }
  }

  .prevNext {
    width: 3rem;
  }
</style>
