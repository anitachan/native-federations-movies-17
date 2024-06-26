import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { RouterModule } from '@angular/router';
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

  it('should set router link home', async () => {
    const button = await loader.getHarness(MatButtonHarness.with({ selector: '[data-test-selector="homeButton"]' }));

    const host = await button.host();
    const linkAttribute = await host.getAttribute('ng-reflect-router-link');

    expect(linkAttribute).toEqual('/home');
  });

  it('should set router link favorites', async () => {
    const button = await loader.getHarness(MatButtonHarness.with({ selector: '[data-test-selector="favoritesButton"]' }));

    const host = await button.host();
    const linkAttribute = await host.getAttribute('ng-reflect-router-link');

    expect(linkAttribute).toEqual('/favorites');
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
