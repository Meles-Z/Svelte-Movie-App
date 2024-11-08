<script lang="ts">
    import Placeholder from "$lib/assets/placeholder.png"
  const arr = new Array(20).fill(0);
</script>

{#each arr as item}
  <div
    class="max-w-xs max-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg"
  >
    <div
      class="relative bg-gray-800 animate-pulse flex items-center justify-center"
    >
      <img class="w-full" src="{Placeholder}" alt="placeholder" />
    </div>
    <div class="p-4 space-y-2">
      <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
      <div class="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
      <div class="h-4 bg-gray-200 rounded animate-pulse w-5/12"></div>
    </div>
  </div>
{/each}
