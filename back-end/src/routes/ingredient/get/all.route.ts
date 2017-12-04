import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';


import * as Joi from 'joi';
import {IngredientService} from '../../../services/ingredient/ingredient.service';
import {Ingredient} from '../../../interfaces/ingredient';

@Route({
    path: '/api/ingredient',
    method: 'GET',
    config: {
        response: {
            status: {
                200: Joi.array().items(
                    Joi.object().keys({
                        id: Joi.string().required(),
                        name: Joi.string().required(),
                        quantity: Joi.number().required(),
                        photo: Joi.string().required()
                    })
                ).unique().min(1)
            }
        },
        description: 'Get all ingredient',
        notes: 'Returns an array of ingredient or 204',
        tags: ['api', 'ingredient']
    }
})
export class GetAllIngredientRoute implements OnGet {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _ingredientService: IngredientService) {
    }

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Ingredient[] | void> {
        return this._ingredientService.listAll();
    }
}
