import { OnPut, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';


import * as Joi from 'joi';
import {DishService} from '../../../services/dish/dish.service';
import {Dish} from '../../../interfaces/dish';

@Route({
    path: '/api/dish/{id}',
    method: 'PUT',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: Joi.object().keys({
                name: Joi.string().required(),
                price: Joi.number().required(),
                ingredients: Joi.array().items(
                    Joi.object().keys({
                        ref: Joi.string().required(),
                        name: Joi.string().required(),
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
                200: Joi.object().keys({
                    id: Joi.string().required(),
                    name: Joi.string().required(),
                    price: Joi.number().required(),
                    ingredients: Joi.array().items(
                        Joi.object().keys({
                            ref: Joi.string().required(),
                            name: Joi.string().required(),
                            quantityUse: Joi.number().required()
                        })
                    )
                })
            }
        },
        description: 'Update one dish',
        notes: 'Update the dish for the given id in path parameter and return it',
        tags: ['api', 'dish']
    }
})
export class PutUpdateDishRoute implements OnPut {
    /**
     * Class constructor
     * @param _dishService
     */
    constructor(private _dishService: DishService) {
    }

    /**
     * OnPut implementation
     * @param request
     */
    onPut(request: Request): Observable<Dish> {
        return this._dishService.update(request.params.id, request.payload);
    }
}
