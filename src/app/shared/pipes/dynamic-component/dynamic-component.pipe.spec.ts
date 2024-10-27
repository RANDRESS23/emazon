import { DynamicComponentPipe } from './dynamic-component.pipe';

describe('DynamicComponentPipe', () => {
  it('create an instance', () => {
    const pipe = new DynamicComponentPipe();
    expect(pipe).toBeTruthy();
  });
});
