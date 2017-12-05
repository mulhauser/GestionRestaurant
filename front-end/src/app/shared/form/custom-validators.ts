import { FormControl } from '@angular/forms';

export class CustomValidators {

  /**
   * Function to control email with custom validator
   *
   * @param control
   *
   * @returns {{googleEmail: boolean}}
   */


  static isNumber(control: FormControl) {
    const regex = /^\d+$/;

    return regex.test(control.value) ? null : {
      isNumber: true
    };
  }
}
