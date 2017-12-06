import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'nwt-add-dialog-ingredient',
  templateUrl: './dialog-ingredient.component.html',
  styleUrls: ['./dialog-ingredient.component.css']
})
export class DialogIngredientComponent implements OnInit {

  /**
   * Component constructor
   *
   * @param {MatDialogRef<DialogIngredientComponent>} _dialogRef
   * @param _data
   */
  constructor(private _dialogRef: MatDialogRef<DialogIngredientComponent>, @Inject(MAT_DIALOG_DATA) private _data: any) {
  }

  /**
   * Returns data passed in dialog open
   *
   * @returns {any}
   */
  get data(): any {
    return this._data;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to cancel the process and close the modal
   */
  onCancel() {
    this._dialogRef.close();
  }

  /**
   * Function to close the modal and send ingredient to parent
   *
   * @param ingredient
   */
  onSave(ingredient: any) {
    this._dialogRef.close(ingredient);
  }
}
