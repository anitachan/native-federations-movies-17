import { TestBed } from '@angular/core/testing';

import { GetVideoMovieUsecaseService } from './get-video-movie.usecase.service';

describe('GetVideoMovieUsecaseService', () => {
  let service: GetVideoMovieUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetVideoMovieUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
