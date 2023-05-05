import { Component, Input, OnInit } from '@angular/core';
import { MovieDetail, Genre } from 'shared-lib';
import { TEN, THREE } from '../../utils/constants/number.constants';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  @Input() movie: MovieDetail;
  @Input() genres: Genre[];
  @Input() selectedActor: string = 'N/A';

  rating: number = THREE;
  starCount: number = TEN;
}
