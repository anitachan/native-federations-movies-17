import { TestBed } from '@angular/core/testing';

import { CustomMoviesService } from './custom-movies.service';

describe('CustomMoviesService', () => {
  let service: CustomMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
