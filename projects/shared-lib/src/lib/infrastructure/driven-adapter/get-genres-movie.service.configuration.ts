export const GET_GENRES_MOVIE_SERVICE_ENDPOINTS: string[] = ['GET_GENRES_MOVIE'];

export enum GetGenresMovieServiceEntries {
  GET_GENRES_MOVIE = 'GET_GENRES_MOVIE',
}

export type GetGenresMovieServiceEndpointsConfig = {
  [entry in GetGenresMovieServiceEntries]: string;
};
