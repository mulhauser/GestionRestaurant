import { OnDelete, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import {TableService} from '../../../services/table/table.service';

@Route({
    path: '/api/table/{id}',
    method: 'DELETE',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        description: 'Delete room',
        notes: 'Delete one table for the given id in path parameter',
        tags: ['api', 'table']
    }
})
export class DeleteOneTableRoute implements OnDelete {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _tableService: TableService) {
    }

    /**
     * OnDelete implementation
     * @param request
     */
    onDelete(request: Request): Observable<void> {
        return this._tableService.delete(request.params.id);
    }
}
