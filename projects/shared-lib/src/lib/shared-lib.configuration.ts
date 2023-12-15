import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { GetGenresMovieGateway } from './domain/movies/gateway/get-genres-movie.gateway';
import { GetMoviesGateway } from './domain/movies/gateway/get-movies.gateway';
import { GetGenreMoviesUsecaseService } from './domain/movies/usecases/get-genre-movies/get-genre-movies.usecase.service';
import { GetMoviesUsecaseService } from './domain/movies/usecases/get-movies/get-movies.usecase.service';
import { GetGenresMovieService } from './infrastructure/driven-adapter/get-genres-movie.service';
import { GetGenresMovieServiceEndpointsConfig } from './infrastructure/driven-adapter/get-genres-movie.service.configuration';
import { GetMoviesService } from './infrastructure/driven-adapter/get-movies.service';
import { GetMoviesServiceEndpointsConfig } from './infrastructure/driven-adapter/get-movies.service.configuration';

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

const infrastructures = [];
for (const item of DEFAULT_CONFIGURATION.infrastructures) {
  infrastructures.push({ provide: item.gateway, useClass: item.implementation });
}

export const FULL_PROVIDERS = [...DEFAULT_PROVIDERS, ...infrastructures, { provide: ENDPOINTS_CONFIG, useValue: DEFAULT_CONFIGURATION.endpoints }];
