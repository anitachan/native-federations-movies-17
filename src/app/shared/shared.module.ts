import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';

import { PosterPipe } from './pipes/poster.pipe';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { MoviesGridComponent } from './movies-grid/movies-grid.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PosterPipe, StarRatingComponent, MoviesGridComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatGridListModule,
    MatIconModule,
  ],
  exports: [PosterPipe, StarRatingComponent, MoviesGridComponent],
})
export class SharedModule {}
