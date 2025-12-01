import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GetMoviesGateway, SharedLibModule } from 'shared-lib';
import { routes } from './app.routes';
import { CustomGetMoviesService } from './infrastructure/driven-adapter/custom-get-movies.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations(),
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
};
