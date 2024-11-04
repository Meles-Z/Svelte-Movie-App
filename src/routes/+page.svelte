<script>
  import { browser } from "$app/environment";
  import Carousel from "svelte-carousel";

  export let data;
  let upcomingMovies = data.upComingMovies;
  console.log(data);
</script>

{#if browser}
  <div class="w-full justify-center items-center gap-8 text-white">
    <div class="relative w-full">
      <Carousel dots="{false}">
        {#each upcomingMovies as movie}
          <div class="relative w-full h-[70vh] cursor-pointer">
            <img
              src="{'https://image.tmdb.org/t/p/original' +
                movie.backdrop_path}"
              alt="Backdrop"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black to to-transparent rounded"
            ></div>
            <div
              class="absolute sm:bottom-0 bottom-[6rem] left-0 sm:flex gap-4 items-end px-4 mt-40"
            >
              <img
              class="md:w-[250px] sm:w-[250;x] w-[150px opacity-95"
                src={"https://image.tmdb.org/t/p/w780" + movie.poster_path}
                alt="Poster"
              />
              <div class="flex flex-col gap-2">
                <h1 class="lg:text-4xl md:tex-3xl sm:text-2xl text-xl text-white mx-w-[450px]">{movie.title}</h1>
                <p class="lg:text-xl md:text-zinc-400 line-clamp-3">{movie.overview}</p>
                <p class="lg:text-xl md:text-zinc-400 line-clamp-3">Rating: {movie.vote_average}</p>
                <p class="lg:text-xl md:text-zinc-400 line-clamp-3">Vote Count: {movie.vote_count}</p>
              </div>
            </div>
          </div>
        {/each}
      </Carousel>
    </div>
  </div>
{/if}
