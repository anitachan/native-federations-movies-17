import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatChipsModule } from '@angular/material/chips';
import { MatChipListboxHarness } from '@angular/material/chips/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAccordionHarness, MatExpansionPanelHarness } from '@angular/material/expansion/testing';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent, MockModule, ngMocks } from 'ng-mocks';
import { StarRatingComponent } from 'shared-lib';
import { ONE, SIX, TEN } from '../../utils/constants/number.constants';
import { AccordionComponent } from './accordion.component';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;
  let loader: HarnessLoader;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccordionComponent, MockComponent(StarRatingComponent)],
      imports: [NoopAnimationsModule, MatExpansionModule, MatChipsModule, MockModule(MatIconModule)],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    component.movie = movieData;
    component.genres = movieData.genres;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show one accordion', async () => {
    const accordions = await loader.getAllHarnesses(MatAccordionHarness);
    expect(accordions.length).toBe(ONE);
  });

  it('should show six expansion panels', async () => {
    const expansion = await loader.getAllHarnesses(MatExpansionPanelHarness);
    expect(expansion.length).toBe(SIX);
  });

  const panels = [
    {
      name: 'expansionOverview',
      data: movieData.overview,
    },
    { name: 'expansionBudget', data: `$ ${movieData.budget}` },
    { name: 'expansionHomepage', data: movieData.homepage },
    // { name: 'expansionRating', data: movieData.budget },
    { name: 'expansionActor', data: 'N/A' },
  ];

  panels.forEach(({ name, data }) => {
    it(`should show ${name} of the component`, async () => {
      const panel = await loader.getHarness(MatExpansionPanelHarness.with({ selector: `[data-test-selector="${name}"]` }));
      const content = await panel.getTextContent();

      expect(content).toEqual(data);
    });
  });

  it(`should show the genres of the component`, async () => {
    const panel = await loader.getHarness(MatExpansionPanelHarness.with({ selector: `[data-test-selector="expansionGenres"]` }));
    const chipList = await panel.getHarness(MatChipListboxHarness);
    const chips = await chipList.getChips();

    expect(await parallel(() => chips.map((chip) => chip.getText()))).toEqual(movieData.genres.map((genre) => genre.name));
  });

  it(`should show the rating of the component`, async () => {
    const mockStarRatingComponent = ngMocks.find<StarRatingComponent>('app-star-rating').componentInstance;

    expect(mockStarRatingComponent.color).toEqual('yellow');
    expect(mockStarRatingComponent.rating).toEqual(movieData.vote_average);
    expect(mockStarRatingComponent.starCount).toEqual(TEN);
    expect(mockStarRatingComponent.showVotes).toEqual(true);
  });
});
