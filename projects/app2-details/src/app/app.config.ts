import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { GetMovieGateway } from './domain/movie/gateway/get-movie.gateway';
import { CustomGetMovieService } from './infrastructure/driven-adapter/get-movie.service';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: GetMovieGateway, useClass: CustomGetMovieService },
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
};
