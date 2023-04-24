import { TestBed } from '@angular/core/testing';

import { GetNowPlayingMoviesUsecaseService } from './get-now-playing-movies.usecase.service';

describe('GetNowPlayingMoviesUsecaseService', () => {
  let service: GetNowPlayingMoviesUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetNowPlayingMoviesUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
