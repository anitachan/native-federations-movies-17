import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedLibModule } from 'shared-lib';

import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [CommonModule, FavoritesRoutingModule, SharedLibModule],
})
export class FavoritesModule {}
