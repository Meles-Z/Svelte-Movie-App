<script lang="ts">
  import { goto } from "$app/navigation";
export let movie
import placeholder from "$lib/assets/placeholder.png"
function handleImageError(event){
    event.target.src=placeholder
}
</script>

<div 
 on:click="{() => {
              goto(`/details/${movie.id}`)}}"
class="bg-gray-800 text-white rounded-lg shadow-md overflow-hidden max-w-[17rem] cursor-pointer transition-all">
    <img 
    class="w-full object-cover"
    on:error="{handleImageError}"
    src={movie.poster_path? "https://image.tmdb.org/t/p/original"+movie.poster_path : placeholder} alt="poster">

    <div class="p-4">
        <h1 class="text-left md:text-[17px] text-sm font-semibold line-clamp-1 w-fit hover:underline">
            {movie.title}
        </h1>
        <p class="text-yellow-400 flex items-center mt-2 md:text-[15px] text-[13px]">
            Rating: {movie.vote_average.toFixed(2)}
        </p>
        <p class="text-gray-400">Language: {movie.original_language}</p>
        <p class="text-gray-400">Release: {movie.release_date}</p>
    </div>
</div>