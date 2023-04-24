export const MOVIES_SERVICE_ENDPOINTS: string[] = ['GET_NOW_PLAYING_MOVIES', 'GET_MOVIE', 'GET_GENRE_MOVIES', 'GET_VIDEO_MOVIE', 'GET_CAST_MOVIE'];

export enum MoviesServiceEntries {
  GET_NOW_PLAYING_MOVIES = 'GET_NOW_PLAYING_MOVIES',
  GET_MOVIE = 'GET_MOVIE',
  GET_GENRE_MOVIES = 'GET_GENRE_MOVIES',
  GET_VIDEO_MOVIE = 'GET_VIDEO_MOVIE',
  GET_CAST_MOVIE = 'GET_CAST_MOVIE',
}

export type MoviesServiceEndpointsConfig = {
  [entry in MoviesServiceEntries]: string;
};
