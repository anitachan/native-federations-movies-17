import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Movie } from '../../../domain/movies/models/movies.interface';
import { GetMoviesUsecaseService } from '../../../domain/movies/usecases/get-movies/get-movies.usecase.service';
import { ONE } from '../../utils/constants/number.constants';

@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.scss'],
})
export class MoviesGridComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  listMovies: Movie[] = [];
  stopSubscribe$: Subject<void> = new Subject<void>();
  currentPage = ONE;
  movies$: Observable<Movie[]>;
  @Input() columns: number;
  @Input() urlImage: string;

  constructor(private getNowPlayingMoviesUsecaseService: GetMoviesUsecaseService) {}

  ngOnInit(): void {
    this.getTrendingMovies();
  }

  onScrollDown() {
    this.getTrendingMovies();
  }

  ngOnDestroy(): void {
    this.stopSubscribe$.next();
    this.stopSubscribe$.complete();
  }

  getTrendingMovies() {
    this.getNowPlayingMoviesUsecaseService
      .invoke(this.currentPage)
      .pipe(takeUntil(this.stopSubscribe$))
      .subscribe((newMovies: Movie[]) => {
        this.listMovies = this.listMovies.concat(newMovies);
        this.currentPage++;
      });
  }
}
