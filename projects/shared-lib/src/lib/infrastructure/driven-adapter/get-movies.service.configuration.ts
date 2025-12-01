import { InjectionToken } from '@angular/core';

export const GET_MOVIES_SERVICE_ENDPOINTS = new InjectionToken<GetMoviesServiceEndpointsConfig>('GET_MOVIES_SERVICE_ENDPOINTS');

export enum GetMoviesServiceEntries {
  GET_NOW_PLAYING_MOVIES = 'GET_NOW_PLAYING_MOVIES',
}

export type GetMoviesServiceEndpointsConfig = {
  [entry in GetMoviesServiceEntries]: string;
};
