import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRatingComponent } from './star-rating.component';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTooltipHarness } from '@angular/material/tooltip/testing';
import { MatButtonModule } from '@angular/material/button';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
    const names = await parallel(() => icons.map(icon => icon.getName()));

    expect(buttons.length).toBe(10);
    expect(names).toEqual(['star', 'star', 'star', 'star', 'star', 'star', 'star', 'star_border', 'star_border', 'star_border']);
  });

  it('should load all tooltip harnesses', async () => {
    const tooltips = await loader.getAllHarnesses(MatTooltipHarness);
    expect(tooltips.length).toBe(10);
  });

  it('should show the correct text in tooltip', async () => {
    const tooltips = await loader.getAllHarnesses(MatTooltipHarness);
    await tooltips[0].show();
    expect(await tooltips[0].getTooltipText()).toBe('1');
  });
});
