import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';

import { MoviesGateway, SharedLibModule } from 'shared-lib';

import { DetailsRoutingModule } from './details-routing.module';
import { AccordionComponent } from './accordion/accordion.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MfeCastComponentsComponent } from './mfe-cast-components/mfe-cast-components.component';
import { CustomMoviesService } from '../infrastructure/custom-movies.service';

@NgModule({
  declarations: [MovieDetailComponent, AccordionComponent, MfeCastComponentsComponent],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatChipsModule,
    SharedLibModule.forRoot({
      infrastructures: [
        {
          gateway: MoviesGateway,
          implementation: CustomMoviesService,
        },
      ],
    }),
  ],
})
export class DetailsModule {}
