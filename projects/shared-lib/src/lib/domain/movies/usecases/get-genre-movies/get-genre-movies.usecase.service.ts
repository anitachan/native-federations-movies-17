import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { MoviesGateway } from '../../../movies/gateway/movies.gateway';
import { Genres } from '../../models/movie-detail.interface';

@Injectable()
export class GetGenreMoviesUsecaseService {
  constructor(private moviesGateway: MoviesGateway) {}

  invoke(): Observable<Genres> {
    return this.moviesGateway.getGenreMovies().pipe(catchError((error) => of(error)));
  }
}
