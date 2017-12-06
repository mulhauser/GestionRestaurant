import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {OrderService} from '../shared/order-service/order.service';

@Component({
  selector: 'nwt-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  // private property to store order value
  private _order: any;
  // private property to store flag to know if it's a order
  private _isOrder: boolean;

  /**
   * Component constructor
   */
  constructor(private _orderService: OrderService, private _route: ActivatedRoute) {
    this._order = {};
    this._isOrder = false;
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
   * Returns flag to know if we are on a profile or on HP
   *
   * @returns {boolean}
   */
  get isOrder(): boolean {
    return this._isOrder;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    Observable
      .merge(
        this._route.params
          .filter(params => !!params['id'])
          .flatMap(params => this._orderService.fetchOne(params['id']))
          .do(_ => this._isOrder = true),
        this._route.params
          .filter(params => !params['id'])
          .flatMap(_ => this._orderService.fetch())
          .do(_ => this._isOrder = false)
      )
      .subscribe((orders: any[]) => this._order = orders);
  }


}
