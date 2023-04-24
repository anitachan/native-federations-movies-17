import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster',
})
export class PosterPipe implements PipeTransform {
  transform(poster: string, url: string, resolution: string): string {
    if (poster) {
      return `${url}${resolution}${poster}`;
    } else {
      return './assets/no-image.jpg';
    }
  }
}
