import { Component, OnInit } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Movie } from '../../models/now-playing';
import { MoviesService } from '../../services/movies.service';
import { MovieDetail } from '../../models/movie-detail';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites$: Observable<Movie[]>;
  imageHeight: string = '75vh';

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getFavoritesMovies();
  }

  getFavoritesMovies() {
    const favoritesLocalStorage: [{ id: string }] =
      JSON.parse(localStorage.getItem('favorites')!) || [];

    console.log(favoritesLocalStorage);

    // const observable = new Observable();
    let observable: Array<Observable<MovieDetail>> = [];

    favoritesLocalStorage.forEach(({ id }, i: number) => {
      observable.push(this.moviesService.getMovie(id));
      //observable['request' + i] = this.moviesService.getMovie(id);
    });

    this.favorites$ = forkJoin(observable).pipe(
      map((result: MovieDetail[]) => this.addFavorites(result))
    );
  }

  private addFavorites(result: MovieDetail[]) {
    let favoritesList: Movie[] = [];
    result.forEach((item) => {
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
