import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../../../domain/models/movies/now-playing.interface';
import { BehaviorSubject, Observable, Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.scss'],
})
export class MoviesGridComponent implements OnDestroy {
  listMovies: Movie[] = [];
  stopSubscribe$: Subject<void> = new Subject<void>();
  @Input() set movies$(movies: Observable<Movie[]>) {
    this.setData(movies);
  }
  @Input() columns: number;
  @Input() urlImage: string;
  @Output() loadMore = new EventEmitter();

  onScrollDown() {
    this.loadMore.emit();
  }

  ngOnDestroy(): void {
    this.stopSubscribe$.next();
    this.stopSubscribe$.complete();
  }

  private setData(movies: Observable<Movie[]>) {
    movies.pipe(takeUntil(this.stopSubscribe$)).subscribe((newMovies: Movie[]) => {
      this.listMovies = this.listMovies.concat(newMovies);
    });
  }
}
