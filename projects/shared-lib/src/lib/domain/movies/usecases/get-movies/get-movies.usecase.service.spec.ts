import { TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';
import { EIGHT, FIVE, FOUR, NINE, ONE, SEVEN, SIX, THREE, TWO } from '../../../helpers/constants/number.constants';
import { GetMoviesGateway } from '../../gateway/get-movies.gateway';
import { GetMoviesUsecaseService } from './get-movies.usecase.service';

describe('GetNowPlayingMoviesUsecaseService', () => {
  let useCase: GetMoviesUsecaseService;

  const mockMoviesData = [
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
  ];

  const mockGetMoviesGateway = {
    getMovies: jest.fn(() => of(mockMoviesData)),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetMoviesUsecaseService, { provide: GetMoviesGateway, useValue: mockGetMoviesGateway }],
    });
    useCase = TestBed.inject(GetMoviesUsecaseService);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should return the correct data', (done) => {
    const subscription = useCase.invoke(ONE).subscribe((data) => {
      expect(data).toEqual(mockMoviesData);
      done();
    });

    subscription.unsubscribe();
  });

  it('should call invoke and return error', (done) => {
    const error = {
      status: 404,
    };
    jest.spyOn(mockGetMoviesGateway, 'getMovies').mockImplementationOnce(() => throwError(() => error));

    const subscription = useCase.invoke(ONE).subscribe((resp) => {
      expect(resp).toEqual(error);
      done();
    });
    subscription.unsubscribe();
  });
});
