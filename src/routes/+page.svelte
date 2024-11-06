<script>
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { getAllTopRatedMovies } from "$lib/api/homeApi";
  import Card from "$lib/components/Card.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import { topRatedMoviesPage } from "$lib/store/store";
  import { onMount } from "svelte";
  import Carousel from "svelte-carousel";

  export let data;
  let upcomingMovies = data.upComingMovies;
  let topRatedMovies = data.topRatedMovies;
  let topRatedPart;
 
  console.log(data);

  let particleToShow = 5;

  function updateParticlesToShow() {
    const widhth = window.innerWidth;
    if (widhth >= 1024) {
      particleToShow = 4;
    } else if (widhth >= 768) {
      particleToShow = 3;
    } else {
      particleToShow = 2;
    }
  }
  let initLoad = true;
  onMount(() => {
    updateParticlesToShow();
    initLoad = false;
  });
  let topCarousel;
  let bottomCarousel;

  function handleNextTopCarousel() {
    topCarousel.goToNext();
  }
  function handlePrevTopCarousel() {
    topCarousel.goToPrev();
  }

  function handleNextBottomCarousel() {
    bottomCarousel.goToNext();
  }
  function handlePrevBottomCarousel() {
    bottomCarousel.goToPrev();
  }
  topRatedMoviesPage.subscribe(async (value) => {
    topRatedMovies = await getAllTopRatedMovies(value);
    if (!initLoad && topRatedPart) {
      topRatedPart.scrollIntoView({ behavior: "smooth" });
    }
  });
</script>

{#if browser}
  <div class="w-full justify-center bg-black items-center gap-8 text-white">
    <div class="relative w-full">
      <Carousel
        bind:this="{topCarousel}"
        dots="{false}"
        autoplay
        autoplayDuration="{2000}"
      >
        <div
          slot="next"
          on:click="{handleNextTopCarousel}"
          bind:this="{topCarousel}"
        >
          <div
            class="absolute z-40 cursor-pointer bg-white right-4 rounded-full p-2 top-1/3 md:1/4 lg:top-1/3 transform -translate-y-1/2"
          >
            <img
              class="w-4 h-4 md:h-5 lg:w-7 lg:w-7"
              src="https://img.icons8.com/ios-glyphs/30/chevron-right.png"
              alt="chevron-right"
            />
          </div>
        </div>
        <div slot="prev" on:click="{handlePrevTopCarousel}">
          <div
            class="absolute z-40 cursor-pointer bg-white left-4 rounded-full p-2 top-1/3 md:1/4 lg:top-1/3 transform -translate-y-1/2"
          >
            <img
              class="w-4 h-4 md:h-5 lg:w-7 lg:w-7"
              src="https://img.icons8.com/ios-glyphs/30/chevron-left.png"
              alt="chevron-left"
            />
          </div>
        </div>
        {#each upcomingMovies as movie}
          <div
            on:click="{() => {
              goto(`/details/${movie.id}`);
            }}"
            class="relative w-full h-[70vh] cursor-pointer"
          >
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
                src="{'https://image.tmdb.org/t/p/w780' + movie.poster_path}"
                alt="Poster"
              />
              <div class="flex flex-col gap-2">
                <h1
                  class="lg:text-4xl md:tex-3xl sm:text-2xl text-xl text-white mx-w-[450px]"
                >
                  {movie.title}
                </h1>
                <p class="lg:text-xl md:text-zinc-400 line-clamp-3">
                  {movie.overview}
                </p>
                <p class="lg:text-xl md:text-zinc-400 line-clamp-3">
                  Rating: {movie.vote_average}
                </p>
                <p class="lg:text-xl md:text-zinc-400 line-clamp-3">
                  Vote Count: {movie.vote_count}
                </p>
              </div>
            </div>
          </div>
        {/each}
      </Carousel>
    </div>
    <div class="relative flex items-center mt-24">
      <div class="w-full"></div>
      <Carousel
        bind:this="{bottomCarousel}"
        dots="{false}"
        particlesToShow="{5}"
      >
        <div slot="next" on:click="{handleNextBottomCarousel}">
          <div
            class="absolute z-40 cursor-pointer bg-white right-4 rounded-full p-2 top-1/3 md:1/4 lg:top-1/3 transform -translate-y-1/2"
          >
            <img
              class="w-4 h-4 md:h-5 lg:w-7 lg:w-7"
              src="https://img.icons8.com/ios-glyphs/30/chevron-right.png"
              alt="chevron-right"
            />
          </div>
        </div>
        <div slot="prev" on:click="{handlePrevBottomCarousel}">
          <div
            class="absolute z-40 cursor-pointer bg-white left-4 rounded-full p-2 top-1/3 md:1/4 lg:top-1/3 transform -translate-y-1/2"
          >
            <img
              class="w-4 h-4 md:h-5 lg:w-7 lg:w-7"
              src="https://img.icons8.com/ios-glyphs/30/chevron-left.png"
              alt="chevron-left"
            />
          </div>
        </div>
        {#each upcomingMovies.slice(1) as movie, index}
          <div
            on:click="{() => {
              goto(`/details/${movie.id}`);
            }}"
            class="px-2 cursor-pointer relative"
          >
            <h1 class="absolute z-40 botton-0 font-extrabold">{movie.title}</h1>
            <div
              class="absolute z-30 inset-0 bg-gradient-to-t opacity-65 from-black-to-transparent rounded"
            ></div>
            <img
              class="w-full cursor-pointer transition duration-500 ease-in-out transform hover:opacity-100"
              src="{'https://image.tmdb.org/t/p/original' +
                movie.backdrop_path}"
              alt="Backdrop"
            />
          </div>
        {/each}
      </Carousel>
    </div>
    <div bind:this="{topRatedPart}"></div>
    <div class="pt-20 sm:px-10 mt-9">
      <div class="p-4 flex flex-col items-center gap-6">
        <h2 class="text-3xl self-start font-bold text-yellow-400 mb-4">
          Top Rated Movies
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {#each topRatedMovies as movie}
            <Card {movie} />
          {/each}
        </div>
      </div>
    </div>
    <Pagination pagenationType="{topRatedMoviesPage}" />
  </div>
{/if}
