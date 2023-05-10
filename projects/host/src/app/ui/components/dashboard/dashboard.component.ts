import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Movie } from 'shared-lib';
import { environment } from '../../../../environments/environment';
import { ONE } from '../../../infrastructure/constants/number.constants';
import { CustomMoviesService } from '../../../infrastructure/services/custom-movies.service';

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
    this.getTrendingMovies();
  }

  getTrendingMovies() {
    this.movies$ = this.customMoviesService.getNowPlayingMovies(this.currentPage).pipe(
      map(({ results }) => results),
      tap(() => this.currentPage++)
    );
  }

  loadMore() {
    this.getTrendingMovies();
  }
}
