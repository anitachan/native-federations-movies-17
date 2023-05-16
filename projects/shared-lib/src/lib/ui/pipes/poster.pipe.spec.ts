import { PosterPipe } from './poster.pipe';

describe('PosterPipe', () => {
  const pipe = new PosterPipe();
  const url = 'https://image.tmdb.org/t/p/';

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms "abc" to correct url', () => {
    expect(pipe.transform('/abc', url, 'w500')).toBe(`${url}w500/abc`);
  });

  it('transforms "abc" to default image', () => {
    expect(pipe.transform('', '', '')).toBe('./assets/images/no-image.jpg');
  });
});
