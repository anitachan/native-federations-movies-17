import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { MoviesGateway } from '../../../movies/gateway/movies.gateway';
import { MovieVideos } from '../../models/movie-videos.interface';

@Injectable()
export class GetVideoMovieUsecaseService {
  constructor(private moviesGateway: MoviesGateway) {}

  invoke(body: any): Observable<MovieVideos> {
    return this.moviesGateway.getVideoMovie(body).pipe(catchError((error) => of(error)));
  }
}
