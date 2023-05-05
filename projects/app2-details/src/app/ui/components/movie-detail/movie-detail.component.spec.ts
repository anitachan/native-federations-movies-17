import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MockComponents, MockModule, MockPipe, ngMocks } from 'ng-mocks';
import { of } from 'rxjs';
import { PosterPipe } from 'shared-lib';
import { AccordionComponent } from '../accordion/accordion.component';
import { MfeCastComponentsComponent } from '../mfe-cast-components/mfe-cast-components.component';
import { MovieDetailComponent } from './movie-detail.component';
import { CustomMoviesService } from '../../../infrastructure/custom-movies.service';
import { ONE, ZERO } from '../../utils/constants/number.constants';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  const movieData = {
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

  const castData = [
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
      profile_path: '',
      cast_id: 9,
      character: 'Anne Weying',
      credit_id: '5d4b75510021340013269639',
      order: 2,
    },
  ];

  const videoMovieData = {
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

  const mockCustomMoviesService = {
    getMovie: jest.fn(() => of(movieData)),
    getCastMovie: jest.fn(() => of(castData)),
    getVideoMovie: jest.fn(() => of(videoMovieData)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailComponent, MockComponents(AccordionComponent, MfeCastComponentsComponent), MockPipe(PosterPipe)],
      imports: [MockModule(MatIconModule)],
      providers: [
        { provide: CustomMoviesService, useValue: mockCustomMoviesService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: movieData.id,
              }),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the id for searching the movie', () => {
    expect(component.movieId).toEqual(movieData.id);
  });

  it('should set detail movie data', () => {
    const mockAccordionComponent = ngMocks.find<AccordionComponent>('app-accordion').componentInstance;

    expect(mockAccordionComponent.movie).toEqual(movieData);
    expect(mockAccordionComponent.genres).toEqual(movieData.genres);
  });

  it('should set the cast to the component', () => {
    const mockMfeCastComponentsComponent = ngMocks.find<MfeCastComponentsComponent>('app-mfe-cast-components').componentInstance;

    expect(mockMfeCastComponentsComponent.cast).toEqual([castData[0], castData[1]]);
  });

  it('should return favorite in true when movie id is in localStorage ', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify([{ id: '123ABC' }, { id: movieData.id }]));

    component.ngOnInit();

    expect(component.favorite).toBe(true);
  });

  it('should return favorite in false when movie id is not in localStorage ', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify([{ id: '123ABC' }, { id: '456DEF' }]));

    component.ngOnInit();

    expect(component.favorite).toBe(false);
  });

  it('should return favorite in false when localStorage does not have any favorites', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    component.ngOnInit();

    expect(component.favorite).toBe(false);
  });

  it('should set favorite movie when movie is not in localStorage', () => {
    const favoriteMovies = [{ id: '123ABC' }, { id: '456DEF' }, { id: movieData.id }];
    const localStorageMovies = favoriteMovies.slice(ZERO, -ONE);

    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(localStorageMovies));
    jest.spyOn(Storage.prototype, 'setItem');

    component.setFavorite();

    expect(Storage.prototype.setItem).toHaveBeenCalledWith('favorites', JSON.stringify(favoriteMovies));
  });

  it('should remove favorite movie when movie is in localStorage', () => {
    const localStorageMovies = [{ id: '123ABC' }, { id: '456DEF' }, { id: movieData.id }];
    const favoriteMovies = localStorageMovies.slice(ZERO, -ONE);

    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(localStorageMovies));
    jest.spyOn(Storage.prototype, 'setItem');

    component.setFavorite();

    expect(Storage.prototype.setItem).toHaveBeenCalledWith('favorites', JSON.stringify(favoriteMovies));
  });

  it('should set name actor when MfeCastComponentsComponent emit actor name', () => {
    const actor = 'Name Actor';
    jest.spyOn(component, 'getSelectActor');

    const mockMfeCastComponentsComponent = ngMocks.find<MfeCastComponentsComponent>('app-mfe-cast-components').componentInstance;
    mockMfeCastComponentsComponent.actor.emit(actor);

    expect(component.getSelectActor).toHaveBeenCalledWith(actor);
  });
});
