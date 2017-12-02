import { Injectable } from '@hapiness/core';
import { MongoClientService } from '@hapiness/mongo';
import { MongooseDocument } from 'mongoose';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import {flatMap, filter, map, catchError} from 'rxjs/operators';
import { mergeStatic } from 'rxjs/operators/merge';

import { Config } from '@hapiness/config';
import {Dish} from '../../interfaces/dish';
import {DishModel} from '../../models/dish/dish.model';
import {IngredientDocumentService} from '../ingredient-document/ingredient-document.service';
import {Biim} from '@hapiness/biim';

@Injectable()
export class DishDocumentService {
    // private property to store document instance
    private _document: any;
    private _documentIngredient: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        this._document = this._mongoClientService.getModel({
            adapter: 'mongoose',
            options: Config.get('mongodb')
        }, DishModel);
        this._documentIngredient = new IngredientDocumentService(_mongoClientService);
    }

    /**
     * Call mongoose method, call toJSON on each result and returns People[] or undefined
     *
     * @return {Observable<Room[] | void>}
     */
    find(): Observable<Dish[] | void> {
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
     * @return {Observable<Room | void>}
     */
    findById(id: string): Observable<Dish | void> {
        return fromPromise(this._document.findById(id))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as Dish) :
                        of(undefined)
                )
            )
    }

    /**
     * Check if person already exists and add it in people list
     *
     * @param {Room} room to create
     *
     * @return {Observable<Room>}
     */
    create(dish: Dish): Observable<Dish> {
        let obs;
        for (let ingredient of dish.ingredients) {
            obs = fromPromise(this._documentIngredient.findById(ingredient.ref));
        }
        return obs.pipe(
            catchError(e => _throw(Biim.preconditionFailed(e.message))),
            flatMap(_ =>
                !!_ ?
                    fromPromise(this._document.findOne({
                        name: { $regex: new RegExp(dish.name, 'i') },
                    }))
                        .pipe(
                            flatMap(_ =>
                                !!_ ?
                                _throw(
                                    new Error(`Dish with name '${dish.name}' already exists`)
                                ) :
                                fromPromise(this._document.create(dish))
                            ),
                            map((doc: MongooseDocument) => doc.toJSON() as Dish)
                        ) :
                    _throw(Biim)
            )
        );
        // return fromPromise(this._documentIngredient.findById())
        /*return fromPromise(this._document.findOne({
            name: { $regex: new RegExp(dish.name, 'i') },
        }))
            .pipe(
                flatMap(_ => !!_ ?
                    _throw(
                        new Error(`Dish with name '${dish.name}' already exists`)
                    ) :
                    fromPromise(this._document.create(dish))
                ),
                map((doc: MongooseDocument) => doc.toJSON() as Dish)
            );*/
    }

    /**
     * Update a person in people list
     *
     * @param {string} id
     * @param {Room} room
     *
     * @return {Observable<Room>}
     */
    findByIdAndUpdate(id: string, dish: Dish): Observable<Dish> {
        return fromPromise(this._document.findByIdAndUpdate(id, dish, { new: true }))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as Dish) :
                        of(undefined)
                )
            )
    }

    /**
     * Delete a person in people list
     *
     * @param {string} id
     *
     * @return {Observable<Room>}
     */
    findByIdAndRemove(id: string): Observable<Dish> {
        return fromPromise(this._document.findByIdAndRemove(id))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as Dish) :
                        of(undefined)
                )
            )
    }
}
