import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { MockComponent, ngMocks } from 'ng-mocks';
import { of } from 'rxjs';
import { MoviesGridComponent } from 'shared-lib';
import { FavoritesComponent } from './favorites.component';
import { CustomMoviesService } from '../../../infrastructure/custom-movies.service';
import { THREE } from '../../utils/constants/number.constants';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  const movie = {
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

  const mapperMovie = {
    id: movie.id,
    title: movie.title,
    vote_average: movie.vote_average,
    overview: movie.overview,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
  };

  const mockCustomMoviesService = {
    getMovie: jest.fn(() => of(movie)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesComponent, MockComponent(MoviesGridComponent)],
      providers: [{ provide: CustomMoviesService, useValue: mockCustomMoviesService }],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an empty array when does not have favorites', async () => {
    const mockMoviesGridComponent = fixture.debugElement.query(By.css('app-movies-grid'));

    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(''));

    expect(mockMoviesGridComponent).toBeFalsy();
  });

  it('should call 3 favorites movies', () => {
    const favoriteMovies = [{ id: 'ABC123' }, { id: 'DEF123' }, { id: 'GHI123' }];

    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(favoriteMovies));

    component.getFavoritesMovies();
    fixture.detectChanges();

    const mockMoviesGridComponent = ngMocks.find<MoviesGridComponent>('app-movies-grid').componentInstance;

    favoriteMovies.forEach((movie) => {
      expect(mockCustomMoviesService.getMovie).toHaveBeenCalledWith(movie.id);
    });

    expect(mockCustomMoviesService.getMovie).toHaveBeenCalledTimes(favoriteMovies.length);
    expect(mockMoviesGridComponent.movies).toEqual([mapperMovie, mapperMovie, mapperMovie]);
    expect(mockMoviesGridComponent.columns).toEqual(THREE);
  });
});
