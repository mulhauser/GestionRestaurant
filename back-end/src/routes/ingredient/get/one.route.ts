import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import {IngredientService} from '../../../services';
import {Ingredient} from '../../../interfaces/ingredient';

@Route({
    path: '/api/ingredient/{id}',
    method: 'GET',
    config: {
        cors: true,
        validate: {
            params: {
                id: Joi.string().required()
            }
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
        description: 'Get one ingredient',
        notes: 'Returns one ingredient for the given id in path parameter',
        tags: ['api', 'ingredient']
    }
})
export class GetOneIngredientRoute implements OnGet {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _ingredientService: IngredientService) {}

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Ingredient> {
        return this._ingredientService.one(request.params.id);
    }
}
