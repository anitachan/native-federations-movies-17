import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GetGenresMovieGateway } from '../../domain/movies/gateway/get-genres-movie.gateway';
import { Genres } from '../../domain/movies/models/movie-detail.interface';
import {
  GET_GENRES_MOVIE_SERVICE_ENDPOINTS,
  GetGenresMovieServiceEndpointsConfig,
  GetGenresMovieServiceEntries,
} from './get-genres-movie.service.configuration';

@Injectable({
  providedIn: 'root',
})
export class GetGenresMovieService extends GetGenresMovieGateway {
  private endpoints = inject<GetGenresMovieServiceEndpointsConfig>(GET_GENRES_MOVIE_SERVICE_ENDPOINTS);

  constructor() {
    super(inject(HttpClient));
  }

  getGenresMovie(): Observable<Genres> {
    const path = this.endpoints[GetGenresMovieServiceEntries.GET_GENRES_MOVIE];
    return this.baseRequest<Genres>(path, 'GET');
  }
}
