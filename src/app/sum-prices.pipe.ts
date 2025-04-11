import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumPrices'
})
export class SumPricesPipe implements PipeTransform {

  transform(prices: string[]): number {
    const sum = prices
      .map(price => parseFloat(price))
      .reduce((acc, curr) => acc + curr, 0);
    
    // Remove all digits after the decimal point
    return Math.floor(sum);
  }
}
