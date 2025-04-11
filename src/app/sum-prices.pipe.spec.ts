import { SumPricesPipe } from './sum-prices.pipe';

describe('SumPricesPipe', () => {
  it('create an instance', () => {
    const pipe = new SumPricesPipe();
    expect(pipe).toBeTruthy();
  });
});
