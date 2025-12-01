import { InjectionToken } from '@angular/core';

export const GET_GENRES_MOVIE_SERVICE_ENDPOINTS = new InjectionToken<GetGenresMovieServiceEndpointsConfig>('GET_GENRES_MOVIE_SERVICE_ENDPOINTS');

export enum GetGenresMovieServiceEntries {
  GET_GENRES_MOVIE = 'GET_GENRES_MOVIE',
}

export type GetGenresMovieServiceEndpointsConfig = {
  [entry in GetGenresMovieServiceEntries]: string;
};
