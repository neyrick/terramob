import { SignedPipe } from './signed.pipe';

describe('SignedPipe', () => {
  it('create an instance', () => {
    const pipe = new SignedPipe();
    expect(pipe).toBeTruthy();
  });
});
