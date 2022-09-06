import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cast } from 'shared-lib';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss'],
})
export class CastComponent implements OnInit {
  @Input() cast: Cast[];
  @Output() actor: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  getActor(actor: string) {
    this.actor.emit(actor);
  }
}
