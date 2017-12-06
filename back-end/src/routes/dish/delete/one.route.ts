import { OnDelete, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import {DishService} from '../../../services/dish/dish.service';

@Route({
    path: '/api/dish/{id}',
    method: 'DELETE',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        description: 'Delete dish',
        notes: 'Delete one dish for the given id in path parameter',
        tags: ['api', 'dish'],
    }
})
export class DeleteOneDishRoute implements OnDelete {
    /**
     * Class constructor
     * @param _dishService
     */
    constructor(private _dishService: DishService) {
    }

    /**
     * OnDelete implementation
     * @param request
     */
    onDelete(request: Request): Observable<void> {
        return this._dishService.delete(request.params.id);
    }
}
