import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeToDate',
})
export class TimeToDatePipe implements PipeTransform {
  transform(timeString: string): Date {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return new Date(0, 0, 0, hours, minutes, seconds);
  }
}
