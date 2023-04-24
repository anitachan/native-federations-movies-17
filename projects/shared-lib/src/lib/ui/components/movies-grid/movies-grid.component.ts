import { Component, Input } from '@angular/core';
import { Movie } from '../../../domain/models/movies/now-playing.interface';

@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.scss'],
})
export class MoviesGridComponent {
  @Input() movies: Movie[];
  @Input() columns: number;
  @Input() urlImage: string;
}
