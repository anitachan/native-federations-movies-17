import { Component, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { sidenavRoutes } from './app-routing.module';
import { SidenavBar } from './ui/models/sidenav-bar.interface';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  mobile$: Observable<boolean> = new Observable();
  sidenavConfig: SidenavBar[] = sidenavRoutes;
  sidenavOpen: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.mobile$ = this.breakpointObserver.observe(['(min-width: 600px)']).pipe(map((state: BreakpointState) => !state.matches));
  }
}
