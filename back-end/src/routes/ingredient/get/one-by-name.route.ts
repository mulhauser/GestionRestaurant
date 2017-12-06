import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import {IngredientService} from '../../../services';
import {Ingredient} from '../../../interfaces/ingredient';

@Route({
    path: '/api/ingredient/name/{name}',
    method: 'GET',
    config: {
        validate: {
            params: {
                name: Joi.string().required()
            }
        },
        response: {
            status: {
                200: Joi.object().keys({
                    id: Joi.string().required(),
                    name: Joi.string().required(),
                    quantity: Joi.number().required(),
                    photo: Joi.string().required()
                })
            }
        },
        description: 'Get one ingredient by name',
        notes: 'Returns one ingredient for the given name in path parameter',
        tags: ['api', 'ingredient']
    }
})
export class GetOneByNameIngredientRoute implements OnGet {
    /**
     * Class constructor
     * @param _ingredientService
     */
    constructor(private _ingredientService: IngredientService) {}

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Ingredient> {
        return this._ingredientService.oneByName(request.params.name);
    }
}
