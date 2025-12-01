import { CommonModule, SlicePipe } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Movie } from '../../../domain/movies/models/movies.interface';
import { GetMoviesUsecaseService } from '../../../domain/movies/usecases/get-movies/get-movies.usecase.service';
import { PosterPipe } from '../../pipes/poster.pipe';
import { ONE } from '../../utils/constants/number.constants';
import { LoadingComponent } from '../loading/loading.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-movies-grid',
  standalone: true,
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.scss'],
  imports: [CommonModule, LoadingComponent, InfiniteScrollDirective, MatGridListModule, StarRatingComponent, MatButton, SlicePipe, PosterPipe],
})
export class MoviesGridComponent implements OnInit, OnDestroy {
  @Input() columns: number;

  @Input() urlImage: string;
  @Input() disableInfiniteScroll = false;
  public loading: boolean = false;
  public listMovies: Movie[] = [];
  public stopSubscribe$: Subject<void> = new Subject<void>();
  public currentPage = ONE;
  public movies$: Observable<Movie[]>;

  private getNowPlayingMoviesUsecaseService = inject(GetMoviesUsecaseService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getTrendingMovies();
  }

  onScrollDown() {
    if (this.disableInfiniteScroll) {
      return;
    }

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

  goToDetail(movieId: number) {
    this.router.navigate(['/detail', movieId]);
  }
}
