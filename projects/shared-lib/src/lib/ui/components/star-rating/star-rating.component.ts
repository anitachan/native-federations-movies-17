import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FIVE, ONE, ZERO } from '../../utils/constants/number.constants';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number = ZERO;
  @Input() starCount: number = FIVE;
  @Input() color: string = 'accent';
  @Input() showVotes: boolean = false;

  ratingArr: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.rating = Math.round(this.rating);
    this.ratingArr = Array.from(new Array(this.starCount), (x, i) => i + ONE);
  }

  showIcon(index: number) {
    return Math.round(this.rating) >= index + ONE ? 'star' : 'star_border';
  }
}
