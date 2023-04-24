import { PosterPipe } from './poster.pipe';

describe('PosterPipe', () => {
  const pipe = new PosterPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms "abc" to correct url', () => {
    expect(pipe.transform('/abc', 'w500')).toBe('https://image.tmdb.org/t/p/w500/abc');
  });

  it('transforms "abc" to default image', () => {
    expect(pipe.transform('', '')).toBe('./assets/no-image.jpg');
  });
});
