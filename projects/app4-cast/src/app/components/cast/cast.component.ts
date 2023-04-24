import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cast } from 'shared-lib';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss'],
})
export class CastComponent {
  urlImage: string = environment.tmdbImage;
  @Input() cast: Cast[];
  @Output() actor: EventEmitter<string> = new EventEmitter<string>();

  getActor(actor: string) {
    this.actor.emit(actor);
  }
}
