import { OnDelete, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import {IngredientService} from '../../../services/ingredient/ingredient.service';

@Route({
    path: '/api/ingredient/{id}',
    method: 'DELETE',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        description: 'Delete ingredient',
        notes: 'Delete one ingredient for the given id in path parameter',
        tags: ['api', 'ingredient']
    }
})
export class DeleteOneIngredientRoute implements OnDelete {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _ingredientService: IngredientService) {
    }

    /**
     * OnDelete implementation
     * @param request
     */
    onDelete(request: Request): Observable<void> {
        return this._ingredientService.delete(request.params.id);
    }
}
