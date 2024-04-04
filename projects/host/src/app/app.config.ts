import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetMoviesGateway, SharedLibModule } from 'shared-lib';
import { routes } from './app.routes';
import { CustomGetMoviesService } from './infrastructure/driven-adapter/custom-get-movies.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      BrowserAnimationsModule,
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
};
