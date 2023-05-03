import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Cast } from '../../movies/credits.interface';
import { MoviesGateway } from '../../movies/movies.gateway';

@Injectable({
  providedIn: 'root',
})
export class GetCastMovieUsecaseService {
  constructor(private moviesGateway: MoviesGateway) {}

  invoke(body: any): Observable<Cast[] | null> {
    return this.moviesGateway.getCastMovie(body).pipe(catchError(error => of(error)));
  }
}
