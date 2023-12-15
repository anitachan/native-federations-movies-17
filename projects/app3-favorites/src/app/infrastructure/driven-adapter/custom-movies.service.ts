import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { Favorite, GetMoviesGateway, Movie, MovieDetail } from 'shared-lib';
import { MovieService } from './movie.service';

@Injectable({
  providedIn: 'root',
})
export class CustomMoviesService extends GetMoviesGateway {
  constructor(private httpClient: HttpClient, private movieService: MovieService) {
    super(httpClient);
  }

  getMovies(): Observable<Movie[]> {
    const favoritesLocalStorage: Favorite[] = this.getFavoritesMovies();
    const observable: Array<Observable<MovieDetail>> = [];

    favoritesLocalStorage.forEach(({ id }) => {
      observable.push(this.movieService.getMovie(id));
    });

    return forkJoin(observable).pipe(map((result: MovieDetail[]) => this.addFavorites(result)));
  }

  private getFavoritesMovies(): Favorite[] {
    const favoritesString: string | null = localStorage.getItem('favorites');
    return <Favorite[]>JSON.parse(favoritesString ?? '[]');
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
