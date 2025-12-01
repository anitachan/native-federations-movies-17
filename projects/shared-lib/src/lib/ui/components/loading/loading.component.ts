import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  imports: [CommonModule, MatProgressSpinner],
})
export class LoadingComponent {
  @Input() loading: boolean = false;
}
