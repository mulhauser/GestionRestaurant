import { Injectable } from '@hapiness/core';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';
import { Biim } from '@hapiness/biim';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { flatMap, map, catchError } from 'rxjs/operators';
import {Ingredient} from '../../interfaces/ingredient';
import {IngredientDocumentService} from '../ingredient-document';

@Injectable()
export class IngredientService {
    /**
     * Class constructor
     */
    constructor(private _ingredientDocumentService: IngredientDocumentService) {}

    /**
     * Returns all existing people in the list
     *
     * @returns {Observable<People[]>}
     */
    listAll(): Observable<Ingredient[] | void> {
        return this._ingredientDocumentService.find();
    }

    /**
     * Returns one people of the list matching id in parameter
     *
     * @param {string} id of the people
     *
     * @returns {Observable<People>}
     */
    one(id: string): Observable<Ingredient> {
        return this._ingredientDocumentService.findById(id)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`Ingredient with id '${id}' not found`))
                )
            );
    }

    oneByName(name: string): Observable<Ingredient> {
        return this._ingredientDocumentService.findByName(name)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`Ingredient with name '${name}' not found`))
                )
            );
    }

    /**
     * Check if person already exists and add it in people list
     *
     * @param person to create
     *
     * @returns {Observable<HapinessHTTPHandlerResponse>}
     */
    create(ingredient: Ingredient): Observable<HapinessHTTPHandlerResponse> {
        return this._ingredientDocumentService.create(ingredient)
            .pipe(
                catchError(e => _throw(Biim.conflict(e.message))),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }

    /**
     * Update a person in people list
     *
     * @param {string} id of the person to update
     * @param person data to update
     *
     * @returns {Observable<People>}
     */
    update(id: string, ingredient: Ingredient): Observable<Ingredient> {
        return this._ingredientDocumentService.findByIdAndUpdate(id, ingredient)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`Ingredient with id '${id}' not found`))
                )
            );
    }

    /**
     * Deletes on person in people list
     *
     * @param {string} id of the person to delete
     *
     * @returns {Observable<any>}
     */
    delete(id: string): Observable<void> {
        return this._ingredientDocumentService.findByIdAndRemove(id)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        _throw(Biim.notFound(`Ingredient with id '${id}' not found`))
                )
            );
    }
}
