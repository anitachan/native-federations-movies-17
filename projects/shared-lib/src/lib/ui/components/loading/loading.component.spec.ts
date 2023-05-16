import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatProgressSpinnerHarness } from '@angular/material/progress-spinner/testing';
import { ONE, ZERO } from '../../utils/constants/number.constants';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      imports: [MatProgressSpinnerModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show blur and spinner when loading is false', async () => {
    const progressSpinners = await loader.getAllHarnesses(MatProgressSpinnerHarness);
    const blur = fixture.nativeElement.querySelector('.overlay');

    expect(progressSpinners.length).toBe(ZERO);
    expect(blur).toBeFalsy();
  });

  it('should show blur and spinner when loading is true', async () => {
    component.loading = true;

    const progressSpinners = await loader.getAllHarnesses(MatProgressSpinnerHarness);
    const blur = fixture.nativeElement.querySelector('.overlay');

    expect(progressSpinners.length).toBe(ONE);
    expect(blur).toBeTruthy();
  });
});
