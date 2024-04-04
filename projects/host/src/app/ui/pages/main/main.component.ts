import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { sidenavRoutes } from '../../../app.routes';
import { SidenavBarComponent } from '../../components/sidenav-bar/sidenav-bar.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { SidenavBar } from '../../models/sidenav-bar.interface';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, SidenavBarComponent, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  mobile$: Observable<boolean> = new Observable();
  sidenavConfig: SidenavBar[] = sidenavRoutes;
  sidenavOpen: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.mobile$ = this.breakpointObserver.observe(['(min-width: 600px)']).pipe(map((state: BreakpointState) => !state.matches));
  }
}
