import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'nwt-add-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  /**
   * Component constructor
   *
   * @param {MatDialogRef<DialogComponent>} _dialogRef
   * @param _data
   */
  constructor(private _dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) private _data: any) {
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
   * Function to close the modal and send person to parent
   *
   * @param person
   */
  onSave(ingredient: any) {
    this._dialogRef.close(ingredient);
  }
}
