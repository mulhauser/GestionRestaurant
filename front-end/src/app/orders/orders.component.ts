import { Component, OnInit } from '@angular/core';

import {MatDialog, MatDialogRef} from '@angular/material';
import {DialogOrderComponent} from '../shared/dialog/dialog-order/dialog-order.component';
import {OrderService} from '../shared/order-service/order.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'nwt-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  // private property to store ingredients value
  private _orders: any[];
  // private property to store dialogStatus value
  private _dialogStatus: string;
  // private property to store dialog reference
  private _orderDialog: MatDialogRef<DialogOrderComponent>;
  // private property to store view value
  private _view: string;

  /**
   * Component constructor
   */
  constructor(private _orderService: OrderService, private _dialog: MatDialog) {
    this._orders = [];
    this._dialogStatus = 'inactive';
    this._view = 'card';
  }

  /**
   * Returns private property _people
   *
   * @returns {any[]}
   */
  get orders(): any[] {
    return this._orders;
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
    this._orderService
      .fetch()
      .subscribe((orders: any[]) => this._orders = orders);
  }

  /**
   * Function to delete one ingredient
   *
   * @param ingredient
   */
  delete(order: any) {
    this._orderService
      .delete(order.id)
      .subscribe((orders: any[]) => this._orders = orders);
    /*this._ingredientService
      .fetch()
      .subscribe((ingredients: any[]) => this._ingredients = ingredients);*/
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._orderDialog = this._dialog.open(DialogOrderComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._orderDialog.afterClosed()
      .filter(_ => !!_)
      .flatMap(_ => this._add(_))
      .subscribe(
        (orders: any[]) => this._orders = orders,
        _ => this._dialogStatus = 'inactive',
        () => this._dialogStatus = 'inactive'
      );
  }

  /**
   * Add new ingredient and fetch all ingredients to refresh the list
   *
   * @param ingredient to add
   *
   * @returns {Observable<any[]>}
   *
   * @private
   */
  private _add(order: any): Observable<any[]> {
    return this._orderService
      .create(order)
      .flatMap(_ => this._orderService.fetch());
  }
}
