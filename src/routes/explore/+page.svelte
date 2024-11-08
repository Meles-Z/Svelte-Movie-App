<script lang="ts">
  import {
    getAllNowPlayingMovies,
    getAllPopularMovies,
    getAllUpcomingMovies,
  } from "$lib/api/exploreApi";
  import { getAllTopRatedMovies } from "$lib/api/homeApi";
  import Card from "$lib/components/Card.svelte";
  import CardLoader from "$lib/components/CardLoader.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import {
    explorePagePagination,
    nowPlayingLoading,
    topRatedLoading,
    upcomingLoaing,
    popularLoading
  } from "$lib/store/store";
  import { onMount } from "svelte";
  let currentView = {
    upcoming: true,
    nowPlaying: false,
    topRated: false,
    popular: false,
  };

  let explorePart;
  let initialLoad = true;
  let upcomingMovies = [];
  let nowPlayingMovies = [];
  let topRatedMovies = [];
  let popularMovies = [];
  onMount(async () => {
    initialLoad = false;
    upcomingMovies = await getAllUpcomingMovies();
    nowPlayingMovies = await getAllNowPlayingMovies();
    topRatedMovies = await getAllTopRatedMovies();
    popularMovies = await getAllPopularMovies();
  });

  function toggleView(view: keyof typeof currentView) {
    Object.keys(currentView).forEach((key) => {
      currentView[key] = key === view;
    });
    explorePagePagination.set(1);
  }

  explorePagePagination.subscribe(async (value) => {
    let apiTobeCalled = "";
    Object.keys(currentView).forEach((key) => {
      if (currentView[key]) {
        apiTobeCalled = key;
      }
    });
    switch (apiTobeCalled) {
      case "upcoming":
        upcomingMovies = await getAllUpcomingMovies(value);
        break;
      case "nowPlaying":
        nowPlayingMovies = await getAllNowPlayingMovies(value);
        break;
      case "topRated":
        topRatedMovies = await getAllTopRatedMovies(value);
        break;
      case "popular":
        popularMovies = await getAllPopularMovies(value);
        break;
      default:
        break;
    }
    if (!initialLoad && explorePart) {
      explorePart.scrollIntoView({ behavior: "smooth" });
    }
  });
</script>

<div bind:this="{explorePart}"></div>

<div class="flex flex-col sm:px-24 items-center gap-6">
  <h2 class="text-xl sm:text-3xl self-start font-bold text-yellow-400 my-4">
    Explore Moveis
  </h2>

  <div class="flex gap-2 mb-2">
    <div class="flex flex-col items-center">
      <button
        on:click="{() => {
          toggleView('upcoming');
        }}"
        class="md:text-base sm:text-sm text-xs font-semibold text-center lg:w-44 sm:w-36 w-fit sm:p-0 p-2 sm:h-16 h-10 hover:bg-[#121212]"
        >Upcoming</button
      >
      <div
        class="{`h-0.5 bg-blue-700 transition-all duration-200 ${currentView.upcoming ? 'w-full' : 'w-0'}`}"
      ></div>
    </div>

    <div class="flex flex-col items-center">
      <button
        on:click="{() => {
          toggleView('nowPlaying');
        }}"
        class="md:text-base sm:text-sm text-xs font-semibold text-center lg:w-44 sm:w-36 w-fit sm:p-0 p-2 sm:h-16 h-10 hover:bg-[#121212]"
        >Now Playing</button
      >
      <div
        class="{`h-0.5 bg-blue-500 transition-all duration-200 ${currentView.nowPlaying ? 'w-full' : 'w-0'}`}"
      ></div>
    </div>
    <div class="flex flex-col items-center">
      <button
        on:click="{() => {
          toggleView('topRated');
        }}"
        class="md:text-base sm:text-sm text-xs font-semibold text-center lg:w-44 sm:w-36 w-fit sm:p-0 p-2 sm:h-16 h-10 hover:bg-[#121212]"
        >Top Rated</button
      >
      <div
        class="{`h-0.5 bg-blue-500 transition-all duration-200 ${currentView.topRated ? 'w-full' : 'w-0'}`}"
      ></div>
    </div>
    <div class="flex flex-col items-center">
      <button
        on:click="{() => {
          toggleView('popular');
        }}"
        class="md:text-base sm:text-sm text-xs font-semibold text-center lg:w-44 sm:w-36 w-fit sm:p-0 p-2 sm:h-16 h-10 hover:bg-[#121212]"
        >Popular</button
      >
      <div
        class="{`h-0.5 bg-blue-500 transition-all duration-200 ${currentView.popular ? 'w-full' : 'w-0'}`}"
      ></div>
    </div>
  </div>
  <div
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
  >
    {#if currentView.upcoming && upcomingMovies.length > 0}
      {#each upcomingMovies as movie}
        <Card {movie} />
      {/each}
    {/if}

    {#if $upcomingLoaing}
      <CardLoader />
    {/if}

    {#if currentView.nowPlaying && nowPlayingMovies.length > 0}
      {#each nowPlayingMovies as movie}
        <Card {movie} />
      {/each}
    {/if}
    {#if $nowPlayingLoading}
      <CardLoader />
    {/if}

    {#if currentView.topRated && topRatedMovies.length}
      {#each topRatedMovies as movie}
        <Card {movie} />
      {/each}
    {/if}

    {#if $topRatedLoading}
      <CardLoader />
    {/if}

    {#if currentView.popular && popularMovies.length}
      {#each popularMovies as movie}
        <Card {movie} />
      {/each}
    {/if}
    {#if $popularLoading}
      <CardLoader />
    {/if}
  </div>
  <Pagination pagenationType="{explorePagePagination}" />
</div>
