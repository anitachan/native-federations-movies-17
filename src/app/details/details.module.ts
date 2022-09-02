import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';

import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SharedModule } from '../shared/shared.module';
import { DetailsRoutingModule } from './details-routing.module';
import { AccordionComponent } from './accordion/accordion.component';

@NgModule({
  declarations: [MovieDetailComponent, AccordionComponent],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatChipsModule,
  ],
})
export class DetailsModule {}
