import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DialogPlatComponent} from '../shared/dialog/dialog-plat/dialog-plat.component';
import {PlatService} from '../shared/plat-service/plat.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'nwt-plats',
  templateUrl: './plats.component.html',
  styleUrls: ['./plats.component.css']
})
export class PlatsComponent implements OnInit {

  // private property to store plats value
  private _plats: any[];
  // private property to store dialogStatus value
  private _dialogStatus: string;
  // private property to store dialog reference
  private _platDialog: MatDialogRef<DialogPlatComponent>;
  // private property to store view value
  private _view: string;

  /**
   * Component constructor
   */
  constructor(private _platService: PlatService, private _dialog: MatDialog) {
    this._plats = [];
    this._dialogStatus = 'inactive';
    this._view = 'card';
  }

  /**
   * Returns private property _plats
   *
   * @returns {any[]}
   */
  get plats(): any[] {
    return this._plats;
  }

  /**
   * Returns private property _dialogStatus
   *
   * @returns {string}
   */
  get dialogStatus(): string {
    return this._dialogStatus;
  }

  /**
   * Returns private property _view
   *
   * @returns {string}
   */
  get view(): string {
    return this._view;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._platService
      .fetch()
      .subscribe((plats: any[]) => this._plats = plats);
  }

  /**
   * Function to delete one plat
   *
   * @param plat
   */
  delete(plat: any) {
    this._platService
      .delete(plat.id)
      .flatMap(_ => this._platService.fetch())
      .subscribe((plats: any[]) => this._plats = plats);
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._platDialog = this._dialog.open(DialogPlatComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._platDialog.afterClosed()
      .filter(_ => !!_)
      .flatMap(_ => this._add(_))
      .subscribe(
        (plats: any[]) => this._plats = plats,
        _ => this._dialogStatus = 'inactive',
        () => this._dialogStatus = 'inactive'
      );
  }


  /**
   * Add new plat and fetch all plats to refresh the list
   *
   * @param plat to add
   *
   * @returns {Observable<any[]>}
   *
   * @private
   */
  private _add(plat: any): Observable<any[]|ArrayBuffer> {
    return this._platService
      .create(plat)
      .flatMap(_ => this._platService.fetch());
  }

}
