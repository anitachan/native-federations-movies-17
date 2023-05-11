import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesGateway, SharedLibModule } from 'shared-lib';
import { CustomMoviesService } from './infrastructure/services/custom-movies.service';
import { DashboardComponent } from './ui/components/dashboard/dashboard.component';
import { ToolbarComponent } from './ui/components/toolbar/toolbar.component';
import { SidenavBarComponent } from './ui/components/sidenav-bar/sidenav-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [AppComponent, DashboardComponent, ToolbarComponent, SidenavBarComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    SharedLibModule.forRoot({
      infrastructures: [
        {
          gateway: MoviesGateway,
          implementation: CustomMoviesService,
        },
      ],
    }),
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
