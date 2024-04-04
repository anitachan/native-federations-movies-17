import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawerMode, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SidenavBar } from '../../models/sidenav-bar.interface';

@Component({
  selector: 'app-sidenav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatListModule, MatIconModule],
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
