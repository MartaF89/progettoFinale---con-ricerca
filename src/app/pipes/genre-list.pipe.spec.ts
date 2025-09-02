import {
  GenreListPipe,
  TrailerPipe,
  DirectorPipe,
  CastPipe,
} from './custom.pipe';

describe('GenreListPipe', () => {
  it('create an instance', () => {
    const pipe = new GenreListPipe();
    expect(pipe).toBeTruthy();
  });
});
describe('TrailerPipe', () => {
  it('should create an instance', () => {
    expect(new TrailerPipe()).toBeTruthy();
  });
});
describe('DirectorPipe', () => {
  it('should create an instance', () => {
    expect(new DirectorPipe()).toBeTruthy();
  });
});
describe('CastPipe', () => {
  it('should create an instance', () => {
    expect(new CastPipe()).toBeTruthy();
  });
});
