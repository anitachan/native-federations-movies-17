/*
 * Public API Surface of shared-lib
 */

export * from './lib/shared-lib.service';
export * from './lib/shared-lib.component';
export * from './lib/shared-lib.module';
export * from './lib/ui/pipes/poster.pipe';
export * from './lib/ui/components/movies-grid/movies-grid.component';
export * from './lib/ui/components/star-rating/star-rating.component';
export * from './lib/domain/movies/models/credits.interface';
export * from './lib/domain/movies/models/movies.interface';
export * from './lib/domain/movies/models/movie-detail.interface';
export * from './lib/domain/movies/models/movie-videos.interface';
export { MoviesGateway } from './lib/domain/movies/gateway/movies.gateway';
