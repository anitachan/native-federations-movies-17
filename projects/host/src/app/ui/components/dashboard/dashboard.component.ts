import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie } from 'shared-lib';
import { environment } from '../../../../environments/environment';
import { CustomMoviesService } from '../../../infrastructure/custom-movies.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  movies$: Observable<Movie[]> = new Observable();
  urlImage: string = environment.tmdbImage;

  constructor(private customMoviesService: CustomMoviesService) {}

  ngOnInit(): void {
    this.getTrendingMovies();
  }

  getTrendingMovies() {
    this.movies$ = this.customMoviesService.getNowPlayingMovies().pipe(map(({ results }) => results));
  }
}
