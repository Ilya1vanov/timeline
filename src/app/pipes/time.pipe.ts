import { Pipe, PipeTransform } from '@angular/core';
import { TimeFormatModel } from './time-format.model';

@Pipe({
  name: 'appTime',
  pure: true,
})
export class TimePipe implements PipeTransform {
  transform(value: number): string {
    return new TimeFormatModel(value).getFormat();
  }
}
