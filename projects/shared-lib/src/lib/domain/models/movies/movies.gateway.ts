import { Observable } from 'rxjs';
import { BaseService } from '../../helpers/services/base.service';
import { Cast } from './credits.interface';
import { Genres, MovieDetail } from './movie-detail.interface';
import { MovieVideos } from './movie-videos.interface';
import { NowPlaying } from './now-playing.interface';

export abstract class MoviesGateway extends BaseService {
  abstract getNowPlayingMovies(page: number): Observable<NowPlaying>;
  abstract getMovie(movieId: string): Observable<MovieDetail>;
  abstract getGenreMovies(): Observable<Genres>;
  abstract getVideoMovie(movieId: string): Observable<MovieVideos>;
  abstract getCastMovie(movieId: string): Observable<Cast[]>;
}
