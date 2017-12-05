import { Injectable } from '@hapiness/core';
import { MongoClientService } from '@hapiness/mongo';
import { MongooseDocument } from 'mongoose';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { flatMap, filter, map } from 'rxjs/operators';
import { mergeStatic } from 'rxjs/operators/merge';

import { Order } from '../../interfaces';
import { Config } from '@hapiness/config';
import { OrderModel } from '../../models/order/order.model';

@Injectable()
export class OrderDocumentService {
    // private property to store document instance
    private _document: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        this._document = this._mongoClientService.getModel({
            adapter: 'mongoose',
            options: Config.get('mongodb')
        }, OrderModel);
    }

    /**
     * Call mongoose method, call toJSON on each result and returns People[] or undefined
     *
     * @return {Observable<Order[] | void>}
     */
    find(): Observable<Order[] | void> {
        return fromPromise(this._document.find({}))
            .pipe(
                flatMap((docs: MongooseDocument[]) =>
                    of(of(docs))
                        .pipe(
                            flatMap(_ =>
                                mergeStatic(
                                    _.pipe(
                                        filter(__ => !!__ && __.length > 0),
                                        map(__ => __.map(doc => doc.toJSON())),
                                    ),
                                    _.pipe(
                                        filter(__ => !__ || __.length === 0),
                                        map(__ => undefined)
                                    )
                                )
                            )
                        )
                )
            );
    }

    /**
     * Returns one people of the list matching id in parameter
     *
     * @param {string} id of the people in the db
     *
     * @return {Observable<Order | void>}
     */
    findById(id: string): Observable<Order | void> {
        return fromPromise(this._document.findById(id))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as Order) :
                        of(undefined)
                )
            )
    }

    /**
     * Check if order already exists and add it in order list
     *
     * @param {Order} order to create
     *
     * @return {Observable<Order>}
     */
    create(order: Order): Observable<Order> {
        return fromPromise(this._document.findOne({
            name: { $regex: new RegExp(order.id, 'i') },
        }))
            .pipe(
                flatMap(_ => !!_ ?
                    _throw(
                        new Error(`Order with name '${order.id}' already exists`)
                    ) :
                    fromPromise(this._document.create(order))
                ),
                map((doc: MongooseDocument) => doc.toJSON() as Order)
            );
    }

    /**
     * Update a person in people list
     *
     * @param {string} id
     * @param {Order} order
     *
     * @return {Observable<Order>}
     */
    findByIdAndUpdate(id: string, order: Order): Observable<Order> {
        return fromPromise(this._document.findByIdAndUpdate(id, order, { new: true }))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as Order) :
                        of(undefined)
                )
            )
    }

    /**
     * Delete a person in people list
     *
     * @param {string} id
     *
     * @return {Observable<Order>}
     */
    findByIdAndRemove(id: string): Observable<Order> {
        return fromPromise(this._document.findByIdAndRemove(id))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as Order) :
                        of(undefined)
                )
            )
    }
}
