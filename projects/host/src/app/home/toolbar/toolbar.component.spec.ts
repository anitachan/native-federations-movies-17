import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

import { MockModule } from 'ng-mocks';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ToolbarComponent } from './toolbar.component';

export class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [
        MockModule(MatToolbarModule),
        MockModule(MatIconModule),
        MatButtonModule,
        RouterTestingModule.withRoutes([{ path: 'home', component: DashboardComponent }]),
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

  it('should set router link home', async() => {
    const button = await loader.getHarness(MatButtonHarness.with({selector: '[data-test-selector="homeButton"]'}));

    const host = await button.host();
    const linkAttribute = await host.getAttribute('ng-reflect-router-link');

    expect(linkAttribute).toEqual('/home')
  });

  it('should set router link favorites', async() => {
    const button = await loader.getHarness(MatButtonHarness.with({selector: '[data-test-selector="favoritesButton"]'}));

    const host = await button.host();
    const linkAttribute = await host.getAttribute('ng-reflect-router-link');

    expect(linkAttribute).toEqual('/favorites')
  });



});
