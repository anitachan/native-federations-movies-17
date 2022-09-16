import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Cast, Credits } from './models/credits.interface';
import { MovieDetail, Genres } from './models/movie-detail.interface';
import { MovieVideos } from './models/movie-videos.interface';
import { NowPlaying } from './models/now-playing.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private page = 1;

  private tmdbUrl = 'https://api.themoviedb.org/3/';
  private tmbdApiKey = '65df35e6319938218e94a8b2587bd921';

  constructor(
    private httpClient: HttpClient,
    @Inject(LOCALE_ID) public locale: string
  ) {}

  get params() {
    return {
      api_key: this.tmbdApiKey,
      page: this.page.toString(),
      language: this.locale,
    };
  }

  getNowPlayingMovies(): Observable<NowPlaying> {
    const url: string = `${this.tmdbUrl}movie/now_playing`;
    return this.httpClient.get<NowPlaying>(url, { params: this.params });
  }

  getMovie(movieId: string): Observable<MovieDetail> {
    const url: string = `${this.tmdbUrl}movie/${movieId}`;
    return this.httpClient.get<MovieDetail>(url, { params: this.params });
  }

  getGenreMovies(): Observable<Genres> {
    const url: string = `${this.tmdbUrl}genre/movie/list`;
    return this.httpClient.get<Genres>(url, { params: this.params });
  }

  getVideoMovies(movieId: string): Observable<MovieVideos> {
    const url: string = `${this.tmdbUrl}movie/${movieId}/videos`;
    return this.httpClient.get<MovieVideos>(url, { params: this.params });
  }

  getCastMovie(movieId: string): Observable<Cast[]> {
    const url: string = `${this.tmdbUrl}movie/${movieId}/credits`;
    return this.httpClient
      .get<Credits>(url, { params: this.params })
      .pipe(map((resp) => resp.cast));
  }
}
