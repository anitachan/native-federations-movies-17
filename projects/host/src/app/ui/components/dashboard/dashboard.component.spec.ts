import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { MockProvider, ngMocks, MockComponent } from 'ng-mocks';
import { MoviesGridComponent } from 'shared-lib';
import { of, pipe } from 'rxjs';

import { SEVEN, EIGHT, ONE, TWO, THREE, FOUR, FIVE, SIX, NINE } from '../../../infrastructure/utils/constants/number.constants';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, MockComponent(MoviesGridComponent)],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call movie service when the component init and send the child component the correct data', () => {
    const mockMoviesGridComponent = ngMocks.find<MoviesGridComponent>('app-movies-grid').componentInstance;

    expect(mockMoviesGridComponent.columns).toEqual(TWO);
    expect(mockMoviesGridComponent.urlImage).toEqual(component.urlImage);
  });
});
