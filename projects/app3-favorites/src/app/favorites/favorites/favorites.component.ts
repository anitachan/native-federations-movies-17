import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { Movie, MovieDetail } from 'shared-lib';
import { CustomMoviesService } from '../../infrastructure/custom-movies.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites$: Observable<Movie[]>;
  imageHeight: string = '75vh';
  urlImage: string = environment.tmdbImage;

  constructor(private customMoviesService: CustomMoviesService) {}

  ngOnInit(): void {
    this.getFavoritesMovies();
  }

  getFavoritesMovies() {
    const favoritesLocalStorage: [{ id: string }] = JSON.parse(localStorage.getItem('favorites')!) || [];

    let observable: Array<Observable<MovieDetail>> = [];

    favoritesLocalStorage.forEach(({ id }, i: number) => {
      observable.push(this.customMoviesService.getMovie(id));
    });

    this.favorites$ = forkJoin(observable).pipe(map((result: MovieDetail[]) => this.addFavorites(result)));
  }

  private addFavorites(result: MovieDetail[]) {
    let favoritesList: Movie[] = [];
    result.forEach(item => {
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
