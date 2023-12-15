import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetail } from 'shared-lib';
import { environment } from '../../../environments/environment';
import { ONE } from '../../core/constants/number.constants';
import { GetMovieGateway } from '../../domain/movie/gateway/get-movie.gateway';

@Injectable({
  providedIn: 'root',
})
export class CustomGetMovieService extends GetMovieGateway {
  private page = ONE;
  private tmdbUrl = environment.tmdbUrl;
  private tmbdApiKey = environment.tmbdApiKey;

  constructor(private httpClient: HttpClient) {
    super();
  }
  get params() {
    return {
      api_key: this.tmbdApiKey,
      page: this.page.toString(),
    };
  }

  getMovie(movieId: string): Observable<MovieDetail> {
    const url = `${this.tmdbUrl}movie/${movieId}`;
    return this.httpClient.get<MovieDetail>(url, { params: this.params });
  }
}
