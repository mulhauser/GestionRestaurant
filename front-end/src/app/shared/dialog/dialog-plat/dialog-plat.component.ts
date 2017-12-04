import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'nwt-add-dialog-plat',
  templateUrl: './dialog-plat.component.html',
  styleUrls: ['./dialog-plat.component.css']
})
export class DialogPlatComponent implements OnInit {

  /**
   * Component constructor
   *
   * @param {MatDialogRef<DialogComponent>} _dialogRef
   * @param _data
   */
  constructor(private _dialogRef: MatDialogRef<DialogPlatComponent>, @Inject(MAT_DIALOG_DATA) private _data: any) {
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
  onSave(plat: any) {
    this._dialogRef.close(plat);
  }
}
