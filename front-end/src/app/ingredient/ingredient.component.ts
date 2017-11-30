import { Component, OnInit } from '@angular/core';
import {DialogComponent} from "../shared/dialog/dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'nwt-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  // private property to store people value
  // private _room: any[];
  // private property to store dialogStatus value
  private _dialogStatus: string;
  // private property to store dialog reference
  private _roomDialog: MatDialogRef<DialogComponent>;

  constructor(private _dialog: MatDialog) {
    this._dialogStatus = 'inactive';
  }

  get dialogStatus(): string {
    return this._dialogStatus;
  }

  ngOnInit() {
    // this._getAll().subscribe((room: any[]) => this._room = room);
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._roomDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });

    // // subscribe to afterClosed observable to set dialog status and do process
    // this._roomDialog.afterClosed()
    //   .filter(_ => !!_)
    //   .flatMap(_ => this._add(_))
    //   .subscribe(
    //     (people: any[]) => this._room = people,
    //     _ => this._dialogStatus = 'inactive',
    //     () => this._dialogStatus = 'inactive'
    //   );
  }

  // private _getAll(): Observable<any[]> {
  //   return this._http.get(this._backendURL.allPeople)
  //     .filter(_ => !!_)
  //     .defaultIfEmpty([]);
  // }

}
