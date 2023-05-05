import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedLibModule } from 'shared-lib';

import { FavoritesComponent } from './components/favorites/favorites.component';
import { UiRoutingModule } from './ui-routing.module';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [CommonModule, UiRoutingModule, SharedLibModule],
})
export class UiModule {}
