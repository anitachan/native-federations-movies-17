import { Component } from '@angular/core';
import { SharedLibModule } from 'shared-lib';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedLibModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  urlImage: string = environment.tmdbImage;
}
