import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

import 'rxjs/add/observable/of';

@Component({
  selector: 'nwt-card-order',
  templateUrl: './card-order.component.html',
  styleUrls: ['./card-order.component.css']
})
export class CardOrderComponent implements OnInit {
  // private property to store order value
  private _order: any;
  // private property to store delete$ value
  private _delete$: EventEmitter<any>;

  /**
   * Component constructor
   */
  constructor() {
    this._order = {};
    this._delete$ = new EventEmitter();
  }

  /**
   * Returns private property _order
   *
   * @returns {any}
   */
  get order(): any {
    return this._order;
  }

  /**
   * Sets private property _order
   *
   * @param order
   */
  @Input()
  set order(order: any) {
    this._order = order;
  }

  /**
   * Returns private property _delete$
   *
   * @returns {EventEmitter<any>}
   */
  @Output('orderDelete')
  get delete$(): EventEmitter<any> {
    return this._delete$;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to emit event to delete current order
   *
   * @param order
   */
  delete(order: any) {
    this._delete$.emit(order);
  }

}
