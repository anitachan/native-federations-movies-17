import { InjectionToken } from '@angular/core';
import { MoviesServiceEndpointsConfig } from './infrastructure/driven-adapter/movies.service.configuration';
import { GetNowPlayingMoviesUsecaseService } from './domain/models/usecases/get-now-playing-movies/get-now-playing-movies.usecase.service';
import { Observable } from 'rxjs';
import { MoviesGateway } from './domain/models/movies/movies.gateway';
import { MoviesService } from './infrastructure/driven-adapter/movies.service';
import { GetVideoMovieUsecaseService } from './domain/models/usecases/get-video-movie/get-video-movie.usecase.service';
import { GetCastMovieUsecaseService } from './domain/models/usecases/get-cast-movie/get-cast-movie.usecase.service';
import { GetGenreMoviesUsecaseService } from './domain/models/usecases/get-genre-movies/get-genre-movies.usecase.service';
import { GetMovieUsecaseService } from './domain/models/usecases/get-movie/get-movie.usecase.service';

export const ENDPOINTS_CONFIG: InjectionToken<Observable<any>> = new InjectionToken<Observable<any>>('EndpointsConfig');

export interface IInfrastructureMappingModel {
  gateway: any;
  implementation: any;
}

export interface ISharedLibConfigurationModel {
  infrastructures?: IInfrastructureMappingModel[];
  endpoints?: {
    MoviesService: MoviesServiceEndpointsConfig;
  };
}

export const DEFAULT_PROVIDERS = [
  GetCastMovieUsecaseService,
  GetGenreMoviesUsecaseService,
  GetMovieUsecaseService,
  GetNowPlayingMoviesUsecaseService,
  GetVideoMovieUsecaseService,
];

export const LABELS_CONFIG = new InjectionToken<Observable<any>>('Labels for widget.');

export const DEFAULT_CONFIGURATION: ISharedLibConfigurationModel = {
  infrastructures: [
    {
      gateway: MoviesGateway,
      implementation: MoviesService,
    },
  ] as IInfrastructureMappingModel[],
  endpoints: {
    MoviesService: {
      GET_NOW_PLAYING_MOVIES: 'https://api/movies',
      GET_MOVIE: 'https://api/movie/id',
      GET_CAST_MOVIE: 'https://api/movies',
      GET_GENRE_MOVIES: 'https://api/movies',
      GET_VIDEO_MOVIE: 'https://api/movies',
    },
  },
};

const infrastructures = [];
for (const item of DEFAULT_CONFIGURATION.infrastructures!) {
  infrastructures.push({ provide: item.gateway, useClass: item.implementation });
}

export const FULL_PROVIDERS = [...DEFAULT_PROVIDERS, ...infrastructures, { provide: ENDPOINTS_CONFIG, useValue: DEFAULT_CONFIGURATION.endpoints }];