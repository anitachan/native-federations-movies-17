import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GetMoviesGateway, Movie } from 'shared-lib';
import { environment } from '../../../environments/environment';
import { NowPlaying } from './models/now-playing.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomGetMoviesService extends GetMoviesGateway {
  private tmdbUrl = environment.tmdbUrl;
  private tmbdApiKey = environment.tmbdApiKey;

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  getMovies(page: number): Observable<Movie[]> {
    const url = `${this.tmdbUrl}movie/now_playing`;
    return this.httpClient.get<NowPlaying>(url, { params: this.getParams(page) }).pipe(map(({ results }) => results));
  }

  getParams(page: number) {
    return {
      api_key: this.tmbdApiKey,
      page: page.toString(),
    };
  }
}
