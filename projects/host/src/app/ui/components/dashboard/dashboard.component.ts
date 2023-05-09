import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Movie } from 'shared-lib';
import { environment } from '../../../../environments/environment';
import { CustomMoviesService } from '../../../infrastructure/custom-movies.service';
import { ONE } from '../../../infrastructure/constants/number.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  listMovies: Movie[] = [];
  currentPage = ONE;

  movies$: Observable<Movie[]> = new Observable();
  urlImage: string = environment.tmdbImage;

  constructor(private customMoviesService: CustomMoviesService) {}

  ngOnInit(): void {
    this.getTrendingMovies(this.currentPage);
  }

  getTrendingMovies(page: number) {
    this.movies$ = this.customMoviesService.getNowPlayingMovies(page).pipe(
      map(({ results }) => results),
      tap(() => this.currentPage++)
    );
  }

  loadMore(page: number) {
    this.getTrendingMovies(this.currentPage);
  }
}
