import { Injectable } from '@angular/core';
import { MoviesGateway } from '../../movies/movies.gateway';
import { Observable, catchError, of } from 'rxjs';
import { NowPlaying } from '../../movies/now-playing.interface';

@Injectable({
  providedIn: 'root',
})
export class GetNowPlayingMoviesUsecaseService {
  constructor(private moviesGateway: MoviesGateway) {}

  invoke(): Observable<NowPlaying | null> {
    return this.moviesGateway.getNowPlayingMovies().pipe(catchError(() => of(null)));
  }
}
