

export const getTopRatedTvShows = async (page: number = 1) => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const res = await fetch(`https://api.themoviedb.org/3/tv/top_rated?page=${page}`,
        options
      );
  
      const resData = await res.json();
      return resData.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  };


  export const getSimilarTvShow = async (page: number = 1, id) => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/similar?page=${page}`,
        options
      );
  
      const resData = await res.json();
      return resData.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  