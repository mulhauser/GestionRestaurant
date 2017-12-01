import { OnPut, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';


import * as Joi from 'joi';
import {IngredientService} from '../../../services/ingredient/ingredient.service';
import {Ingredient} from '../../../interfaces/ingredient';

@Route({
    path: '/api/ingredient/{id}',
    method: 'PUT',
    config: {
        cors: true,
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: Joi.object().keys({
                name: Joi.string().required(),
                quantity: Joi.number().required()
            })
        },
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
        },
        response: {
            status: {
                200: Joi.object().keys({
                    id: Joi.string().required(),
                    name: Joi.string().required(),
                    quantity: Joi.number().required()
                })
            }
        },
        description: 'Update one ingredient',
        notes: 'Update the ingredient for the given id in path parameter and return it',
        tags: ['api', 'ingredient']
    }
})
export class PutUpdateIngredientRoute implements OnPut {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _ingredientService: IngredientService) {
    }

    /**
     * OnPut implementation
     * @param request
     */
    onPut(request: Request): Observable<Ingredient> {
        return this._ingredientService.update(request.params.id, request.payload);
    }
}
