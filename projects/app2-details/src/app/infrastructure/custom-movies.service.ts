import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cast, Credits, Genres, Movie, MovieDetail, MovieVideos, MoviesGateway } from 'shared-lib';
import { environment } from '../../environments/environment';
import { ONE } from '../ui/utils/constants/number.constants';

@Injectable({
  providedIn: 'root',
})
export class CustomMoviesService extends MoviesGateway {
  private page = ONE;
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

  getMovies(): Observable<Movie[]> {
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
    const url: string = `${this.tmdbUrl}movie/${movieId}/videos`;
    return this.httpClient.get<MovieVideos>(url, { params: this.params });
  }
  getCastMovie(movieId: string): Observable<Cast[]> {
    const url: string = `${this.tmdbUrl}movie/${movieId}/credits`;
    return this.httpClient.get<Credits>(url, { params: this.params }).pipe(map((resp) => resp.cast));
  }
}
