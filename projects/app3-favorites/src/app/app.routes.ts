import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GetMoviesGateway, SharedLibModule } from 'shared-lib';
import { FavoritesComponent } from './ui/components/favorites/favorites.component';
import { CustomMoviesService } from './infrastructure/driven-adapter/custom-movies.service';

export const routes: Routes = [
  {
    path: '',
    component: FavoritesComponent,
    providers: [
      importProvidersFrom(
        SharedLibModule.forRoot({
          infrastructures: [
            {
              gateway: GetMoviesGateway,
              implementation: CustomMoviesService,
            },
          ],
        })
      ),
    ],
  },
];
