import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { MovieVideos } from '../../movies/movie-videos.interface';
import { MoviesGateway } from '../../movies/movies.gateway';

@Injectable()
export class GetVideoMovieUsecaseService {
  constructor(private moviesGateway: MoviesGateway) {}

  invoke(body: any): Observable<MovieVideos> {
    return this.moviesGateway.getVideoMovie(body).pipe(catchError((error) => of(error)));
  }
}
