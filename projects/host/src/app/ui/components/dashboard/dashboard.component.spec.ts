import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockModule, ngMocks } from 'ng-mocks';
import { MoviesGridComponent, SharedLibModule } from 'shared-lib';
import { TWO } from '../../../core/constants/number.constants';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, MockModule(SharedLibModule)],
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
