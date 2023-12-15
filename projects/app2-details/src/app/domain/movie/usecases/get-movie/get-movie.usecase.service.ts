import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { MovieDetail } from 'shared-lib';
import { GetMovieGateway } from '../../gateway/get-movie.gateway';

@Injectable()
export class GetMovieUsecaseService {
  constructor(private getMovieGateway: GetMovieGateway) {}

  invoke(body: any): Observable<MovieDetail> {
    return this.getMovieGateway.getMovie(body).pipe(catchError((error) => of(error)));
  }
}
