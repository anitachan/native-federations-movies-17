import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cast, Genres, MovieDetail, MovieVideos, MoviesGateway, NowPlaying } from 'shared-lib';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomMoviesService extends MoviesGateway {
  private tmdbUrl = environment.tmdbUrl;
  private tmbdApiKey = environment.tmbdApiKey;

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  getNowPlayingMovies(page: number): Observable<NowPlaying> {
    const url: string = `${this.tmdbUrl}movie/now_playing`;
    return this.httpClient.get<NowPlaying>(url, { params: this.getParams(page) });
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
