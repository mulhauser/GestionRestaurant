import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

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
   */
  constructor(private _dialogRef: MatDialogRef<DialogComponent>) { }

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
  onSave(room: any) {
    this._dialogRef.close(room);
  }

}
