import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetGenresMovieService } from './get-genres-movie.service';
import { GET_GENRES_MOVIE_SERVICE_ENDPOINTS } from './get-genres-movie.service.configuration';

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

const tmdbUrl = 'https://api.themoviedb.org/3';
const mockGetGenresMovieServiceEndpoints = {
  GET_GENRES_MOVIE: `${tmdbUrl}/getGenres`,
};

describe('GetGenresMovieService', () => {
  let service: GetGenresMovieService;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: GET_GENRES_MOVIE_SERVICE_ENDPOINTS,
          useValue: mockGetGenresMovieServiceEndpoints,
        },
      ],
    });
    service = TestBed.inject(GetGenresMovieService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should genres movie', (done) => {
    const response = service.getGenresMovie();
    const subscription = response.subscribe((data) => {
      expect(data).toBe(mockGenresData);
      done();
    });

    const request = httpCtrl.expectOne(mockGetGenresMovieServiceEndpoints.GET_GENRES_MOVIE);
    expect(request.request.method).toBe('GET');
    request.flush(mockGenresData);
    subscription.unsubscribe();
  });
});
