import { getSimilarMovieById } from "$lib/api/detailsPageApi";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, locals, params }) => {
  const movieDetails = await getMoviesById(fetch, locals, params.movieid);
  const similarMovie = await getSimilarMovieById(1, params.movieid);
  const movieTailers = await getMovieTailers(fetch, locals, params.movieid);
  return { movieDetails, similarMovie, movieTailers };
};
let BaseURL = "https://api.themoviedb.org/3/movie/";

const getMoviesById = async (fetch, locals, id) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${locals.API_KEY}`,
      },
    };
    const res = await fetch(`${BaseURL}${id}`, options);

    if (!res.ok) {
      throw new Error(`Error fetching upcoming movies: ${res.statusText}`);
    }
    const resData = await res.json();
    return resData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getMovieTailers = async (fetch, locals, id) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${locals.API_KEY}`,
      },
    };
    const res = await fetch(`${BaseURL}${id}/videos`, options);

    if (!res.ok) {
      throw new Error(`Error fetching upcoming movies: ${res.statusText}`);
    }

    const resData = await res.json();
    return resData.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
