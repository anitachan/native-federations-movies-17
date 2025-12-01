import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GetMoviesGateway } from '../../domain/movies/gateway/get-movies.gateway';
import { Movie } from '../../domain/movies/models/movies.interface';
import { GET_MOVIES_SERVICE_ENDPOINTS, GetMoviesServiceEndpointsConfig, GetMoviesServiceEntries } from './get-movies.service.configuration';

@Injectable({
  providedIn: 'root',
})
export class GetMoviesService extends GetMoviesGateway {
  private httpClient = inject(HttpClient);
  private endpoints = inject<GetMoviesServiceEndpointsConfig>(GET_MOVIES_SERVICE_ENDPOINTS);

  constructor() {
    super(inject(HttpClient));
  }

  getMovies(page?: number): Observable<Movie[]> {
    const path = `${this.endpoints[GetMoviesServiceEntries.GET_NOW_PLAYING_MOVIES]}?page=${page}`;
    return this.baseRequest<Movie[]>(path, 'GET');
  }
}
