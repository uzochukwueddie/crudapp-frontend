import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  // pipe to format date
  transform(value: any, args?: any): any {
    return super.transform(value, 'MM/dd/yyyy');
  }

}
