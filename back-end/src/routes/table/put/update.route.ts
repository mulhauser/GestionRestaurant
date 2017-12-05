import { OnPut, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import {TableService} from '../../../services/table/table.service';
import {Table} from '../../../interfaces/table';

@Route({
    path: '/api/table/{id}',
    method: 'PUT',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: Joi.object().keys({
                name: Joi.string().required(),
                seatingCapacity: Joi.number().required(),
                idOrders: Joi.array().items((Joi.string().required())),
                idSalle: Joi.string().required()
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
                    seatingCapacity: Joi.number().required(),
                    idOrders: Joi.array().items((Joi.string().required())),
                    idSalle: Joi.string().required()
                })
            }
        },
        description: 'Update one table',
        notes: 'Update the table for the given id in path parameter and return it',
        tags: ['api', 'table']
    }
})
export class PutUpdateTableRoute implements OnPut {
    /**
     * Class constructor
     * @param _tableService
     */
    constructor(private _tableService: TableService) {
    }

    /**
     * OnPut implementation
     * @param request
     */
    onPut(request: Request): Observable<Table> {
        return this._tableService.update(request.params.id, request.payload);
    }
}
