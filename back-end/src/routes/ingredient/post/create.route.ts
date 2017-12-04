import { OnPost, Route, Request } from '@hapiness/core';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import {IngredientService} from '../../../services/ingredient/ingredient.service';
import {Ingredient} from '../../../interfaces/ingredient';

@Route({
    path: '/api/ingredient',
    method: 'POST',
    config: {
        validate: {
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
                201: Joi.object().keys({
                    id: Joi.string().required(),
                    name: Joi.string().required(),
                    quantity: Joi.number().required(),
                    photo: Joi.string().required()
                })
            }
        },
        description: 'Create one ingredient',
        notes: 'Create a new ingredient and return it',
        tags: ['api', 'ingredient']
    }
})
export class PostCreateIngredientRoute implements OnPost {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _ingredientService: IngredientService) {
    }

    /**
     * OnPost implementation
     * @param request
     */
    onPost(request: Request): Observable<HapinessHTTPHandlerResponse> {
        return this._ingredientService.create(request.payload as Ingredient);
    }
}
