import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cast, Credits } from 'shared-lib';
import { environment } from '../../../environments/environment';
import { ONE } from '../../core/constants/number.constants';
import { GetCastMovieGateway } from '../../domain/cast/gateway/get-cast-movie.gateway';

@Injectable({
  providedIn: 'root',
})
export class GetCastMovieService extends GetCastMovieGateway {
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

  getCastMovie(movieId: string): Observable<Cast[]> {
    const url = `${this.tmdbUrl}movie/${movieId}/credits`;
    return this.httpClient.get<Credits>(url, { params: this.params }).pipe(map((resp) => resp.cast));
  }
}
