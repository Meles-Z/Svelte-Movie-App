<script lang="ts">
  import Card from "$lib/components/Card.svelte";
import { topRatedMoviesPage } from "$lib/store/store";

  export let data;
  let { movieDetails, similarMovie, movieTailers } = data;
  console.log(data);
  $: {
    if (data) {
      similarMovie = data.similarMovie;
      movieDetails = data.movieDetails;
      movieTailers = data.movieTailers;
    }
  }
</script>

<div class="flex flex-col gap-8">
  <div class="relative w-full overflow-hidden">
    <div class="relative w-full h-[80vh] lg:h-[90vh]">
      <img
        class="w-full min-h-[300px] object-cover"
        src="{movieDetails.backdrop_path
          ? 'https://image.tmdb.org/t/p/original' + movieDetails.backdrop_path
          : ''}"
        alt=""
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black-to-transparent rounded"
      ></div>
      <div
        class="absolute sm:bottom-[8rem] bottom-0 left-0 sm:flex gap-4 px-4 cursor-pointer mt-40"
      >
        <img
          class="md:w-[250px] sm:w-[250px] w-[150px] opacity-95"
          src="{movieDetails.poster_path
            ? 'https://image.tmdb.org/t/p/original' + movieDetails.backdrop_path
            : ''}"
          alt=""
        />
        <div class="flex flex-col gap-2">
          <h1 class="lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-white">
            {movieDetails.title} ({movieDetails.release_date.split("-")[0]})
          </h1>
          <div
            class="flex flex-col mt-2 lg:text-xl md:text-lg sm:text-md text-slate-300 sm:gap-3 gap-1"
          >
            <p class="lg:text-xl md:text-lg text-md text-zink-400 line-clamp-3">
              {movieDetails.tagline}
            </p>
            <p class="lg:text-xl md:text-lg text-md text-zink-400 line-clamp-3">
              {movieDetails.overview}
            </p>
            <p class="lg:text-xl md:text-lg text-md text-zink-400 line-clamp-3">
              Genres: {#each movieDetails.genres as genre}
                <span>{genre.name}</span>
                {#if genre != movieDetails.genres[movieDetails.genres.length - 1]}
                  ,
                {/if}
              {/each}
            </p>
            <p class="lg:text-xl md:text-lg text-md text-zink-400 line-clamp-3">
              Rating: {movieDetails.vote_average.toFixed(2)}
            </p>
            <p class="lg:text-xl md:text-lg text-md text-zink-400 line-clamp-3">
              Original Language: {movieDetails.original_language}
            </p>
            <p class="lg:text-xl md:text-lg text-md text-zink-400 line-clamp-3">
              Release Date: {movieDetails.release_date}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sm:px-24 px-4">
    <h2 class="text-xl sm:text-3xl self-start font-bold text-yellow-400 mb-4">
      Watch Tailers
    </h2>
    <div class="sm:flex flex-wrap justify-between gap-8 overflow-x-auto mt-4">
      {#if movieTailers.length > 0}
        {#each movieTailers.slice(0, 5) as trailer}
          <div class="w-full sm:w-[80vw] md:w-[30vw] lg:[25vw]">
            <iframe
              width="100%"
              height="200"
              allowfullscreen
              src="{'https://www.youtube.com/embed/' + trailer.key}"
              frameborder="0"
            ></iframe>
            <p class="mt-2">{trailer.name}</p>
          </div>
        {/each}
      {:else}
        <p class="text-gray-400">No Tailers available</p>
      {/if}
    </div>
  </div>
  <div class="flex flex-col sm:px-24 px-4 items-center gap-6 mt-10">
    <h2 class="text-xl sm:text-3xl self-start font-bold text-yellow-400 mb-4">
      Similar Movies
    </h2>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
      {#if similarMovie.length > 0}
        {#each similarMovie as movie}
          <Card {movie} />
        {/each}
      {/if}
      
    </div>
  </div>
 
</div>
