import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';

import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesRoutingModule } from './favorites/favorites-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedModule,
    MatGridListModule,
  ],
})
export class FavoritesModule {}
