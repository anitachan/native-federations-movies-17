import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cast, Favorite, Genre, MovieDetail, VideoItem } from 'shared-lib';
import { environment } from '../../../../environments/environment';
import { GetCastMovieUsecaseService } from '../../../domain/cast/usecases/get-cast-movie/get-cast-movie.usecase.service';
import { GetMovieUsecaseService } from '../../../domain/movie/usecases/get-movie/get-movie.usecase.service';
import { GetVideoMovieUsecaseService } from '../../../domain/videos/usecases/get-video-movie/get-video-movie.usecase.service';

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

  movieId: string | null;
  favorite = false;
  selectedActor = '';
  urlImage: string = environment.tmdbImage;

  constructor(
    private getMovieUsecaseService: GetMovieUsecaseService,
    private activatedRoute: ActivatedRoute,
    private getCastMovieUsecaseService: GetCastMovieUsecaseService,
    private getVideoMovieUsecaseService: GetVideoMovieUsecaseService
  ) {}

  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.paramMap.get('id');
    const selectedFavorites = this.getFavorites();
    const movieSelected = this.getMovieSelected(selectedFavorites);
    this.favorite = !!movieSelected;
    this.getMoviesDetails();
  }

  getMoviesDetails() {
    if (this.movieId) {
      this.movieData$ = combineLatest({
        movie: this.getMovieUsecaseService.invoke(this.movieId),
        cast: this.getCastMovieUsecaseService.invoke(this.movieId),
        videos: this.getVideoMovieUsecaseService.invoke(this.movieId),
      }).pipe(
        map(({ movie, cast, videos }) => ({
          movie,
          cast: cast.filter((actor) => actor.profile_path),
          videos: videos.results,
          genres: movie.genres,
        }))
      );
    }
  }

  setFavorite() {
    const selectedFavorites = this.getFavorites();
    const movieSelected = this.getMovieSelected(selectedFavorites);

    let newSelectedFavorites: Favorite[] = [];
    if (movieSelected) {
      newSelectedFavorites = selectedFavorites.filter((favorite: { id: string }) => favorite.id !== this.movieId);
    } else if (this.movieId) {
      const favorite: Favorite = { id: this.movieId };
      selectedFavorites.push(favorite);
      newSelectedFavorites = selectedFavorites;
    }
    localStorage.setItem('favorites', JSON.stringify(newSelectedFavorites));
    this.favorite = !this.favorite;
  }

  getSelectActor(actor: string) {
    this.selectedActor = actor;
  }

  private getFavorites() {
    const favoritesString: string | null = localStorage.getItem('favorites');
    return <Favorite[]>JSON.parse(favoritesString ?? '[]');
  }

  private getMovieSelected(selectedFavorites: Favorite[]) {
    return selectedFavorites.find((favorite: { id: string }) => favorite.id === this.movieId);
  }
}
