import { Observable } from 'rxjs';
import { BaseService } from '../../helpers/services/base.service';
import { Genres } from '../models/movie-detail.interface';

export abstract class GetGenresMovieGateway extends BaseService {
  abstract getGenresMovie(): Observable<Genres>;
}
