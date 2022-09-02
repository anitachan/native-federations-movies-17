import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MoviesService } from '../../services/movies.service';

import { Cast } from '../../models/credits.interface';
import { Genre, MovieDetail } from '../../models/movie-detail';
import { MovieVideos, VideoItem } from '../../models/movie-videos.interface';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.getMoviesDetails();
  }

  getMoviesDetails() {
    this.movieData$ = combineLatest({
      movie: this.moviesService.getMovie(this.movieId),
      cast: this.moviesService.getCastMovie(this.movieId),
      videos: this.moviesService.getVideoMovies(this.movieId),
    }).pipe(
      map(({ movie, cast, videos }) => ({
        movie,
        cast: cast.filter((actor) => actor.profile_path !== null),
        videos: videos.results,
        genres: movie.genres,
      }))
      // switchMap(([movieTmdb, castTmdb, videosTmdb]) =>
      //   this.getOmdbMovie(movieTmdb.imdb_id).pipe(
      //     map((movieOmdb: MovieOmdb) => ({
      //       movieTmdb,
      //       castTmdb,
      //       videosTmdb,
      //       movieOmdb,
      //     }))
      //   )
      // )
    );
    // .subscribe(({ movieTmdb, castTmdb, videosTmdb, movieOmdb }) => {
    //   this.setData(movieTmdb, movieOmdb, videosTmdb, castTmdb);
    //   this.changeDetectorRef.detectChanges();
    // });
  }

  setFavorite() {
    const { selectedFavorites, movieSelected } = this.getFavorites();

    let newSelectedFavorites: { id: string }[] = [];
    if (movieSelected) {
      newSelectedFavorites = selectedFavorites.filter(
        (favorite: { id: string }) => favorite.id !== this.movieId
      );
    } else {
      selectedFavorites.push({ id: this.movieId });
      newSelectedFavorites = selectedFavorites;
    }
    localStorage.setItem('favorites', JSON.stringify(newSelectedFavorites));
    this.favorite = !this.favorite;
  }

  private getFavorites() {
    const selectedFavorites =
      JSON.parse(localStorage.getItem('favorites')!) || [];
    const movieSelected = selectedFavorites.find(
      (favorite: { id: string }) => favorite.id === this.movieId
    );
    return { selectedFavorites, movieSelected };
  }
}
