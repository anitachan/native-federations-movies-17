import { Observable } from 'rxjs';
import { MovieDetail } from 'shared-lib';

export abstract class GetMovieGateway {
  abstract getMovie(movieId: string): Observable<MovieDetail>;
}
