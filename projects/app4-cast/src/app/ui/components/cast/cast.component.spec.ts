import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastComponent } from './cast.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatCardModule } from '@angular/material/card';
import { Cast, PosterPipe } from 'shared-lib';
import { MockPipe } from 'ng-mocks';

describe('CastComponent', () => {
  let component: CastComponent;
  let fixture: ComponentFixture<CastComponent>;
  let loader: HarnessLoader;

  const cast: Cast[] = [
    {
      gender: 2,
      id: 2524,
      name: 'Tom Hardy',
      profile_path: '/sGMA6pA2D6X0gun49igJT3piHs3.jpg',
      cast_id: 1,
      character: 'Eddie Brock / Venom',
      credit_id: '5c5b3ebfc3a3683cc6885550',
      order: 0,
    },
    {
      gender: 2,
      id: 57755,
      name: 'Woody Harrelson',
      profile_path: '/igxYDQBbTEdAqaJxaW6ffqswmUU.jpg',
      cast_id: 7,
      character: 'Cletus Kasady / Carnage',
      credit_id: '5c86bc069251410d3616ff8e',
      order: 1,
    },
    {
      gender: 1,
      id: 1812,
      name: 'Michelle Williams',
      profile_path: '/sXTP6wlqIDz1tDGLU3DFbklSTpq.jpg',
      cast_id: 9,
      character: 'Anne Weying',
      credit_id: '5d4b75510021340013269639',
      order: 2,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CastComponent],
      imports: [MatCardModule, MockPipe(PosterPipe)],
    }).compileComponents();

    fixture = TestBed.createComponent(CastComponent);
    component = fixture.componentInstance;
    component.cast = cast;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit select actor', () => {
    const actorId = 'actorId';
    jest.spyOn(component.actor, 'emit');

    component.getActor(actorId);

    expect(component.actor.emit).toHaveBeenCalledWith(actorId);
  });

  it('should show 3 actors cards', async () => {
    const cards = [];

    for (const actor of cast) {
      const card = await loader.getHarness(
        MatCardHarness.with({
          selector: `[data-test-selector="actorCard${actor.cast_id}"]`,
        })
      );
      cards.push(card);
    }

    expect(cards.length).toBe(cast.length);
  });

  it('should return actor when card is clicked', async () => {
    const { cast_id, name } = cast[0];
    jest.spyOn(component.actor, 'emit');

    const card = await loader.getHarness(
      MatCardHarness.with({
        selector: `[data-test-selector="actorCard${cast_id}"]`,
      })
    );

    (await card.host()).click();

    expect(component.actor.emit).toHaveBeenCalledWith(name);
  });
});
