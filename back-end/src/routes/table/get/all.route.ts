import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';


import * as Joi from 'joi';
import {TableService} from '../../../services/table/table.service';
import {Table} from '../../../interfaces/table';

@Route({
    path: '/api/table',
    method: 'GET',
    config: {
        response: {
            status: {
                200: Joi.array().items(
                    Joi.object().keys({
                        id: Joi.string().required(),
                        name: Joi.string().required(),
                        seatingCapacity: Joi.number().required(),
                        idOrders: Joi.array().items(
                            Joi.string().required()
                        ),
                        idSalle: Joi.string().required()
                    })
                ).unique().min(1)
            }
        },
        description: 'Get all table',
        notes: 'Returns an array of table or 204',
        tags: ['api', 'table']
    }
})
export class GetAllTableRoute implements OnGet {
    /**
     * Class constructor
     * @param _tableService
     */
    constructor(private _tableService: TableService) {
    }

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Table[] | void> {
        return this._tableService.listAll();
    }
}
