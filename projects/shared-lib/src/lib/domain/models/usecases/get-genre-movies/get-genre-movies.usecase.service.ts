import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Genres } from '../../movies/movie-detail.interface';
import { MoviesGateway } from '../../movies/movies.gateway';

@Injectable()
export class GetGenreMoviesUsecaseService {
  constructor(private moviesGateway: MoviesGateway) {}

  invoke(): Observable<Genres> {
    return this.moviesGateway.getGenreMovies().pipe(catchError((error) => of(error)));
  }
}
