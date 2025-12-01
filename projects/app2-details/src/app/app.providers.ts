import { Provider } from '@angular/core';
import { GetCastMovieGateway } from './domain/cast/gateway/get-cast-movie.gateway';
import { GetCastMovieUsecaseService } from './domain/cast/usecases/get-cast-movie/get-cast-movie.usecase.service';
import { GetMovieGateway } from './domain/movie/gateway/get-movie.gateway';
import { GetMovieUsecaseService } from './domain/movie/usecases/get-movie/get-movie.usecase.service';
import { GetVideosMovieGateway } from './domain/videos/gateway/get-videos-movie.gateway';
import { GetVideoMovieUsecaseService } from './domain/videos/usecases/get-video-movie/get-video-movie.usecase.service';
import { GetCastMovieService } from './infrastructure/driven-adapter/get-cast-movie.service';
import { CustomGetMovieService } from './infrastructure/driven-adapter/get-movie.service';
import { GetVideosMovieService } from './infrastructure/driven-adapter/get-videos-movie.service';

export const movieDetailProviders: Provider[] = [
  GetCastMovieUsecaseService,
  GetVideoMovieUsecaseService,
  GetMovieUsecaseService,
  { provide: GetCastMovieGateway, useClass: GetCastMovieService },
  { provide: GetVideosMovieGateway, useClass: GetVideosMovieService },
  { provide: GetMovieGateway, useClass: CustomGetMovieService },
];
