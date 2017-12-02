import { FormControl } from '@angular/forms';

export class CustomValidators {

  /**
   * Function to control quantity with custom validator
   *
   * @param control
   *
   * @returns {{quantityValue: boolean}}
   */
  static quantityValue(control: FormControl) {
    // email regex
    const regex = /^\d+$/;

    // returns control
    return regex.test(control.value) ? null : {
      quantity: true
    };
  }
}
