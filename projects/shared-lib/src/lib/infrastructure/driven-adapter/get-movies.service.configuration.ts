export const GET_MOVIES_SERVICE_ENDPOINTS: string[] = ['GET_NOW_PLAYING_MOVIES'];

export enum GetMoviesServiceEntries {
  GET_NOW_PLAYING_MOVIES = 'GET_NOW_PLAYING_MOVIES',
}

export type GetMoviesServiceEndpointsConfig = {
  [entry in GetMoviesServiceEntries]: string;
};
