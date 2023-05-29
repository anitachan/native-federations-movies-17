import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cast } from '../../domain/movies/models/credits.interface';
import { MoviesGateway } from '../../domain/movies/gateway/movies.gateway';
import { MOVIES_SERVICE_ENDPOINTS, MoviesServiceEntries } from './movies.service.configuration';
import { MovieDetail, Genres } from '../../domain/movies/models/movie-detail.interface';
import { MovieVideos } from '../../domain/movies/models/movie-videos.interface';
import { Movie } from '../../domain/movies/models/movies.interface';

@Injectable()
export class MoviesService extends MoviesGateway {
  constructor(private httpClient: HttpClient, @Inject(MOVIES_SERVICE_ENDPOINTS) private endpoints: any) {
    super(httpClient);
  }

  getMovies(page: number): Observable<Movie[]> {
    const path = this.endpoints[MoviesServiceEntries.GET_NOW_PLAYING_MOVIES];
    return this.baseRequest<Movie[]>(path, 'GET');
  }
  getMovie(movieId: string): Observable<MovieDetail> {
    const path = this.endpoints[MoviesServiceEntries.GET_MOVIE];
    return this.baseRequest<MovieDetail>(path, 'GET');
  }
  getGenreMovies(): Observable<Genres> {
    const path = this.endpoints[MoviesServiceEntries.GET_GENRE_MOVIES];
    return this.baseRequest<Genres>(path, 'GET');
  }
  getVideoMovie(movieId: string): Observable<MovieVideos> {
    const path = this.endpoints[MoviesServiceEntries.GET_VIDEO_MOVIE];
    return this.baseRequest<MovieVideos>(path, 'GET');
  }
  getCastMovie(movieId: string): Observable<Cast[]> {
    const path = this.endpoints[MoviesServiceEntries.GET_CAST_MOVIE];
    return this.baseRequest<Cast[]>(path, 'GET');
  }
}
