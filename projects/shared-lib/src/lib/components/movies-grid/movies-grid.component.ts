import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/now-playing.interface';

@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.scss'],
})
export class MoviesGridComponent implements OnInit {
  @Input() movies: Movie[];
  @Input() columns: number;
  @Input() buttonText: string;

  constructor() {}

  ngOnInit(): void {}
}
