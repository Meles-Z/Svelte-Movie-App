export const search = async (term: string) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  };
  try {
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${term}&page=1`,
      options
    );
    const tvResponse = await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${term}&page=1`,
      options
    );
    const movieResult = await movieResponse.json();
    const tvResult = await tvResponse.json();
    return { movieResult: movieResult.results, tvResult: tvResult.results };
  } catch (error) {
    console.error(error);
    return { movies: [], tvs: [] };
  }
};
