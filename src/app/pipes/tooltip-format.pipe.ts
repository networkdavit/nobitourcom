import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tooltipFormat'
})
export class TooltipFormatPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    let list: string = ''

    value.forEach(line => {
      list += line + '\n';
    })

    return list;
  }

}
