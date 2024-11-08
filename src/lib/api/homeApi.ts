import { topRatedLoading } from "$lib/store/store";

export const getAllTopRatedMovies = async (page: number = 1) => {
  try {
    topRatedLoading.set(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?page=${page}`,
      options
    );
    topRatedLoading.set(false);
    const resData = await res.json();
    topRatedLoading.set(false);
    return resData.results;
  } catch (error) {
    console.error(error);
  }
};
