import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

import 'rxjs/add/observable/of';

@Component({
  selector: 'nwt-card-order',
  templateUrl: './card-order.component.html',
  styleUrls: ['./card-order.component.css']
})
export class CardOrderComponent implements OnInit {
  // private property to store ingredient value
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
   * Returns private property _person
   *
   * @returns {any}
   */
  get order(): any {
    return this._order;
  }

  /**
   * Sets private property _person
   *
   * @param person
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
   * Function to emit event to delete current plat
   *
   * @param plat
   */
  delete(order: any) {
    this._delete$.emit(order);
  }

}
