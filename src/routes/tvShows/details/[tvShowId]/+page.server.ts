import { getSimilarTvShow } from "$lib/api/tvShows";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, locals, params }) => {
  const tvshowDetails = await getTvShowById(fetch, locals, params.tvShowId);
  const similarTvShow = await getSimilarTvShow(1, params.tvShowId)
  const tvShowTailers = await  getTvShowTailers(fetch, locals, params.tvShowId)
  return { tvshowDetails, similarTvShow,tvShowTailers };
  
};
let BaseURL = "https://api.themoviedb.org/3/tv/";

const getTvShowById = async (fetch, locals, id) => {
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
    return resData
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getTvShowTailers = async (fetch, locals, id) => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${locals.API_KEY}`,
        },
      };
      const res = await fetch(
        `${BaseURL}${id}/videos`,
        options
      );
  
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
