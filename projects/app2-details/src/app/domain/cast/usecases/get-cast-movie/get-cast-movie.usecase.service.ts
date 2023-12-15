import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Cast } from 'shared-lib';
import { GetCastMovieGateway } from '../../gateway/get-cast-movie.gateway';

@Injectable({
  providedIn: 'root',
})
export class GetCastMovieUsecaseService {
  constructor(private getCastMovieGateway: GetCastMovieGateway) {}

  invoke(body: any): Observable<Cast[]> {
    return this.getCastMovieGateway.getCastMovie(body).pipe(catchError((error) => of(error)));
  }
}
