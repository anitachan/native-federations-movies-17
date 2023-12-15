import { Observable } from 'rxjs';
import { Cast } from 'shared-lib';

export abstract class GetCastMovieGateway {
  abstract getCastMovie(movieId: string): Observable<Cast[]>;
}
