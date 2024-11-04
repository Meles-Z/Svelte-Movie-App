import type { Handle } from "@sveltejs/kit";

export const handle:Handle=async({event, resolve})=>{
    event.locals.API_KEY="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGU3YmY1NDkwNTJiYWY0YTQ0YjFhZjcyNDcxMzFmZCIsIm5iZiI6MTczMDcxMTQzNi42NDE4MzIsInN1YiI6IjY2ZjNjODUyODI0NzAxZGIyZjIyZWM3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Df419nIIOXv7IRoUj2kpOr88wijDEfIkQB09pc0W708"
    return resolve(event)
}