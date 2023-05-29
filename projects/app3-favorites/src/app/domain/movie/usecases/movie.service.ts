import { Injectable } from '@angular/core';
import { MovieGateway } from '../gateway/movie.gateway';
import { Observable, of } from 'rxjs';
import { MovieDetail } from 'shared-lib';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private movieGateway: MovieGateway) {}

  getMovie(movieId: string): Observable<MovieDetail> {
    return this.movieGateway.getMovie(movieId).pipe(catchError((error) => of(error)));
  }
}
