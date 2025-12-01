import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'poster', standalone: true })
export class PosterPipe implements PipeTransform {
  transform(poster: string, url: string, resolution: string): string {
    if (poster) {
      return `${url}${resolution}${poster}`;
    } else {
      return './assets/images/no-image.jpg';
    }
  }
}
