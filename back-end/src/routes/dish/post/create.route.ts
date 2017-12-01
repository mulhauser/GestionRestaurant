import { OnPost, Route, Request } from '@hapiness/core';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import {DishService} from '../../../services/dish/dish.service';
import {Dish} from '../../../interfaces/dish';

@Route({
    path: '/api/dish',
    method: 'POST',
    config: {
        cors: true,
        validate: {
            payload: Joi.object().keys({
                name: Joi.string().required(),
                price: Joi.number().required(),
                ingredients: Joi.array().items(
                    Joi.object().keys({
                        ref: Joi.string().required(),
                        quantityUse: Joi.number().required()
                    })
                )
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
                    price: Joi.number().required(),
                    ingredients: Joi.array().items(
                        Joi.object().keys({
                            ref: Joi.string().required(),
                            quantityUse: Joi.number()
                        })
                    )
                })
            }
        },
        description: 'Create one dish',
        notes: 'Create a new dish and return it',
        tags: ['api', 'dish']
    }
})
export class PostCreateDishRoute implements OnPost {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _dishService: DishService) {
    }

    /**
     * OnPost implementation
     * @param request
     */
    onPost(request: Request): Observable<HapinessHTTPHandlerResponse> {
        return this._dishService.create(request.payload as Dish);
    }
}
