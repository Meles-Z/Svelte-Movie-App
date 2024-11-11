<script lang="ts">
    import { search } from "$lib/api/searchApi";
  
    let debounceTimeout;
    let searchQuery = "";
    let showDropdown = false;
    let searchResult = { movies: [], tvShows: [] };
  
    const handleChange = async (e) => {
      console.log(e.target.value);
  
      debounceTimeout = setTimeout(async () => {
        if (searchQuery.trim().length > 0) {
          searchResult = await search(searchQuery);
          console.log("search result", searchResult);
          showDropdown = true;
        } else {
          searchResult = { movies: [], tvShows: [] };
          showDropdown = false;
        }
      }, 300); 
    };
  </script>

<!-- <a href="/">Home</a>
<a href="/explore">Explore</a>
<a href="/tvShows">Tv show</a> -->
<header
  class="bg-[#121212] p-4 sm:px-8 lg:px-28 text-yellow-400 fixed top-0 w-full z-50"
>
  <nav class="w-full flex gap-5 justify-between items-center">
    <div class="lg:flex items-center">
      <button>Hello</button>
    </div>
    <div class="flex justify-center flex-1 relative">
      <input
        on:input="{handleChange}"
        class="bg-gray-800 text-white w-full px-3 py-2 rounded"
        type="text"
        placeholder="Search"
      />
      {#if showDropdown && (searchResult.movies.length>0 || searchResult.tvShows.length>0)}
        <div
          class="absolute top-full left-0 z-0 w-full rounded-xl bg-gradient-to-t from-[#181818] to-black mt-2 max-h-96 overflow-y-auto shadow-lg animate-fadeInDown"
        >
          {#if searchResult.movies.length>0}
            <div class=" mb-4">
              <h2 class="text-xl text-yellow-400 mb-2">Movies</h2>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </nav>
</header>
