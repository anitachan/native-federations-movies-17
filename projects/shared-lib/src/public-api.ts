/*
 * Public API Surface of shared-lib
 */

export { GetGenresMovieGateway } from './lib/domain/movies/gateway/get-genres-movie.gateway';
export { GetMoviesGateway } from './lib/domain/movies/gateway/get-movies.gateway';
export * from './lib/domain/movies/models/credits.interface';
export * from './lib/domain/movies/models/movie-detail.interface';
export * from './lib/domain/movies/models/movie-videos.interface';
export * from './lib/domain/movies/models/movies.interface';
export * from './lib/shared-lib.component';
export * from './lib/shared-lib.module';
export * from './lib/shared-lib.service';
export * from './lib/ui/components/movies-grid/movies-grid.component';
export * from './lib/ui/components/star-rating/star-rating.component';
export * from './lib/ui/pipes/poster.pipe';
