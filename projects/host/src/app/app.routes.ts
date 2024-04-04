import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
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
  { path: 'home', component: DashboardComponent },
  {
    path: 'detail',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'app2-details',
        exposedModule: './Module',
      }).then((m) => m.UiModule),
  },
  // { path: 'search/:query', component: SearchComponent },
  {
    path: 'favorites',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'app3-favorites',
        exposedModule: './Module',
      }).then((m) => m.UiModule),
  },
  { path: '**', component: DashboardComponent },
];
