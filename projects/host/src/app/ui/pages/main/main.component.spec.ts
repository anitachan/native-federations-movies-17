import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakpointObserver } from '@angular/cdk/layout';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponents } from 'ng-mocks';
import { of } from 'rxjs';
import { SidenavBarComponent } from '../../components/sidenav-bar/sidenav-bar.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  const mockBreakpointObserver = {
    observe: jest.fn(() => of({ matches: false, breakpoints: {} })),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MainComponent, MockComponents(SidenavBarComponent, ToolbarComponent)],
      providers: [{ provide: BreakpointObserver, useValue: mockBreakpointObserver }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MainComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should return true if is mobile', (done) => {
    jest.spyOn(mockBreakpointObserver, 'observe').mockReturnValueOnce(of({ matches: false, breakpoints: {} }));

    component.ngOnInit();
    component.mobile$.subscribe((res) => {
      expect(res).toBe(true);
      done();
    });
  });

  it('should return false if is not mobile', (done) => {
    jest.spyOn(mockBreakpointObserver, 'observe').mockReturnValue(of({ matches: true, breakpoints: {} }));

    component.ngOnInit();
    component.mobile$.subscribe((res) => {
      expect(res).toBe(false);
      done();
    });
  });
});
