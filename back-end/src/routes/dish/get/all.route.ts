import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import {DishService} from '../../../services/dish/dish.service';
import {Dish} from '../../../interfaces/dish';

@Route({
    path: '/api/dish',
    method: 'GET',
    config: {
        cors: true,
        response: {
            status: {
                200: Joi.array().items(
                    Joi.object().keys({
                        id: Joi.string().required(),
                        name: Joi.string().required(),
                        price: Joi.number().required(),
                        ingredients: Joi.array().items(
                            Joi.object().keys({
                                ref: Joi.string().required(),
                                name: Joi.string().required(),
                                quantityUse: Joi.number()
                            })
                        )
                    })
                ).unique().min(1)
            }
        },
        description: 'Get all dish',
        notes: 'Returns an array of dish or 204',
        tags: ['api', 'dish']
    }
})
export class GetAllDishRoute implements OnGet {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _dishService: DishService) {
    }

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Dish[] | void> {
        return this._dishService.listAll();
    }
}
