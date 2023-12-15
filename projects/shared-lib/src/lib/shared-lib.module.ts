import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedLibComponent } from './shared-lib.component';
import { DEFAULT_CONFIGURATION, DEFAULT_PROVIDERS, ENDPOINTS_CONFIG, ISharedLibConfigurationModel } from './shared-lib.configuration';
import { LoadingComponent } from './ui/components/loading/loading.component';
import { MoviesGridComponent } from './ui/components/movies-grid/movies-grid.component';
import { StarRatingComponent } from './ui/components/star-rating/star-rating.component';
import { PosterPipe } from './ui/pipes/poster.pipe';

@NgModule({
  declarations: [SharedLibComponent, MoviesGridComponent, StarRatingComponent, PosterPipe, LoadingComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatGridListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule,
  ],
  exports: [SharedLibComponent, MoviesGridComponent, StarRatingComponent, PosterPipe],
})
export class SharedLibModule {
  static forRoot(configuration: ISharedLibConfigurationModel): ModuleWithProviders<SharedLibModule> {
    let conf = DEFAULT_CONFIGURATION;
    if (configuration) {
      conf = {
        ...DEFAULT_CONFIGURATION,
        endpoints: configuration.endpoints ?? conf.endpoints,
        infrastructures: configuration.infrastructures ?? conf.infrastructures,
      };
    }
    return {
      ngModule: SharedLibModule,
      providers: [
        ...DEFAULT_PROVIDERS,
        ...conf.infrastructures.map((x) => {
          return { provide: x.gateway, useClass: x.implementation };
        }),
        { provide: ENDPOINTS_CONFIG, useValue: conf.endpoints },
      ],
    };
  }
}
