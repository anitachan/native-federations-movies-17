import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { Cast, Genres, MovieDetail, MovieVideos, MoviesGateway, Movie } from 'shared-lib';
import { MovieService } from './movie.service';

@Injectable({
  providedIn: 'root',
})
export class CustomMoviesService extends MoviesGateway {
  constructor(private httpClient: HttpClient, private movieService: MovieService) {
    super(httpClient);
  }

  getMovies(page: number): Observable<Movie[]> {
    const favoritesLocalStorage: [{ id: string }] = this.getFavoritesMovies();
    const observable: Array<Observable<MovieDetail>> = [];

    favoritesLocalStorage.forEach(({ id }, i: number) => {
      observable.push(this.movieService.getMovie(id));
    });

    return forkJoin(observable).pipe(map((result: MovieDetail[]) => this.addFavorites(result)));
  }

  getMovie(movieId: string): Observable<MovieDetail> {
    throw new Error('Method not implemented.');
  }
  getGenreMovies(): Observable<Genres> {
    throw new Error('Method not implemented.');
  }
  getVideoMovie(movieId: string): Observable<MovieVideos> {
    throw new Error('Method not implemented.');
  }
  getCastMovie(movieId: string): Observable<Cast[]> {
    throw new Error('Method not implemented.');
  }

  private getFavoritesMovies(): [{ id: string }] {
    return JSON.parse(localStorage.getItem('favorites')!) || [];
  }

  private addFavorites(moviesDetail: MovieDetail[]) {
    const favoritesList: Movie[] = [];
    moviesDetail.forEach((item) => {
      favoritesList.push(this.getMovieData(item));
    });
    return favoritesList;
  }

  private getMovieData(movie: MovieDetail): Movie {
    return {
      id: movie.id,
      title: movie.title,
      vote_average: movie.vote_average,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
    };
  }
}
