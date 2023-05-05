import { Injectable } from '@angular/core';
import { MoviesGateway } from '../../movies/movies.gateway';
import { Observable, catchError, of } from 'rxjs';
import { NowPlaying } from '../../movies/now-playing.interface';

@Injectable()
export class GetNowPlayingMoviesUsecaseService {
  constructor(private moviesGateway: MoviesGateway) {}

  invoke(page: number): Observable<NowPlaying> {
    return this.moviesGateway.getNowPlayingMovies(page).pipe(catchError((error) => of(error)));
  }
}
