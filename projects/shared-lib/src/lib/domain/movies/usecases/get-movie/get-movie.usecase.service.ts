import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { MoviesGateway } from '../../../movies/gateway/movies.gateway';
import { MovieDetail } from '../../models/movie-detail.interface';

@Injectable()
export class GetMovieUsecaseService {
  constructor(private moviesGateway: MoviesGateway) {}

  invoke(body: any): Observable<MovieDetail> {
    return this.moviesGateway.getMovie(body).pipe(catchError((error) => of(error)));
  }
}
