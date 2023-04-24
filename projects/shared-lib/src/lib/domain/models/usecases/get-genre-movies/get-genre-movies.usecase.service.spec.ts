import { TestBed } from '@angular/core/testing';

import { GetGenreMoviesUsecaseService } from './get-genre-movies.usecase.service';

describe('GetGenreMoviesUsecaseService', () => {
  let service: GetGenreMoviesUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetGenreMoviesUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
