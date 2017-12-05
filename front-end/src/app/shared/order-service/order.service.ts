import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/filter';

@Injectable()
export class OrderService {
  // private property to store all backend URLs
  private _backendURL: any;

  constructor(private _http: HttpClient) {
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
  }

  /**
   * Function to return list of ingredients
   *
   * @returns {Observable<any[]>}
   */
  fetch(): Observable<any[]|ArrayBuffer> {
    return this._http.get(this._backendURL.allOrders, this._options())
      .filter(_ => !!_)
      .defaultIfEmpty([]);
  }

  /**
   * Function to return one ingredient for current id
   *
   * @param id
   *
   * @returns {Observable<any>}
   */
  fetchOne(id: string): Observable<any> {
    return this._http.get(this._backendURL.oneOrder.replace(':id', id), this._options());
  }

  /**
   * Function to create a new ingredient
   *
   * @param ingredient
   *
   * @returns {Observable<any>}
   */
  create(order): Observable<any> {
    return this._http.post(this._backendURL.allOrders, order, this._options());
  }

  /**
   * Function to update one ingredient
   *
   * @param ingredient
   *
   * @returns {Observable<any>}
   */
  update(order: any): Observable<any> {
    const id = order.id;
    delete order.id;
    // ord = {'name': order.name, 'isServed': order.isServed, 'isPayed': order.isServed, 'dishes': order.dishes, 'orderDate' };
    return this._http.put(this._backendURL.oneOrder.replace(':id', id), order, this._options());
  }

  /**
   * Function to delete one ingredient for current id
   *
   * @param id
   *
   * @returns {Observable<any[]>}
   */
  delete(id: string): Observable<any[]> {
    return this._http.delete(this._backendURL.oneOrder.replace(':id', id), this._options())
      .filter(_ => !!_)
      .defaultIfEmpty([]);
  }

  /**
   * Function to return request options
   *
   * @returns {any}
   */
  private _options(headerList: Object = {}): any {
    const headers = new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList));
    return { headers };
  }
}
