import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { GetGenresMovieGateway } from '../../gateway/get-genres-movie.gateway';
import { Genres } from '../../models/movie-detail.interface';

@Injectable()
export class GetGenreMoviesUsecaseService {
  constructor(private getGenresMovieGateway: GetGenresMovieGateway) {}

  invoke(): Observable<Genres> {
    return this.getGenresMovieGateway.getGenresMovie().pipe(catchError((error) => of(error)));
  }
}
