import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { MovieVideos } from 'shared-lib';
import { GetVideosMovieGateway } from '../../gateway/get-videos-movie.gateway';

@Injectable({
  providedIn: 'root',
})
export class GetVideoMovieUsecaseService {
  constructor(private getVideosMovieGateway: GetVideosMovieGateway) {}

  invoke(body: any): Observable<MovieVideos> {
    return this.getVideosMovieGateway.getVideosMovie(body).pipe(catchError((error) => of(error)));
  }
}
