import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetail } from '../../../../../shared-lib/src/public-api';
import { environment } from '../../../environments/environment';
import { ONE } from '../utils/constants/number.constants';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private page = ONE;
  private tmdbUrl = environment.tmdbUrl;
  private tmbdApiKey = environment.tmbdApiKey;

  constructor(private httpClient: HttpClient) {}

  get params() {
    return {
      api_key: this.tmbdApiKey,
      page: this.page.toString(),
    };
  }

  getMovie(movieId: string): Observable<MovieDetail> {
    const url: string = `${this.tmdbUrl}movie/${movieId}`;
    return this.httpClient.get<MovieDetail>(url, { params: this.params });
  }
}
