import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cast, Genres, Movie, MovieDetail, MovieVideos, MoviesGateway } from 'shared-lib';
import { environment } from '../../../environments/environment';
import { NowPlaying } from './models/now-playing.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomMoviesService extends MoviesGateway {
  private tmdbUrl = environment.tmdbUrl;
  private tmbdApiKey = environment.tmbdApiKey;

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  getMovies(page: number): Observable<Movie[]> {
    const url: string = `${this.tmdbUrl}movie/now_playing`;
    return this.httpClient.get<NowPlaying>(url, { params: this.getParams(page) }).pipe(map(({ results }) => results));
  }

  getMovie(movieId: string): Observable<MovieDetail> {
    throw new Error('Method not implemented.');
  }

  getGenreMovies(): Observable<Genres> {
    throw new Error('Method not implemented.');
  }

  getVideoMovie(movieId: string): Observable<MovieVideos> {
    throw new Error('Method not implemented.');
  }

  getCastMovie(movieId: string): Observable<Cast[]> {
    throw new Error('Method not implemented.');
  }

  getParams(page: number) {
    return {
      api_key: this.tmbdApiKey,
      page: page.toString(),
    };
  }
}
