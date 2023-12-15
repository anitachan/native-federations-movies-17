import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSidenavHarness } from '@angular/material/sidenav/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SidenavBarComponent } from './sidenav-bar.component';

describe('SidenavBarComponent', () => {
  let component: SidenavBarComponent;
  let fixture: ComponentFixture<SidenavBarComponent>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavBarComponent],
      imports: [NoopAnimationsModule, RouterTestingModule, MatSidenavModule, MatListModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be close the sidenav when the parameter is false', async () => {
    component.open = false;
    const sidenav = await loader.getHarness(MatSidenavHarness);
    const isOpen = await sidenav.isOpen();

    expect(isOpen).toBe(false);
  });

  it('should be open the sidenav when the parameter is true', async () => {
    component.open = true;
    const sidenav = await loader.getHarness(MatSidenavHarness);
    const isOpen = await sidenav.isOpen();

    expect(isOpen).toBe(true);
  });
});
