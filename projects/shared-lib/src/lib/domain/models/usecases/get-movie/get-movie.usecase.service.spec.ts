import { TestBed } from '@angular/core/testing';

import { GetMovieUsecaseService } from './get-movie.usecase.service';

describe('GetMovieUsecaseService', () => {
  let service: GetMovieUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMovieUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
