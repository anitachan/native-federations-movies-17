import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cast, Credits } from '../models/credits.interface';
import { Genres, MovieDetail } from '../models/movie-detail';
import { MovieVideos } from '../models/movie-videos.interface';
import { Movie, NowPlaying } from '../models/now-playing';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private page = 1;

  constructor(private httpClient: HttpClient) {}

  get params() {
    return {
      api_key: environment.tmbdApiKey,
      page: this.page.toString(),
    };
  }

  getNowPlayingMovies(): Observable<NowPlaying> {
    const url: string = `${environment.tmdbUrl}movie/now_playing`;
    return this.httpClient.get<NowPlaying>(url, { params: this.params });
  }

  getMovie(movieId: string): Observable<MovieDetail> {
    const url: string = `${environment.tmdbUrl}movie/${movieId}`;
    return this.httpClient.get<MovieDetail>(url, { params: this.params });
  }

  getGenreMovies(): Observable<Genres> {
    const url: string = `${environment.tmdbUrl}genre/movie/list`;
    return this.httpClient.get<Genres>(url, { params: this.params });
  }

  getVideoMovies(movieId: string): Observable<MovieVideos> {
    const url: string = `${environment.tmdbUrl}movie/${movieId}/videos`;
    return this.httpClient.get<MovieVideos>(url, { params: this.params });
  }

  getCastMovie(movieId: string): Observable<Cast[]> {
    const url: string = `${environment.tmdbUrl}movie/${movieId}/credits`;
    return this.httpClient
      .get<Credits>(url, { params: this.params })
      .pipe(map((resp) => resp.cast));
  }
}
