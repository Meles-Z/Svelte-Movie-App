import { nowPlayingLoading, popularLoading, upcomingLoaing } from "$lib/store/store";

export const getAllUpcomingMovies = async (page: number = 1) => {
  try {
    upcomingLoaing.set(true)
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?page=${page}`,
      options
    );

    const resData = await res.json();
    upcomingLoaing.set(false);
    return resData.results;
  } catch (error) {
    upcomingLoaing.set(false);
    console.error(error);
    return [];
  }
};

export const getAllNowPlayingMovies = async (page: number = 1) => {
  try {
    nowPlayingLoading.set(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?page=${page}`,
      options
    );
    const resData = await res.json();
    nowPlayingLoading.set(false);
    return resData.results;
  } catch (error) {
    nowPlayingLoading.set(false);
    console.error(error);
    return [];
  }
};

export const getAllPopularMovies = async (page: number = 1) => {
  try {
    popularLoading.set(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?page=${page}`,
      options
    );

    const resData = await res.json();
    popularLoading.set(false)
    return resData.results;
  } catch (error) {
    popularLoading.set(false);
    console.error(error);
    return [];
  }
};
