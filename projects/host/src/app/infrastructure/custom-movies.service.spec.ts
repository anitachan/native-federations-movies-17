import { TestBed } from '@angular/core/testing';

import { CustomMoviesService } from './custom-movies.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { EIGHT, FIVE, FOUR, NINE, ONE, SEVEN, SIX, THREE, TWO } from './constants/number.constants';

describe('CustomMoviesService', () => {
  let service: CustomMoviesService;
  let httpCtrl: HttpTestingController;

  const mockMoviesNowPlayingData = {
    dates: {
      maximum: '2021-10-19',
      minimum: '2021-09-01',
    },
    page: 1,
    results: [
      {
        adult: false,
        backdrop_path: '/t9nyF3r0WAlJ7Kr6xcRYI4jr9jm.jpg',
        genre_ids: [SEVEN, EIGHT],
        id: 580489,
        original_language: 'en',
        original_title: 'Venom: Let There Be Carnage',
        overview:
          'After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.',
        popularity: 10352.991,
        poster_path: '/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg',
        release_date: '2021-09-30',
        title: 'Venom: Let There Be Carnage',
        video: false,
        vote_average: 7.2,
        vote_count: 518,
      },
      {
        adult: false,
        backdrop_path: '/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg',
        genre_ids: [ONE, TWO, THREE, FOUR],
        id: 550988,
        original_language: 'en',
        original_title: 'Free Guy',
        overview:
          'A bank teller called Guy realizes he is a background character in an open world video game called Free City that will soon go offline.',
        popularity: 5333.728,
        poster_path: '/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg',
        release_date: '2021-08-11',
        title: 'Free Guy',
        video: false,
        vote_average: 7.9,
        vote_count: 2611,
      },
      {
        adult: false,
        backdrop_path: '/aO9Nnv9GdwiPdkNO79TISlQ5bbG.jpg',
        genre_ids: [FIVE, SIX],
        id: 568620,
        original_language: 'en',
        original_title: 'Snake Eyes: G.I. Joe Origins',
        overview:
          "After saving the life of their heir apparent, tenacious loner Snake Eyes is welcomed into an ancient Japanese clan called the Arashikage where he is taught the ways of the ninja warrior. But, when secrets from his past are revealed, Snake Eyes' honor and allegiance will be tested – even if that means losing the trust of those closest to him.",
        popularity: 3101.51,
        poster_path: '/uIXF0sQGXOxQhbaEaKOi2VYlIL0.jpg',
        release_date: '2021-07-22',
        title: 'Snake Eyes: G.I. Joe Origins',
        video: false,
        vote_average: 6.9,
        vote_count: 635,
      },
      {
        adult: false,
        backdrop_path: '/kTOheVmqSBDIRGrQLv2SiSc89os.jpg',
        genre_ids: [SEVEN, EIGHT, NINE],
        id: 639721,
        original_language: 'en',
        original_title: 'The Addams Family 2',
        overview:
          'The Addams get tangled up in more wacky adventures and find themselves involved in hilarious run-ins with all sorts of unsuspecting characters.',
        popularity: 2633.563,
        poster_path: '/xYLBgw7dHyEqmcrSk2Sq3asuSq5.jpg',
        release_date: '2021-10-01',
        title: 'The Addams Family 2',
        video: false,
        vote_average: 7.6,
        vote_count: 248,
      },
    ],
    total_pages: 85,
    total_results: 1683,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(CustomMoviesService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get and return now playing movies', (done) => {
    const url: string = `${environment.tmdbUrl}movie/now_playing?api_key=${service.params.api_key}&page=${service.params.page}`;
    const subscription = service.getNowPlayingMovies().subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response).toEqual(mockMoviesNowPlayingData);
      done();
    });

    const mockHttp = httpCtrl.expectOne(url);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual('GET');

    mockHttp.flush(mockMoviesNowPlayingData);
    subscription.unsubscribe();
  });

  it('should return error when getCastMovie is called', () => {
    expect(() => service.getCastMovie('movieID')).toThrow('Method not implemented.');
  });

  it('should return error when getVideoMovie is called', () => {
    expect(() => service.getVideoMovie('movieID')).toThrow('Method not implemented.');
  });

  it('should return error when getMovie is called', () => {
    expect(() => service.getMovie('movieID')).toThrow('Method not implemented.');
  });

  it('should return error when getGenreMovies is called', () => {
    expect(() => service.getGenreMovies()).toThrow('Method not implemented.');
  });
});
