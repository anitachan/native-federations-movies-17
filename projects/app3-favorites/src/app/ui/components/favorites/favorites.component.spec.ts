import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent, ngMocks } from 'ng-mocks';
import { MoviesGridComponent } from 'shared-lib';
import { THREE } from '../../utils/constants/number.constants';
import { FavoritesComponent } from './favorites.component';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesComponent, MockComponent(MoviesGridComponent)],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call 3 favorites movies', () => {
    const mockMoviesGridComponent = ngMocks.find<MoviesGridComponent>('app-movies-grid').componentInstance;

    expect(mockMoviesGridComponent.columns).toEqual(THREE);
  });
});
