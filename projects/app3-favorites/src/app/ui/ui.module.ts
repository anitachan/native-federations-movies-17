import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesGateway, SharedLibModule } from 'shared-lib';

import { FavoritesComponent } from './components/favorites/favorites.component';
import { UiRoutingModule } from './ui-routing.module';
import { CustomMoviesService } from '../infrastructure/driven-adapter/custom-movies.service';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    UiRoutingModule,
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
