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
import { ToolbarComponent } from './home/toolbar/toolbar.component';
import { MoviesGateway, SharedLibModule } from 'shared-lib';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { CustomMoviesService } from './infrastructure/custom-movies.service';

@NgModule({
  declarations: [AppComponent, DashboardComponent, ToolbarComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
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
