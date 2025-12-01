import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { Genre, MovieDetail, SharedLibModule } from 'shared-lib';
import { TEN, THREE } from '../../utils/constants/number.constants';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule, MatAccordion, MatExpansionModule, MatChipsModule, MatIcon, SharedLibModule],
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
