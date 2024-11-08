import { writable } from "svelte/store";

export const topRatedMoviesPage=writable(1)
export const similarMoviesPage=writable(1)
export const visiblePageStore = writable(5)
export const explorePagePagination = writable(1)

export const upcomingLoaing=writable(false)
export const nowPlayingLoading=writable(false)
export const topRatedLoading=writable(false)
export const popularLoading=writable(false)

export const topRatedTvPage=writable(1)