import { TestBed } from '@angular/core/testing';

import { GetCastMovieUsecaseService } from './get-cast-movie.usecase.service';

describe('GetCastMovieUsecaseService', () => {
  let service: GetCastMovieUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCastMovieUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
