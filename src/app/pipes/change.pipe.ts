import { Pipe, PipeTransform } from '@angular/core';
import { ChangedField } from '../authentication/components/ticketing/ticketing.component';

@Pipe({
  name: 'change',
  standalone: true,
})
export class ChangePipe implements PipeTransform {
  transform(
    column: string,
    keys: string[],
    changedFields: ChangedField[],
    ticket: string
  ): unknown {
    const changes = changedFields.find((x) => (x.ticketId = ticket));
    return changes ? changes.key.includes(column) : false;
  }
}
