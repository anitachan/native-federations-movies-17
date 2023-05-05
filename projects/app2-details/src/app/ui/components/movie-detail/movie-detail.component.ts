import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cast, Genre, MovieDetail, VideoItem } from 'shared-lib';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CustomMoviesService } from '../../../infrastructure/custom-movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movieData$: Observable<{
    movie: MovieDetail;
    cast: Cast[];
    videos: VideoItem[];
    genres: Genre[];
  }> = new Observable();

  movieId: string;
  favorite: boolean = false;
  selectedActor: string = '';
  urlImage: string = environment.tmdbImage;

  constructor(private customMoviesService: CustomMoviesService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.paramMap.get('id')!;
    const { movieSelected } = this.getFavorites();
    this.favorite = movieSelected ? true : false;
    this.getMoviesDetails();
  }

  getMoviesDetails() {
    this.movieData$ = combineLatest({
      movie: this.customMoviesService.getMovie(this.movieId),
      cast: this.customMoviesService.getCastMovie(this.movieId),
      videos: this.customMoviesService.getVideoMovie(this.movieId),
    }).pipe(
      map(({ movie, cast, videos }) => ({
        movie,
        cast: cast.filter((actor) => actor.profile_path),
        videos: videos.results,
        genres: movie.genres,
      }))
    );
  }

  setFavorite() {
    const { selectedFavorites, movieSelected } = this.getFavorites();

    let newSelectedFavorites: { id: string }[] = [];
    if (movieSelected) {
      newSelectedFavorites = selectedFavorites.filter((favorite: { id: string }) => favorite.id !== this.movieId);
    } else {
      selectedFavorites.push({ id: this.movieId });
      newSelectedFavorites = selectedFavorites;
    }
    localStorage.setItem('favorites', JSON.stringify(newSelectedFavorites));
    this.favorite = !this.favorite;
  }

  getSelectActor(actor: string) {
    this.selectedActor = actor;
  }

  private getFavorites() {
    const selectedFavorites = JSON.parse(localStorage.getItem('favorites')!) || [];
    const movieSelected = selectedFavorites.find((favorite: { id: string }) => favorite.id === this.movieId);
    return { selectedFavorites, movieSelected };
  }
}
