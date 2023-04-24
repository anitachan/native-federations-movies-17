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
    const url: string = `${this.tmdbUrl}movie/now_playing`;
    return this.httpClient.get<NowPlaying>(url, { params: this.params });
  }
  override getMovie(): Observable<MovieDetail> {
    throw new Error('Method not implemented.');
  }
  override getGenreMovies(): Observable<Genres> {
    throw new Error('Method not implemented.');
  }
  override getVideoMovie(): Observable<MovieVideos> {
    throw new Error('Method not implemented.');
  }
  override getCastMovie(): Observable<Cast[]> {
    throw new Error('Method not implemented.');
  }
}
