import { Component, Input, OnInit } from '@angular/core';
import { Cast } from 'shared-lib';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss'],
})
export class CastComponent implements OnInit {
  @Input() cast: Cast[];

  constructor() {}

  ngOnInit(): void {
    console.log(this.cast);
  }
}
