import { Routes } from '@angular/router';
import { movieDetailProviders } from './app.providers';
import { MovieDetailComponent } from './ui/components/movie-detail/movie-detail.component';

export const routes: Routes = [
  {
    path: ':id',
    component: MovieDetailComponent,
    providers: [...movieDetailProviders],
  },
];
