import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
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
