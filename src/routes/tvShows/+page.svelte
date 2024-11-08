<script>
    import { browser } from "$app/environment";
  import { getTopRatedTvShows } from "$lib/api/tvShows";
    import Card from "$lib/components/Card.svelte";
    import Pagination from "$lib/components/Pagination.svelte";
    import { topRatedMoviesPage, topRatedTvPage } from "$lib/store/store";
    import { onMount } from "svelte";
  
    export let data;
    let topRatedTvShow = data.topRatedTvShows;

    let topRatedPart;
    let initialLoad = true;
    onMount(() => {
      topRatedMoviesPage.set(1)
      initialLoad=false;
    });
   
    topRatedTvPage.subscribe(async (value) => {
      topRatedTvShow = await getTopRatedTvShows(value);
      if (initialLoad) {
        initialLoad = false;
      } else if (topRatedPart) {
        topRatedPart.scrollIntoView({ behavior: "smooth" });
      }
    });
  </script>
  
  {#if browser}
    <div class="w-full justify-center bg-black items-center gap-8 text-white">
      <div bind:this="{topRatedPart}"></div>
      <div class="pt-20 sm:px-10 mt-9">
        <div class="p-4 flex flex-col items-center gap-6">
          <h2 class="text-3xl self-start font-bold text-yellow-400 mb-4">
            Top Rated Tv Shows
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {#each topRatedTvShow as movie}
              <Card  movie={movie} />
            {/each}
          </div>
        </div>
      </div>
      <Pagination pagenationType={topRatedTvPage} />
    </div>
  {/if}
  