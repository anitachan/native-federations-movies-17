import { InjectionToken, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { GetGenresMovieGateway } from './domain/movies/gateway/get-genres-movie.gateway';
import { GetMoviesGateway } from './domain/movies/gateway/get-movies.gateway';
import { GetGenreMoviesUsecaseService } from './domain/movies/usecases/get-genre-movies/get-genre-movies.usecase.service';
import { GetMoviesUsecaseService } from './domain/movies/usecases/get-movies/get-movies.usecase.service';
import { GetGenresMovieService } from './infrastructure/driven-adapter/get-genres-movie.service';
import {
  GET_GENRES_MOVIE_SERVICE_ENDPOINTS,
  GetGenresMovieServiceEndpointsConfig,
} from './infrastructure/driven-adapter/get-genres-movie.service.configuration';
import { GetMoviesService } from './infrastructure/driven-adapter/get-movies.service';
import { GET_MOVIES_SERVICE_ENDPOINTS, GetMoviesServiceEndpointsConfig } from './infrastructure/driven-adapter/get-movies.service.configuration';

export const ENDPOINTS_CONFIG: InjectionToken<Observable<any>> = new InjectionToken<Observable<any>>('EndpointsConfig');

export interface IInfrastructureMappingModel {
  gateway: any;
  implementation: any;
}

export interface ISharedLibConfigurationModel {
  infrastructures?: IInfrastructureMappingModel[];
  endpoints?: {
    GetMoviesService: GetMoviesServiceEndpointsConfig;
    GetGenresMovieService: GetGenresMovieServiceEndpointsConfig;
  };
}

export const DEFAULT_PROVIDERS = [GetGenreMoviesUsecaseService, GetMoviesUsecaseService];

export const DEFAULT_CONFIGURATION = {
  infrastructures: [
    {
      gateway: GetMoviesGateway,
      implementation: GetMoviesService,
    },
    {
      gateway: GetGenresMovieGateway,
      implementation: GetGenresMovieService,
    },
  ] as IInfrastructureMappingModel[],
  endpoints: {
    GetMoviesService: {
      GET_NOW_PLAYING_MOVIES: 'https://api/movies',
    },
    GetGenresMovieService: {
      GET_GENRES_MOVIE: 'https://api/movies',
    },
  },
};

export function buildSharedLibProviders(configuration: ISharedLibConfigurationModel): Provider[] {
  const infrastructures: Provider[] = [];
  for (const item of configuration.infrastructures ?? []) {
    infrastructures.push({ provide: item.gateway, useClass: item.implementation });
  }

  return [
    ...DEFAULT_PROVIDERS,
    ...infrastructures,
    { provide: ENDPOINTS_CONFIG, useValue: configuration.endpoints },
    { provide: GET_MOVIES_SERVICE_ENDPOINTS, useValue: configuration.endpoints?.GetMoviesService },
    { provide: GET_GENRES_MOVIE_SERVICE_ENDPOINTS, useValue: configuration.endpoints?.GetGenresMovieService },
  ];
}

export const FULL_PROVIDERS = buildSharedLibProviders(DEFAULT_CONFIGURATION);
