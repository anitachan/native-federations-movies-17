import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';

import { MoviesGateway, SharedLibModule } from 'shared-lib';

import { UiRoutingModule } from './ui-routing.module';
import { AccordionComponent } from './components/accordion/accordion.component';
import { CustomMoviesService } from '../infrastructure/custom-movies.service';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MfeCastComponentsComponent } from './components/mfe-cast-components/mfe-cast-components.component';

@NgModule({
  declarations: [MovieDetailComponent, AccordionComponent, MfeCastComponentsComponent],
  imports: [
    CommonModule,
    UiRoutingModule,
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
export class UiModule {}
