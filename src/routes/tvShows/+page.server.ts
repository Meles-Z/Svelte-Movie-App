import { getTopRatedTvShows } from "$lib/api/tvShows";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, locals }) => {
  const topRatedTvShows= await getTopRatedTvShows();
  return {  topRatedTvShows };
};