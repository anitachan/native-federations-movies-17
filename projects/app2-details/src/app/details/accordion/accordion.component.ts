import { Component, Input, OnInit } from '@angular/core';
import { MovieDetail, Genre } from 'shared-lib';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
  @Input() movie: MovieDetail;
  @Input() genres: Genre[];
  @Input() selectedActor: string = 'N/A';

  rating: number = 3;
  starCount: number = 10;

  constructor() {}

  ngOnInit(): void {}

  onRatingChanged(rating: number) {
    this.rating = rating;
  }
}