import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { By } from '@angular/platform-browser';
import { RouterLink, RouterModule } from '@angular/router';
import { MockModule } from 'ng-mocks';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [
        MockModule(MatToolbarModule),
        MockModule(MatIconModule),
        MatButtonModule,
        RouterModule.forRoot([{ path: 'home', component: DashboardComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set router link home', () => {
    const debug = fixture.debugElement.query(By.css('[data-test-selector="homeButton"]'));
    const routerLink = debug.injector.get(RouterLink);

    expect(routerLink.urlTree?.toString()).toEqual('/home');
  });

  it('should set router link favorites', () => {
    const debug = fixture.debugElement.query(By.css('[data-test-selector="favoritesButton"]'));
    const routerLink = debug.injector.get(RouterLink);

    expect(routerLink.urlTree?.toString()).toEqual('/favorites');
  });

  it('should emit sidenavEvent with false', () => {
    component.sidenavOpen = true;
    jest.spyOn(component.sidenavEvent, 'emit');
    component.toggleSideBar();

    expect(component.sidenavEvent.emit).toHaveBeenCalledWith(false);
  });

  it('should emit sidenavEvent with true', () => {
    component.sidenavOpen = false;
    jest.spyOn(component.sidenavEvent, 'emit');
    component.toggleSideBar();

    expect(component.sidenavEvent.emit).toHaveBeenCalledWith(true);
  });
});
