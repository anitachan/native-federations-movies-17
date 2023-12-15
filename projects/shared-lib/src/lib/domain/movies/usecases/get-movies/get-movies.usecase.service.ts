import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { GetMoviesGateway } from '../../gateway/get-movies.gateway';
import { Movie } from '../../models/movies.interface';

@Injectable()
export class GetMoviesUsecaseService {
  constructor(private getMoviesGateway: GetMoviesGateway) {}

  invoke(page: number): Observable<Movie[]> {
    return this.getMoviesGateway.getMovies(page).pipe(catchError((error) => of(error)));
  }
}
