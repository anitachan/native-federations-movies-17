import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './home/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  {
    path: 'detail',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'app2-details',
        exposedModule: './Module',
      }).then((m) => m.DetailsModule),
  },
  // { path: 'search/:query', component: SearchComponent },
  {
    path: 'favorites',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'app3-favorites',
        exposedModule: './Module',
      }).then((m) => m.FavoritesModule),
  },
  { path: '**', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
