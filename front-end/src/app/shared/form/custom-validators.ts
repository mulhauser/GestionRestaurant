import { FormControl } from '@angular/forms';

export class CustomValidators {

  /**
   * Function to control email with custom validator
   *
   * @param control
   *
   * @returns {{googleEmail: boolean}}
   */
  static googleEmail(control: FormControl) {
    // email regex
    const regex = /^\w+\.\w+@gmail\.com$/;

    // returns control
    return regex.test(control.value) ? null : {
      googleEmail: true
    };
  }

  static isNumber(control: FormControl) {
    const regex = /^[0-9]*$/;

    return regex.test(control.value) ? null : {
      isNumber: true
    };
  }
}
