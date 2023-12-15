import { Observable } from 'rxjs';
import { BaseService } from '../../helpers/services/base.service';
import { Movie } from '../models/movies.interface';

export abstract class GetMoviesGateway extends BaseService {
  abstract getMovies(page?: number): Observable<Movie[]>;
}
