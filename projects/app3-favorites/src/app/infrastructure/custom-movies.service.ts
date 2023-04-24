import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cast, Genres, MovieDetail, MovieVideos, MoviesGateway, NowPlaying } from 'shared-lib';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomMoviesService extends MoviesGateway {
  private page = 1;
  private tmdbUrl = environment.tmdbUrl;
  private tmbdApiKey = environment.tmbdApiKey;

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }
  get params() {
    return {
      api_key: this.tmbdApiKey,
      page: this.page.toString(),
    };
  }

  getNowPlayingMovies(): Observable<NowPlaying> {
    throw new Error('Method not implemented.');
  }
  getMovie(movieId: string): Observable<MovieDetail> {
    const url: string = `${this.tmdbUrl}movie/${movieId}`;
    return this.httpClient.get<MovieDetail>(url, { params: this.params });
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
}
