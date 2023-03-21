import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cast } from 'shared-lib';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss'],
})
export class CastComponent {
  @Input() cast: Cast[];
  @Output() actor: EventEmitter<string> = new EventEmitter<string>();

  getActor(actor: string) {
    this.actor.emit(actor);
  }
}
