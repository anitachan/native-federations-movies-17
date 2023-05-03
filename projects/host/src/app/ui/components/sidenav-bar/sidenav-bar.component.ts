import { Component, Input, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { SidenavBar } from '../../models/sidenav-bar.interface';

@Component({
  selector: 'app-sidenav-bar',
  templateUrl: './sidenav-bar.component.html',
  styleUrls: ['./sidenav-bar.component.scss'],
})
export class SidenavBarComponent {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @Input() sidenavConfig: SidenavBar[] = [];
  @Input() mobile = false;
  @Input() mode = 'over' as MatDrawerMode;

  @Input() set open(value: boolean) {
    if (this.sidenav) {
      value ? this.sidenav.open() : this.sidenav.close();
    }
  }
}
