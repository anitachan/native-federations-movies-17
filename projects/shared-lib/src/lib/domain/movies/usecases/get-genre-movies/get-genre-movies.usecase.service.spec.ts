import { TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';
import { GetGenresMovieGateway } from '../../gateway/get-genres-movie.gateway';
import { GetGenreMoviesUsecaseService } from './get-genre-movies.usecase.service';

describe('GetGenreMoviesUsecaseService', () => {
  let useCase: GetGenreMoviesUsecaseService;

  const mockGenresData = {
    genres: [
      {
        id: 28,
        name: 'Action',
      },
      {
        id: 12,
        name: 'Adventure',
      },
      {
        id: 16,
        name: 'Animation',
      },
      {
        id: 35,
        name: 'Comedy',
      },
      {
        id: 80,
        name: 'Crime',
      },
      {
        id: 99,
        name: 'Documentary',
      },
      {
        id: 18,
        name: 'Drama',
      },
      {
        id: 10751,
        name: 'Family',
      },
      {
        id: 14,
        name: 'Fantasy',
      },
      {
        id: 36,
        name: 'History',
      },
      {
        id: 27,
        name: 'Horror',
      },
      {
        id: 10402,
        name: 'Music',
      },
      {
        id: 9648,
        name: 'Mystery',
      },
      {
        id: 10749,
        name: 'Romance',
      },
      {
        id: 878,
        name: 'Science Fiction',
      },
      {
        id: 10770,
        name: 'TV Movie',
      },
      {
        id: 53,
        name: 'Thriller',
      },
      {
        id: 10752,
        name: 'War',
      },
      {
        id: 37,
        name: 'Western',
      },
    ],
  };

  const mockGetGenresMovieGateway = {
    getGenresMovie: jest.fn(() => of(mockGenresData)),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetGenreMoviesUsecaseService, { provide: GetGenresMovieGateway, useValue: mockGetGenresMovieGateway }],
    });
    useCase = TestBed.inject(GetGenreMoviesUsecaseService);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should return the correct data', (done) => {
    const subscription = useCase.invoke().subscribe((data) => {
      expect(data).toEqual(mockGenresData);
      done();
    });
    subscription.unsubscribe();
  });

  it('should call invoke and return error', (done) => {
    const error = {
      status: 404,
    };
    jest.spyOn(mockGetGenresMovieGateway, 'getGenresMovie').mockImplementationOnce(() => throwError(() => error));

    const subscription = useCase.invoke().subscribe((resp) => {
      expect(resp).toEqual(error);
      done();
    });
    subscription.unsubscribe();
  });
});
