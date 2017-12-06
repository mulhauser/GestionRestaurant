import { FormControl } from '@angular/forms';

export class CustomValidators {

  static isNumber(control: FormControl) {
    const regex = /^\d+$/;

    return regex.test(control.value) ? null : {
      isNumber: true
    };
  }
}
