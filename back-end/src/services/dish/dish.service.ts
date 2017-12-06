import { Injectable } from '@hapiness/core';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';
import { Biim } from '@hapiness/biim';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { flatMap, map, catchError } from 'rxjs/operators';
import {Dish} from '../../interfaces/dish';
import {DishDocumentService} from '../dish-document/dish-document.service';

@Injectable()
export class DishService {
    /**
     * Class constructor
     */
    constructor(private _dishDocumentService: DishDocumentService) {}

    /**
     * Returns all existing dishes in the list
     *
     * @returns {Observable<Dishes[]>}
     */
    listAll(): Observable<Dish[] | void> {
        return this._dishDocumentService.find();
    }

    /**
     * Returns one dishes of the list matching id in parameter
     *
     * @param {string} id of the dishes
     *
     * @returns {Observable<Dishes>}
     */
    one(id: string): Observable<Dish> {
        return this._dishDocumentService.findById(id)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`Dish with id '${id}' not found`))
                )
            );
    }

    oneByName(name: string): Observable<Dish> {
        return this._dishDocumentService.findByName(name)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`Dish with name '${name}' not found`))
                )
            );
    }

    /**
     * Check if person already exists and add it in dishes list
     *
     * @param dishes to create
     *
     * @returns {Observable<HapinessHTTPHandlerResponse>}
     */
    create(dish: Dish): Observable<HapinessHTTPHandlerResponse> {
        return this._dishDocumentService.create(dish)
            .pipe(
                catchError(e => _throw(Biim.conflict(e.message))),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }

    /**
     * Update a person in dishes list
     *
     * @param {string} id of the person to update
     * @param dishes data to update
     *
     * @returns {Observable<Dishes>}
     */
    update(id: string, dish: Dish): Observable<Dish> {
        return this._dishDocumentService.findByIdAndUpdate(id, dish)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`Dish with id '${id}' not found`))
                )
            );
    }

    /**
     * Deletes on person in dishes list
     *
     * @param {string} id of the person to delete
     *
     * @returns {Observable<any>}
     */
    delete(id: string): Observable<void> {
        return this._dishDocumentService.findByIdAndRemove(id)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        _throw(Biim.notFound(`Dish with id '${id}' not found`))
                )
            );
    }


    updateByIngredient(id: string, name: string): Observable<Dish> {
        return this._dishDocumentService.updateByIngredient(id, name);
    }



}
