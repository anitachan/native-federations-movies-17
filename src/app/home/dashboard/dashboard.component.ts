import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/now-playing';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  movies$: Observable<Movie[]> = new Observable();

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getTrendingMovies();
  }

  getTrendingMovies() {
    this.movies$ = this.moviesService
      .getNowPlayingMovies()
      .pipe(map(({ results }) => results));
  }
}
