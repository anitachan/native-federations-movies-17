import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { SharedLibModule } from 'shared-lib';

import { GetCastMovieGateway } from '../domain/cast/gateway/get-cast-movie.gateway';
import { GetCastMovieUsecaseService } from '../domain/cast/usecases/get-cast-movie/get-cast-movie.usecase.service';
import { GetMovieGateway } from '../domain/movie/gateway/get-movie.gateway';
import { GetMovieUsecaseService } from '../domain/movie/usecases/get-movie/get-movie.usecase.service';
import { GetVideosMovieGateway } from '../domain/videos/gateway/get-videos-movie.gateway';
import { GetVideoMovieUsecaseService } from '../domain/videos/usecases/get-video-movie/get-video-movie.usecase.service';
import { GetCastMovieService } from '../infrastructure/driven-adapter/get-cast-movie.service';
import { CustomGetMovieService } from '../infrastructure/driven-adapter/get-movie.service';
import { GetVideosMovieService } from '../infrastructure/driven-adapter/get-videos-movie.service';
import { AccordionComponent } from './components/accordion/accordion.component';
import { MfeCastComponentsComponent } from './components/mfe-cast-components/mfe-cast-components.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { UiRoutingModule } from './ui-routing.module';

@NgModule({
  declarations: [MovieDetailComponent, AccordionComponent, MfeCastComponentsComponent],
  imports: [CommonModule, UiRoutingModule, MatIconModule, MatButtonModule, MatExpansionModule, MatChipsModule, SharedLibModule.forRoot({})],
  providers: [
    GetCastMovieUsecaseService,
    GetVideoMovieUsecaseService,
    GetMovieUsecaseService,
    {
      provide: GetCastMovieGateway,
      useClass: GetCastMovieService,
    },
    {
      provide: GetVideosMovieGateway,
      useClass: GetVideosMovieService,
    },
    {
      provide: GetMovieGateway,
      useClass: CustomGetMovieService,
    },
  ],
})
export class UiModule {}
