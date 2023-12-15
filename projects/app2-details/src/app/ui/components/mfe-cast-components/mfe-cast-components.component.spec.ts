import { ComponentFixture, TestBed } from '@angular/core/testing';

import { loadRemoteModule } from '@angular-architects/module-federation';
import { ComponentRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cast } from 'shared-lib';
import { MfeCastComponentsComponent } from './mfe-cast-components.component';

jest.mock('@angular-architects/module-federation', () => ({
  loadRemoteModule: jest.fn(() => Promise.resolve({})),
}));

describe('MfeCastComponentsComponent', () => {
  let component: MfeCastComponentsComponent;
  let fixture: ComponentFixture<MfeCastComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MfeCastComponentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MfeCastComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should call remote component', async () => {
    const componentRef = {
      instance: { actor: of('Name') },
      destroy: jest.fn(),
    };
    const spy = jest.spyOn(component.viewContainer, 'createComponent').mockImplementation(
      jest.fn(() => {
        return componentRef as any as ComponentRef<{ cast: Cast[]; actor: Observable<string> }>;
      })
    );
    await component.load();

    expect(loadRemoteModule).toHaveBeenCalledWith({
      type: 'module',
      remoteEntry: 'http://localhost:4203/remoteEntry.js',
      exposedModule: './Component',
    });

    expect(spy).toHaveBeenCalled();
  });
});
