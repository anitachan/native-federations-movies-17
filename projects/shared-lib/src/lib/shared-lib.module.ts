import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SharedLibComponent } from './shared-lib.component';
import { CommonModule } from '@angular/common';
import { PosterPipe } from './pipes/poster.pipe';
import { MoviesGridComponent } from './components/movies-grid/movies-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingComponent } from './components/star-rating/star-rating.component';

@NgModule({
  declarations: [
    SharedLibComponent,
    MoviesGridComponent,
    StarRatingComponent,
    PosterPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatGridListModule,
    MatIconModule,
  ],
  exports: [
    SharedLibComponent,
    MoviesGridComponent,
    StarRatingComponent,
    PosterPipe,
  ],
})
export class SharedLibModule {}
