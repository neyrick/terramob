import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'signed'
})
export class SignedPipe implements PipeTransform {

  transform(value: any, doPerform: boolean = true): any {
    if (!doPerform) {
      return value;
    }
    if (isNaN(value)) {
        return '-';
    }
    else if (value > 0) {
        return '+' + value;
    }
    else return value;
  }

}
