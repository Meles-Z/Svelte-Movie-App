import { writable } from "svelte/store";

export const topRatedMoviesPage=writable(1)
export const similarMoviesPage=writable(1)
export const visiblePageStore = writable(5)