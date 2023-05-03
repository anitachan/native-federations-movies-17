import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { MovieDetail } from '../../movies/movie-detail.interface';
import { MoviesGateway } from '../../movies/movies.gateway';

@Injectable()
export class GetMovieUsecaseService {
  constructor(private moviesGateway: MoviesGateway) {}

  invoke(body: any): Observable<MovieDetail> {
    return this.moviesGateway.getMovie(body).pipe(catchError((error) => of(error)));
  }
}
