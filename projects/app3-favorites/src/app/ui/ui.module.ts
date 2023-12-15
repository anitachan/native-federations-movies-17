import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GetMoviesGateway, SharedLibModule } from 'shared-lib';

import { CustomMoviesService } from '../infrastructure/driven-adapter/custom-movies.service';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { UiRoutingModule } from './ui-routing.module';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    UiRoutingModule,
    SharedLibModule.forRoot({
      infrastructures: [
        {
          gateway: GetMoviesGateway,
          implementation: CustomMoviesService,
        },
      ],
    }),
  ],
})
export class UiModule {}
