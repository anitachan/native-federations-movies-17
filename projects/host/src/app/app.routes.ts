import { loadRemoteModule } from '@angular-architects/native-federation';
import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { GetMoviesGateway, SharedLibModule } from 'shared-lib';
import { CustomGetMoviesService } from './infrastructure/driven-adapter/custom-get-movies.service';
import { DashboardComponent } from './ui/components/dashboard/dashboard.component';
import { SidenavBar } from './ui/models/sidenav-bar.interface';

export const sidenavRoutes: SidenavBar[] = [
  {
    id: 'home',
    label: 'Home',
    icon: 'home',
    route: '/home',
  },
  {
    id: 'favorites',
    label: 'Favorites',
    icon: 'favorite',
    route: '/favorites',
  },
];

export const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent,
    providers: [
      importProvidersFrom(
        SharedLibModule.forRoot({
          infrastructures: [
            {
              gateway: GetMoviesGateway,
              implementation: CustomGetMoviesService,
            },
          ],
        })
      ),
    ],
  },
  {
    path: 'detail',
    loadChildren: () => loadRemoteModule('app2-details', './routes').then((m) => m.routes),
  },
  // { path: 'search/:query', component: SearchComponent },
  {
    path: 'favorites',
    loadChildren: () => loadRemoteModule('app3-favorites', './routes').then((m) => m.routes),
  },
  { path: '**', component: DashboardComponent },
];
