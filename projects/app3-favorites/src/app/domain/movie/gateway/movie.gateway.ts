import { Observable } from 'rxjs';
import { MovieDetail } from 'shared-lib';

export abstract class MovieGateway {
  abstract getMovie(movieId: string): Observable<MovieDetail>;
}
