import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import {DishService} from '../../../services/dish/dish.service';
import {Dish} from '../../../interfaces/dish';

@Route({
    path: '/api/dish/name/{name}',
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
        description: 'Get one ingredient by name',
        notes: 'Returns one ingredient for the given name in path parameter',
        tags: ['api', 'ingredient']
    }
})
export class GetOneByNameDishRoute implements OnGet {
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
        return this._dishService.oneByName(request.params.name);
    }
}
