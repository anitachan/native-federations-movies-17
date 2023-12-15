import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTooltipHarness } from '@angular/material/tooltip/testing';
import { TEN } from '../../utils/constants/number.constants';
import { StarRatingComponent } from './star-rating.component';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarRatingComponent],
      imports: [MatIconModule, MatTooltipModule, MatButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    component.starCount = 10;
    component.rating = 6.7;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the correct icon', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    const icons = await loader.getAllHarnesses(MatIconHarness);
    const names = await parallel(() => icons.map((icon) => icon.getName()));

    expect(buttons.length).toBe(TEN);
    expect(names).toEqual(['star', 'star', 'star', 'star', 'star', 'star', 'star', 'star_border', 'star_border', 'star_border']);
  });

  it('should load all tooltip harnesses', async () => {
    const tooltips = await loader.getAllHarnesses(MatTooltipHarness);
    expect(tooltips.length).toBe(TEN);
  });

  it('should show the correct text in tooltip', async () => {
    const tooltips = await loader.getAllHarnesses(MatTooltipHarness);
    await tooltips[0].show();
    expect(await tooltips[0].getTooltipText()).toBe('1');
  });
});
