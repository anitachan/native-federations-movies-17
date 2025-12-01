import { Component } from '@angular/core';
import { MoviesGridComponent, SharedLibModule } from 'shared-lib';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [SharedLibModule, MoviesGridComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  imageHeight: string = '75vh';
  urlImage: string = environment.tmdbImage;
}
