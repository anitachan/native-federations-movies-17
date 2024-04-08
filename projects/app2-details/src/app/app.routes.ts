import { Routes } from '@angular/router';
import { MainComponent } from './ui/pages/main/main.component';

// export const routes: Routes = [{ path: '', component: MainComponent, pathMatch: 'full' }];
export const routes: Routes = [{ path: ':id', component: MainComponent }];
