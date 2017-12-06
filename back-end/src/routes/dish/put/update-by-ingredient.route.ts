import { OnPut, Route, Request } from '@hapiness/core';


import * as Joi from 'joi';
import {DishService} from '../../../services/dish/dish.service';
import {Dish} from '../../../interfaces/dish';
import {Observable} from 'rxjs/Observable';

@Route({
    path: '/api/dish/ingredient/{id}',
    method: 'PUT',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: Joi.object().keys({
                name: Joi.string().required(),
                quantity: Joi.number().required(),
            })
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
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
        },
        description: 'Update one dish',
        notes: 'Update the dish for the given id in path parameter and return it',
        tags: ['api', 'dish']
    }
})
export class PutUpdateDishByIngredientRoute implements OnPut {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _dishService: DishService) {
    }

    /**
     * OnPut implementation
     * @param request
     */
    onPut(request: Request): Observable<Dish> {
        return this._dishService.updateByIngredient(request.params.id, request.payload);
    }
}
