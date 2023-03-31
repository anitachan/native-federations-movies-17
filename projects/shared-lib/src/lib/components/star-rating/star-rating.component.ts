import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {
  @Input('rating') rating: number = 0;
  @Input('starCount') starCount: number = 5;
  @Input('color') color: string = 'accent';
  @Input('showVotes') showVotes: boolean = false;

  ratingArr: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.rating = Math.round(this.rating);
    this.ratingArr = Array.from(new Array(this.starCount), (x, i) => i + 1);
  }

  showIcon(index: number) {
    if (Math.round(this.rating) >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
