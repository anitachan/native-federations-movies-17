import { Observable } from 'rxjs';
import { MovieVideos } from 'shared-lib';

export abstract class GetVideosMovieGateway {
  abstract getVideosMovie(movieId: string): Observable<MovieVideos>;
}
