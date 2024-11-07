export const getSimilarMovieById = async (page: number = 1, id) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?page=${page}`,
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
