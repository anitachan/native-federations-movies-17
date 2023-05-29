import { Injectable } from '@angular/core';
import { MoviesGateway } from '../../gateway/movies.gateway';
import { Observable, catchError, of } from 'rxjs';
import { Movie } from '../../models/movies.interface';

@Injectable()
export class GetMoviesUsecaseService {
  constructor(private moviesGateway: MoviesGateway) {}

  invoke(page: number): Observable<Movie[]> {
    return this.moviesGateway.getMovies(page).pipe(catchError((error) => of(error)));
  }
}
