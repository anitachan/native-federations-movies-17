import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MoviesService } from './movies.service';
import { MOVIES_SERVICE_ENDPOINTS } from './movies.service.configuration';
import { SEVEN, EIGHT, ONE, TWO, THREE, FOUR, FIVE, SIX, NINE } from '../../domain/helpers/constants/number.constants';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpCtrl: HttpTestingController;
  const tmdbUrl = 'https://api.themoviedb.org/3';

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

  const mockCastData = {
    id: 580489,
    cast: [
      {
        adult: false,
        gender: 2,
        id: 2524,
        known_for_department: 'Acting',
        name: 'Tom Hardy',
        original_name: 'Tom Hardy',
        popularity: 53.901,
        profile_path: '/sGMA6pA2D6X0gun49igJT3piHs3.jpg',
        cast_id: 1,
        character: 'Eddie Brock / Venom',
        credit_id: '5c5b3ebfc3a3683cc6885550',
        order: 0,
      },
      {
        adult: false,
        gender: 2,
        id: 57755,
        known_for_department: 'Acting',
        name: 'Woody Harrelson',
        original_name: 'Woody Harrelson',
        popularity: 21.577,
        profile_path: '/igxYDQBbTEdAqaJxaW6ffqswmUU.jpg',
        cast_id: 7,
        character: 'Cletus Kasady / Carnage',
        credit_id: '5c86bc069251410d3616ff8e',
        order: 1,
      },
      {
        adult: false,
        gender: 1,
        id: 1812,
        known_for_department: 'Acting',
        name: 'Michelle Williams',
        original_name: 'Michelle Williams',
        popularity: 12.076,
        profile_path: '/sXTP6wlqIDz1tDGLU3DFbklSTpq.jpg',
        cast_id: 9,
        character: 'Anne Weying',
        credit_id: '5d4b75510021340013269639',
        order: 2,
      },
      {
        adult: false,
        gender: 1,
        id: 2038,
        known_for_department: 'Acting',
        name: 'Naomie Harris',
        original_name: 'Naomie Harris',
        popularity: 12.51,
        profile_path: '/pDFs4gSeKSyIF8PditvtHqAq687.jpg',
        cast_id: 14,
        character: 'Frances Louise Barrison / Shriek',
        credit_id: '5daa557cb2681f0014915771',
        order: 3,
      },
      {
        adult: false,
        gender: 2,
        id: 81316,
        known_for_department: 'Acting',
        name: 'Reid Scott',
        original_name: 'Reid Scott',
        popularity: 4.228,
        profile_path: '/kBAeDUDA7XJRXFLGNALlpE5d3lA.jpg',
        cast_id: 13,
        character: 'Dr. Dan Lewis',
        credit_id: '5d8d512979b3d4001f894708',
        order: 4,
      },
      {
        adult: false,
        gender: 2,
        id: 1115,
        known_for_department: 'Acting',
        name: 'Stephen Graham',
        original_name: 'Stephen Graham',
        popularity: 6.499,
        profile_path: '/rkavERf9KK4Yvs8V4HWrTaUwoHX.jpg',
        cast_id: 15,
        character: 'Detective Mulligan',
        credit_id: '5de9c207a313b8001294cbbd',
        order: 5,
      },
      {
        adult: false,
        gender: 1,
        id: 2141479,
        known_for_department: 'Acting',
        name: 'Peggy Lu',
        original_name: 'Peggy Lu',
        popularity: 2.068,
        profile_path: '/ng5eaDcOf9kSwIYGNmwF9wEfIHp.jpg',
        cast_id: 35,
        character: 'Mrs. Chen',
        credit_id: '60b3aae457d378006f7291d8',
        order: 6,
      },
      {
        adult: false,
        gender: 1,
        id: 1225043,
        known_for_department: 'Acting',
        name: 'Sian Webber',
        original_name: 'Sian Webber',
        popularity: 0.717,
        profile_path: null,
        cast_id: 102,
        character: 'Dr. Pazzo',
        credit_id: '6157d6b469eb900061d1811d',
        order: 7,
      },
      {
        adult: false,
        gender: 0,
        id: 1966036,
        known_for_department: 'Acting',
        name: 'Michelle Greenidge',
        original_name: 'Michelle Greenidge',
        popularity: 1.889,
        profile_path: '/oi11TASk3g6Y0QFgb1aapADBMAR.jpg',
        cast_id: 42,
        character: 'Mugging Victim',
        credit_id: '60e4c30984591c0074b65ac8',
        order: 8,
      },
      {
        adult: false,
        gender: 0,
        id: 3255760,
        known_for_department: 'Acting',
        name: 'Rob Bowen',
        original_name: 'Rob Bowen',
        popularity: 0.6,
        profile_path: null,
        cast_id: 103,
        character: 'Beaten Mugger',
        credit_id: '6157d6f393828e005fce91e0',
        order: 9,
      },
      {
        adult: false,
        gender: 2,
        id: 1052257,
        known_for_department: 'Acting',
        name: 'Laurence Spellman',
        original_name: 'Laurence Spellman',
        popularity: 2.062,
        profile_path: '/47xoUxleCv94VQnkzkAoa1xRS5Z.jpg',
        cast_id: 39,
        character: 'Psycho Patient',
        credit_id: '60e4c26c258823005d816ae0',
        order: 10,
      },
      {
        adult: false,
        gender: 1,
        id: 2464328,
        known_for_department: 'Acting',
        name: 'Little Simz',
        original_name: 'Little Simz',
        popularity: 0.6,
        profile_path: null,
        cast_id: 104,
        character: 'Little Simz',
        credit_id: '6157d788eb14fa008c0e7d64',
        order: 11,
      },
      {
        adult: false,
        gender: 2,
        id: 2448692,
        known_for_department: 'Acting',
        name: 'Jack Bandeira',
        original_name: 'Jack Bandeira',
        popularity: 4.346,
        profile_path: '/510gfaNl3XiWsA6ZS8oplLmsDJp.jpg',
        cast_id: 105,
        character: 'Young Cletus',
        credit_id: '6157d7a76f8d950020bf137e',
        order: 12,
      },
      {
        adult: false,
        gender: 1,
        id: 3225965,
        known_for_department: 'Acting',
        name: 'Olumide Olorunfemi',
        original_name: 'Olumide Olorunfemi',
        popularity: 0.6,
        profile_path: null,
        cast_id: 100,
        character: 'Young Shirek',
        credit_id: '61576d22dcb6a3002a95ae56',
        order: 13,
      },
      {
        adult: false,
        gender: 2,
        id: 1656966,
        known_for_department: 'Acting',
        name: 'Scroobius Pip',
        original_name: 'Scroobius Pip',
        popularity: 1.38,
        profile_path: '/6wEJf3gs8JS6ATAVAZaH5YvGqpj.jpg',
        cast_id: 106,
        character: 'Siegfried',
        credit_id: '6157d7c36f8d950020bf139b',
        order: 14,
      },
      {
        adult: false,
        gender: 2,
        id: 1683344,
        known_for_department: 'Acting',
        name: 'Amrou Al-Kadhi',
        original_name: 'Amrou Al-Kadhi',
        popularity: 0.98,
        profile_path: '/wGr7Emb8ppfUThAc7rywI6wgfBJ.jpg',
        cast_id: 107,
        character: 'Host Two',
        credit_id: '6157d7edeb14fa00627e9d77',
        order: 15,
      },
      {
        adult: false,
        gender: 0,
        id: 3255761,
        known_for_department: 'Acting',
        name: 'Beau Sargent',
        original_name: 'Beau Sargent',
        popularity: 0.6,
        profile_path: null,
        cast_id: 108,
        character: 'Host Three',
        credit_id: '6157d806156cc700456895d7',
        order: 16,
      },
      {
        adult: false,
        gender: 0,
        id: 1073870,
        known_for_department: 'Acting',
        name: 'Brian Copeland',
        original_name: 'Brian Copeland',
        popularity: 0.6,
        profile_path: '/xD0G1ccbLRTHLlROotAL9Avc6kv.jpg',
        cast_id: 109,
        character: 'Rodeo Beach Reporter',
        credit_id: '6157d816d2147c002674ed22',
        order: 17,
      },
      {
        adult: false,
        gender: 0,
        id: 165359,
        known_for_department: 'Acting',
        name: 'Stewart Alexander',
        original_name: 'Stewart Alexander',
        popularity: 1.96,
        profile_path: '/najx2f4DAKt7DtQkPEyNXJURyNe.jpg',
        cast_id: 110,
        character: 'Warden',
        credit_id: '6157d82681c7be0025dc6409',
        order: 18,
      },
      {
        adult: false,
        gender: 2,
        id: 2021417,
        known_for_department: 'Acting',
        name: 'Sean Delaney',
        original_name: 'Sean Delaney',
        popularity: 0.739,
        profile_path: '/o5CKqXDL8D97kY7YWk8qHX7NZz7.jpg',
        cast_id: 36,
        character: 'Young Detective Mulligan',
        credit_id: '60b3aaebb7b69d0029114b0f',
        order: 19,
      },
      {
        adult: false,
        gender: 0,
        id: 1364950,
        known_for_department: 'Acting',
        name: 'Ed Kear',
        original_name: 'Ed Kear',
        popularity: 0.6,
        profile_path: '/jB1QY1DSN253bbtz51MHXEBj9O8.jpg',
        cast_id: 40,
        character: 'Reveler',
        credit_id: '60e4c27f07faa200301809c2',
        order: 20,
      },
      {
        adult: false,
        gender: 0,
        id: 2604970,
        known_for_department: 'Acting',
        name: 'Emma Lau',
        original_name: 'Emma Lau',
        popularity: 0.6,
        profile_path: null,
        cast_id: 111,
        character: 'Reveler',
        credit_id: '6157d841156cc7009403581e',
        order: 21,
      },
    ],
  };

  const mockVideoMovieData = {
    movieVideo: {
      id: 274,
      results: [
        {
          id: '5a859a309251410aae02170c',
          iso_639_1: 'en',
          iso_3166_1: 'US',
          key: '8xWbc_kFus4',
          name: 'Jodie Foster On Hannibal Lecter',
          site: 'YouTube',
          size: 360,
          type: 'Featurette',
        },
        {
          id: '5b5b3a8e0e0a26740d00bc0a',
          iso_639_1: 'en',
          iso_3166_1: 'US',
          key: 'W6Mm8Sbe__o',
          name: 'The Silence of the Lambs Official Trailer #1 - Anthony Hopkins Movie (1991) HD',
          site: 'YouTube',
          size: 720,
          type: 'Trailer',
        },
      ],
    },
    movieVideoUrl: [
      {
        url: 'https://www.youtube.com/embed/8xWbc_kFus4',
        name: 'Jodie Foster On Hannibal Lecter',
      },
      {
        url: 'https://www.youtube.com/embed/W6Mm8Sbe__o',
        name: 'The Silence of the Lambs Official Trailer #1 - Anthony Hopkins Movie (1991) HD',
      },
    ],
  };

  const mockMoviesServiceEndpoints = {
    GET_NOW_PLAYING_MOVIES: `${tmdbUrl}/getPlayingMovies`,
    GET_MOVIE: `${tmdbUrl}getMovie/`,
    GET_GENRE_MOVIES: `${tmdbUrl}/getGenres`,
    GET_VIDEO_MOVIE: `${tmdbUrl}/getVideos`,
    GET_CAST_MOVIE: `${tmdbUrl}/getCast`,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MoviesService,
        {
          provide: MOVIES_SERVICE_ENDPOINTS,
          useValue: mockMoviesServiceEndpoints,
        },
      ],
    });
    service = TestBed.inject(MoviesService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get now playing movies', (done) => {
    const response = service.getNowPlayingMovies(ONE);
    const subscription = response.subscribe((data) => {
      expect(data).toBe(mockMoviesNowPlayingData);
      done();
    });

    const request = httpCtrl.expectOne(mockMoviesServiceEndpoints.GET_NOW_PLAYING_MOVIES);
    expect(request.request.method).toBe('GET');
    request.flush(mockMoviesNowPlayingData);
    subscription.unsubscribe();
  });

  it('should get getMovie by Id', (done) => {
    const movieId = 'movieId';
    const response = service.getMovie(movieId);
    const subscription = response.subscribe((data) => {
      expect(data).toBe(mockMovieData);
      done();
    });

    const request = httpCtrl.expectOne(mockMoviesServiceEndpoints.GET_MOVIE);
    expect(request.request.method).toBe('GET');
    request.flush(mockMovieData);
    subscription.unsubscribe();
  });

  it('should genres movie', (done) => {
    const response = service.getGenreMovies();
    const subscription = response.subscribe((data) => {
      expect(data).toBe(mockGenresData);
      done();
    });

    const request = httpCtrl.expectOne(mockMoviesServiceEndpoints.GET_GENRE_MOVIES);
    expect(request.request.method).toBe('GET');
    request.flush(mockGenresData);
    subscription.unsubscribe();
  });

  it('should get getVideoMovie by Id', (done) => {
    const movieId = 'movieId';
    const response = service.getVideoMovie(movieId);
    const subscription = response.subscribe((data) => {
      expect(data).toBe(mockVideoMovieData);
      done();
    });

    const request = httpCtrl.expectOne(mockMoviesServiceEndpoints.GET_VIDEO_MOVIE);
    expect(request.request.method).toBe('GET');
    request.flush(mockVideoMovieData);
    subscription.unsubscribe();
  });

  it('should get getCastMovie by Id', (done) => {
    const movieId = 'movieId';
    const response = service.getCastMovie(movieId);
    const subscription = response.subscribe((data) => {
      expect(data).toBe(mockCastData);
      done();
    });

    const request = httpCtrl.expectOne(mockMoviesServiceEndpoints.GET_CAST_MOVIE);
    expect(request.request.method).toBe('GET');
    request.flush(mockCastData);
    subscription.unsubscribe();
  });
});
