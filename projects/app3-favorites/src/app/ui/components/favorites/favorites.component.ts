import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { Movie, MovieDetail } from 'shared-lib';
import { CustomMoviesService } from '../../../infrastructure/driven-adapter/custom-movies.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  imageHeight: string = '75vh';
  urlImage: string = environment.tmdbImage;
}
