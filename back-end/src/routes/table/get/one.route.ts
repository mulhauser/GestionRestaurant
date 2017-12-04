import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import { TableService } from '../../../services';
import { Table } from '../../../interfaces/table';

@Route({
    path: '/api/table/{id}',
    method: 'GET',
    config: {
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
                    seatingCapacity: Joi.number().required(),
                    idOrders: Joi.array().items((Joi.string().required())),
                    idSalle: Joi.string().required()
                })
            }
        },
        description: 'Get one table',
        notes: 'Returns one table for the given id in path parameter',
        tags: ['api', 'table']
    }
})
export class GetOneTableRoute implements OnGet {
    /**
     * Class constructor
     * @param _tableService
     */
    constructor(private _tableService: TableService) {}

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Table> {
        return this._tableService.one(request.params.id);
    }
}
