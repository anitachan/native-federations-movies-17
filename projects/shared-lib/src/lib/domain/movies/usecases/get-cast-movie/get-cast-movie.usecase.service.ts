import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Cast } from '../../models/credits.interface';
import { MoviesGateway } from '../../gateway/movies.gateway';

@Injectable()
export class GetCastMovieUsecaseService {
  constructor(private moviesGateway: MoviesGateway) {}

  invoke(body: any): Observable<Cast[] | null> {
    return this.moviesGateway.getCastMovie(body).pipe(catchError((error) => of(error)));
  }
}
