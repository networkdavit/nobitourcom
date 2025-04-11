import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseJson'
})
export class ParseJsonPipe implements PipeTransform {
  transform(value: string): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return [];
    }
  }
}
