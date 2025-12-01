import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FIVE, ONE, ZERO } from '../../utils/constants/number.constants';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  imports: [CommonModule, MatIconButton, MatTooltip, MatIcon, MatError],
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number = ZERO;
  @Input() starCount: number = FIVE;
  @Input() color: string = 'accent';
  @Input() showVotes: boolean = false;

  public ratingArr: number[] = [];

  ngOnInit(): void {
    this.rating = Math.round(this.rating);
    this.ratingArr = Array.from(new Array(this.starCount), (x, i) => i + ONE);
  }

  showIcon(index: number) {
    return Math.round(this.rating) >= index + ONE ? 'star' : 'star_border';
  }
}
