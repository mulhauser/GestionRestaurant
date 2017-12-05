import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'nwt-add-dialog-order',
  templateUrl: './dialog-order.component.html',
  styleUrls: ['./dialog-order.component.css']
})
export class DialogOrderComponent implements OnInit {

  /**
   * Component constructor
   *
   * @param {MatDialogRef<DialogComponent>} _dialogRef
   * @param _data
   */
  constructor(private _dialogRef: MatDialogRef<DialogOrderComponent>, @Inject(MAT_DIALOG_DATA) private _data: any) {
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
  onSave(order: any) {
    this._dialogRef.close(order);
  }
}
