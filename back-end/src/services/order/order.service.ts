import { Injectable } from '@hapiness/core';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';
import { Biim } from '@hapiness/biim';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { flatMap, map, catchError } from 'rxjs/operators';
import {Order} from '../../interfaces/order';
import {OrderDocumentService} from '../order-document';

@Injectable()
export class OrderService {
    /**
     * Class constructor
     */
    constructor(private _orderDocumentService: OrderDocumentService) {}

    /**
     * Returns all existing orders in the list
     *
     * @returns {Observable<Orders[]>}
     */
    listAll(): Observable<Order[] | void> {
        return this._orderDocumentService.find();
    }

    /**
     * Returns one orders of the list matching id in parameter
     *
     * @param {string} id of the orders
     *
     * @returns {Observable<Orders>}
     */
    one(id: string): Observable<Order> {
        return this._orderDocumentService.findById(id)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`Order with id '${id}' not found`))
                )
            );
    }

    /**
     * Check if order already exists and add it in orders list
     *
     * @param order to create
     *
     * @returns {Observable<HapinessHTTPHandlerResponse>}
     */
    create(order: Order): Observable<HapinessHTTPHandlerResponse> {
        return this._orderDocumentService.create(order)
            .pipe(
                catchError(e => _throw(Biim.conflict(e.message))),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }

    /**
     * Update a order in orders list
     *
     * @param {string} id of the order to update
     * @param order data to update
     *
     * @returns {Observable<Orders>}
     */
    update(id: string, order: Order): Observable<Order> {
        return this._orderDocumentService.findByIdAndUpdate(id, order)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`Order with id '${id}' not found`))
                )
            );
    }

    /**
     * Deletes on order in orders list
     *
     * @param {string} id of the order to delete
     *
     * @returns {Observable<any>}
     */
    delete(id: string): Observable<void> {
        return this._orderDocumentService.findByIdAndRemove(id)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        _throw(Biim.notFound(`Order with id '${id}' not found`))
                )
            );
    }
}
