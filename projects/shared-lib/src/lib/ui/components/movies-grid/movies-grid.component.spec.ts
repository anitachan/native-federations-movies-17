import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatGridListHarness, MatGridTileHarness } from '@angular/material/grid-list/testing';
import { MoviesGridComponent } from './movies-grid.component';
import { Movie } from '../../models/now-playing.interface';
import { MockPipe, MockComponent } from 'ng-mocks';
import { PosterPipe } from '../../pipes/poster.pipe';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('MoviesGridComponent', () => {
  let component: MoviesGridComponent;
  let fixture: ComponentFixture<MoviesGridComponent>;
  let loader: HarnessLoader;

  const mockMovies: Movie[] = [
    {
      adult: false,
      backdrop_path: '/t9nyF3r0WAlJ7Kr6xcRYI4jr9jm.jpg',
      genre_ids: [878, 28],
      id: 580489,
      original_title: 'Venom: Let There Be Carnage',
      overview:
        'After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.',
      popularity: 10352.991,
      poster_path: '/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg',
      title: 'Venom: Let There Be Carnage',
      video: false,
      vote_average: 7.2,
      vote_count: 518,
    },
    {
      adult: false,
      backdrop_path: '/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg',
      genre_ids: [35, 28, 12, 878],
      id: 550988,
      original_title: 'Free Guy',
      overview:
        'A bank teller called Guy realizes he is a background character in an open world video game called Free City that will soon go offline.',
      popularity: 5333.728,
      poster_path: '/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg',
      title: 'Free Guy',
      video: false,
      vote_average: 7.9,
      vote_count: 2611,
    },
    {
      adult: false,
      backdrop_path: '/aO9Nnv9GdwiPdkNO79TISlQ5bbG.jpg',
      genre_ids: [28, 12],
      id: 568620,
      original_title: 'Snake Eyes: G.I. Joe Origins',
      overview:
        "After saving the life of their heir apparent, tenacious loner Snake Eyes is welcomed into an ancient Japanese clan called the Arashikage where he is taught the ways of the ninja warrior. But, when secrets from his past are revealed, Snake Eyes' honor and allegiance will be tested – even if that means losing the trust of those closest to him.",
      popularity: 3101.51,
      poster_path: '/uIXF0sQGXOxQhbaEaKOi2VYlIL0.jpg',
      title: 'Snake Eyes: G.I. Joe Origins',
      video: false,
      vote_average: 6.9,
      vote_count: 635,
    },
    {
      adult: false,
      backdrop_path: '/kTOheVmqSBDIRGrQLv2SiSc89os.jpg',
      genre_ids: [16, 35, 10751],
      id: 639721,
      original_title: 'The Addams Family 2',
      overview:
        'The Addams get tangled up in more wacky adventures and find themselves involved in hilarious run-ins with all sorts of unsuspecting characters.',
      popularity: 2633.563,
      poster_path: '/xYLBgw7dHyEqmcrSk2Sq3asuSq5.jpg',
      title: 'The Addams Family 2',
      video: false,
      vote_average: 7.6,
      vote_count: 248,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesGridComponent, MockComponent(StarRatingComponent)],
      imports: [MatGridListModule, RouterTestingModule, MockPipe(PosterPipe)],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to load grid-list harnesses with columns', async () => {
    component.columns = 3;
    const harnesses = await loader.getHarness(MatGridListHarness);
    expect(await harnesses.getColumns()).toBe(3);
  });

  it('should set the data of the movie', async () => {
    component.movies = mockMovies;

    const grids = await loader.getAllHarnesses(MatGridTileHarness);
    expect(grids.length).toBe(mockMovies.length);

    expect(await parallel(() => grids.map(async grid => (await grid.host()).text()))).toEqual(
      mockMovies.map(movie => `${movie.original_title}${movie.overview.slice(0, 130)}... See More`)
    );
  });

  it('should redirect to movie detail with id', async () => {
    component.movies = mockMovies;

    const grids = await loader.getAllHarnesses(MatGridTileHarness);

    expect(
      await parallel(() =>
        grids.map(async grid => {
          const button = await grid.getHarness(MatButtonHarness);
          const host = await button.host();
          return await host.getAttribute('ng-reflect-router-link');
        })
      )
    ).toEqual(mockMovies.map(movie => `/detail,${movie.id}`));
  });
});
