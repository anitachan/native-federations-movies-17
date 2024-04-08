import { Component, inject, OnInit } from '@angular/core';
import { GetMovieUsecaseService } from '../../../domain/movie/usecases/get-movie/get-movie.usecase.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  private getMovieUsecaseService = inject(GetMovieUsecaseService);
  ngOnInit(): void {
    this.getMovieUsecaseService.invoke(823464).subscribe((data) => console.log(data));
  }
}
