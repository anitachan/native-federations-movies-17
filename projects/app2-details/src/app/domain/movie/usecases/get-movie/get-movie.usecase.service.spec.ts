import { TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';
import { GetMovieGateway } from '../../gateway/get-movie.gateway';
import { GetMovieUsecaseService } from './get-movie.usecase.service';

describe('GetMovieUsecaseService', () => {
  let useCase: GetMovieUsecaseService;

  const mockBody: any = {
    movieId: '123456',
  };

  const mockMovieData = {
    adult: false,
    backdrop_path: '/mfwq2nMBzArzQ7Y9RKE8SKeeTkg.jpg',
    belongs_to_collection: {
      id: 9743,
      name: 'The Hannibal Lecter Collection',
      poster_path: '/aRbyr3KsdmIczGh6VrlvlgQdwMQ.jpg',
      backdrop_path: '/npCbvak9UhjPsZB9Oa2k2jsqI7E.jpg',
    },
    budget: 19000000,
    genres: [
      {
        id: 80,
        name: 'Crime',
      },
      {
        id: 18,
        name: 'Drama',
      },
      {
        id: 53,
        name: 'Thriller',
      },
      {
        id: 27,
        name: 'Horror',
      },
    ],
    homepage: '',
    id: 274,
    imdb_id: 'tt0102926',
    original_language: 'en',
    original_title: 'The Silence of the Lambs',
    overview:
      "Clarice Starling is a top student at the FBI's training academy. Jack Crawford wants Clarice to interview Dr. Hannibal Lecter, a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism. Crawford believes that Lecter may have insight into a case and that Starling, as an attractive young woman, may be just the bait to draw him out.",
    popularity: 8.841,
    poster_path: '/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg',
    production_companies: [
      {
        id: 41,
        logo_path: '/AuAIlCWBrbhbUFFrJ6M9E3ihBoj.png',
        name: 'Orion Pictures',
        origin_country: 'US',
      },
      {
        id: 55072,
        logo_path: null,
        name: 'Strong Heart/Demme Production',
        origin_country: 'US',
      },
    ],
    production_countries: [
      {
        iso_3166_1: 'US',
        name: 'United States of America',
      },
    ],
    release_date: '1991-02-01',
    revenue: 272742922,
    runtime: 119,
    spoken_languages: [
      {
        english_name: 'English',
        iso_639_1: 'en',
        name: 'English',
      },
    ],
    status: 'Released',
    tagline: 'To enter the mind of a killer she must challenge the mind of a madman.',
    title: 'The Silence of the Lambs',
    video: false,
    vote_average: 8.3,
    vote_count: 12064,
  };

  const mockGetMovieGateway = {
    getMovie: jest.fn(() => of(mockMovieData)),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetMovieUsecaseService, { provide: GetMovieGateway, useValue: mockGetMovieGateway }],
    });
    useCase = TestBed.inject(GetMovieUsecaseService);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should return the correct data', (done) => {
    const subscription = useCase.invoke(mockBody).subscribe((data) => {
      expect(data).toEqual(mockMovieData);
      done();
    });
    subscription.unsubscribe();
  });

  it('should call invoke and return error', (done) => {
    const error = {
      status: 404,
    };
    jest.spyOn(mockGetMovieGateway, 'getMovie').mockImplementationOnce(() => throwError(() => error));

    const subscription = useCase.invoke(mockBody).subscribe((resp) => {
      expect(resp).toEqual(error);
      done();
    });
    subscription.unsubscribe();
  });
});
