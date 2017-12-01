import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';


import * as Joi from 'joi';
import {DishService} from '../../../services/dish/dish.service';
import {Dish} from '../../../interfaces/dish';

@Route({
    path: '/api/dish/{id}',
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
        description: 'Get one dish',
        notes: 'Returns one dish for the given id in path parameter',
        tags: ['api', 'dish']
    }
})
export class GetOneDishRoute implements OnGet {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _dishService: DishService) {}

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Dish> {
        return this._dishService.one(request.params.id);
    }
}
