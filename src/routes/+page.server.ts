import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, locals }) => {
  const upComingMovies = await getAllUpcomingMovies(fetch, locals);
  return { upComingMovies };
};

const getAllUpcomingMovies = async (fetch, locals) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${locals.API_KEY}`,
      },
    };
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      options
    );

    if (!res.ok) {
      throw new Error(`Error fetching upcoming movies: ${res.statusText}`);
    }

    const resData = await res.json();
    console.log(resData);
    return resData.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};