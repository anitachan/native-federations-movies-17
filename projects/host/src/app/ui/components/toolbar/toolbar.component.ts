import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Output() sidenavEvent: EventEmitter<boolean> = new EventEmitter();

  sidenavOpen: boolean = false;

  toggleSideBar() {
    this.sidenavOpen = !this.sidenavOpen;
    this.sidenavEvent.emit(this.sidenavOpen);
  }
}
