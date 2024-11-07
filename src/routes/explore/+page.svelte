<script>
  let currentView = {
    upcoming: true,
    nowPlaying: false,
    topRated: false,
    popular: false,
  };
</script>

<div class="flex flex-col sm:px-24 items-center gap-6">
  <h2 class="text-xl sm:text-3xl self-start font-bold text-yellow-400 my-4">
    Explore Moveis
  </h2>

  <div class="flex gap-2 mb-2">
    <div class="flex flex-col items-center">
      <button
        class="md:text-base sm:text-sm text-xs font-semibold text-center lg:w-44 sm:w-36 w-fit sm:p-0 p-2 sm:h-16 h-10 hover:bg-[#121212]"
        >Upcoming</button
      >
      <div
        class={`h-0.5 bg-blue-700 transition-all duration-200 ${currentView.upcoming ? 'w-full' : 'w-0'}`}
      ></div>
    </div>

    <div class="flex flex-col items-center">
      <button
        class="md:text-base sm:text-sm text-xs font-semibold text-center lg:w-44 sm:w-36 w-fit sm:p-0 p-2 sm:h-16 h-10 hover:bg-[#121212]"
        >Now Playing</button
      >
      <div
        class="{`h-0.5 bg-blue-500 transition-all duration-200 ${currentView.nowPlaying ? 'w-full' : 'w-0'}`}"
      ></div>
    </div>
    <div class="flex flex-col items-center">
      <button
        class="md:text-base sm:text-sm text-xs font-semibold text-center lg:w-44 sm:w-36 w-fit sm:p-0 p-2 sm:h-16 h-10 hover:bg-[#121212]"
        >Top Rated</button
      >
      <div
        class="{`h-0.5 bg-blue-500 transition-all duration-200 ${currentView.topRated ? 'w-full' : 'w-0'}`}"
      ></div>
    </div>
    <div class="flex flex-col items-center">
      <button
        class="md:text-base sm:text-sm text-xs font-semibold text-center lg:w-44 sm:w-36 w-fit sm:p-0 p-2 sm:h-16 h-10 hover:bg-[#121212]"
        >Popular</button
      >
      <div
        class="{`h-0.5 bg-blue-500 transition-all duration-200 ${currentView.popular ? 'w-full' : 'w-0'}`}"
      ></div>
    </div>
  </div>
</div>
