import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfeCastComponentsComponent } from './mfe-cast-components.component';

describe('MfeCastComponentsComponent', () => {
  let component: MfeCastComponentsComponent;
  let fixture: ComponentFixture<MfeCastComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfeCastComponentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MfeCastComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
