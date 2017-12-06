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
     * Returns all existing ingredients in the list
     *
     * @returns {Observable<Ingredient[]>}
     */
    listAll(): Observable<Ingredient[] | void> {
        return this._ingredientDocumentService.find();
    }

    /**
     * Returns one ingredients of the list matching id in parameter
     *
     * @param {string} id of the ingredients
     *
     * @returns {Observable<Ingredient>}
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
     * Check if ingredient already exists and add it in ingredients list
     *
     * @param ingredient to create
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
     * Update a ingredient in ingredients list
     *
     * @param {string} id of the ingredient to update
     * @param ingredient data to update
     *
     * @returns {Observable<Ingredient>}
     */
    update(id: string, ingredient: Ingredient): Observable<Ingredient> {
        return this._ingredientDocumentService.findByIdAndUpdate(id, ingredient)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`Ingredient with id '${id}' not found`))
                ),
            );
    }

    /**
     * Deletes on ingredient in ingredients list
     *
     * @param {string} id of the ingredient to delete
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
