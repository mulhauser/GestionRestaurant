import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { StockService } from '../shared/stock-service/stock.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'nwt-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  // private property to store stock value
  private _stock: any[];
  // private property to store dialogStatus value
  private _dialogStatus: string;
  // private property to store dialog reference
  private _stockDialog: MatDialogRef<DialogComponent>;

  /**
   * Component constructor
   */
  constructor(private _router: Router, private _stockService: StockService, private _dialog: MatDialog) {
    this._stock = [];
    this._dialogStatus = 'inactive';
  }

  /**
   * Returns private property _stock
   *
   * @returns {any[]}
   */
  get stock(): any[] {
    return this._stock;
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
   * OnInit implementation
   */
  ngOnInit() {
    this._stockService
      .fetch()
      .subscribe((stock: any[]) => this._stock = stock);
  }

  /**
   * Function to delete one ingredient
   *
   * @param ingredient
   */
  delete(ingredient: any) {
    this._stockService
      .delete(ingredient.id)
      .subscribe((stock: any[]) => this._stock = stock);
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._stockDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._stockDialog.afterClosed()
      .filter(_ => !!_)
      .flatMap(_ => this._add(_))
      .subscribe(
        (stock: any[]) => this._stock = stock,
        _ => this._dialogStatus = 'inactive',
        () => this._dialogStatus = 'inactive'
      );
  }

  /**
   * Function to navigate to current ingredient
   *
   * @param ingredient
   */
  navigate(ingredient) {
    this._router.navigate(['/ingredient', ingredient.id]);
  }

  /**
   * Add new ingredient and fetch all stock to refresh the list
   *
   * @param ingredient to add
   *
   * @returns {Observable<any[]>}
   *
   * @private
   */
  private _add(ingredient: any): Observable<any[]|ArrayBuffer> {
    return this._stockService
      .create(ingredient)
      .flatMap(_ => this._stockService.fetch());
  }

}
