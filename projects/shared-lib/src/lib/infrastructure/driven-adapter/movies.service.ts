import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Genres, MovieDetail } from '../../domain/models/movies/movie-detail.interface';
import { NowPlaying } from '../../domain/models/movies/now-playing.interface';
import { MovieVideos } from '../../domain/models/movies/movie-videos.interface';
import { Cast } from '../../domain/models/movies/credits.interface';
import { MOVIES_SERVICE_ENDPOINTS, MoviesServiceEntries } from './movies.service.configuration';
import { MoviesGateway } from '../../domain/models/movies/movies.gateway';

@Injectable()
export class MoviesService extends MoviesGateway {
  constructor(private httpClient: HttpClient, @Inject(MOVIES_SERVICE_ENDPOINTS) private endpoints: any) {
    super(httpClient);
  }

  getNowPlayingMovies(): Observable<NowPlaying> {
    const path = this.endpoints[this.identifier][MoviesServiceEntries.GET_NOW_PLAYING_MOVIES];
    return this.baseRequest<NowPlaying>(path, 'GET');
  }
  getMovie(movieId: string): Observable<MovieDetail> {
    const path = this.endpoints[this.identifier][MoviesServiceEntries.GET_MOVIE];
    return this.baseRequest<MovieDetail>(path, 'GET');
  }
  getGenreMovies(): Observable<Genres> {
    const path = this.endpoints[this.identifier][MoviesServiceEntries.GET_GENRE_MOVIES];
    return this.baseRequest<Genres>(path, 'GET');
  }
  getVideoMovie(movieId: string): Observable<MovieVideos> {
    const path = this.endpoints[this.identifier][MoviesServiceEntries.GET_VIDEO_MOVIE];
    return this.baseRequest<MovieVideos>(path, 'GET');
  }
  getCastMovie(movieId: string): Observable<Cast[]> {
    const path = this.endpoints[this.identifier][MoviesServiceEntries.GET_CAST_MOVIE];
    return this.baseRequest<Cast[]>(path, 'GET');
  }
  // private page = 1;

  // private tmdbUrl = 'https://api.themoviedb.org/3/';
  // private tmbdApiKey = '65df35e6319938218e94a8b2587bd921';

  // get params() {
  //   return {
  //     api_key: this.tmbdApiKey,
  //     page: this.page.toString(),
  //   };
  // }

  // getNowPlayingMovies(): Observable<NowPlaying> {
  //   const url: string = `${this.tmdbUrl}movie/now_playing`;
  //   return this.httpClient.get<NowPlaying>(url, { params: this.params });
  // }

  // getMovie(movieId: string): Observable<MovieDetail> {
  //   const url: string = `${this.tmdbUrl}movie/${movieId}`;
  //   return this.httpClient.get<MovieDetail>(url, { params: this.params });
  // }

  // getGenreMovies(): Observable<Genres> {
  //   const url: string = `${this.tmdbUrl}genre/movie/list`;
  //   return this.httpClient.get<Genres>(url, { params: this.params });
  // }

  // getVideoMovies(movieId: string): Observable<MovieVideos> {
  //   const url: string = `${this.tmdbUrl}movie/${movieId}/videos`;
  //   return this.httpClient.get<MovieVideos>(url, { params: this.params });
  // }

  // getCastMovie(movieId: string): Observable<Cast[]> {
  //   const url: string = `${this.tmdbUrl}movie/${movieId}/credits`;
  //   return this.httpClient.get<Credits>(url, { params: this.params }).pipe(map(resp => resp.cast));
  // }
}
