import { Observable } from 'rxjs';
import { BaseService } from '../../helpers/services/base.service';
import { Cast } from '../models/credits.interface';
import { MovieDetail, Genres } from '../models/movie-detail.interface';
import { MovieVideos } from '../models/movie-videos.interface';
import { Movie } from '../models/movies.interface';

export abstract class MoviesGateway extends BaseService {
  abstract getMovies(page: number): Observable<Movie[]>;
  abstract getMovie(movieId: string): Observable<MovieDetail>;
  abstract getGenreMovies(): Observable<Genres>;
  abstract getVideoMovie(movieId: string): Observable<MovieVideos>;
  abstract getCastMovie(movieId: string): Observable<Cast[]>;
}
