import { OnPost, Route, Request } from '@hapiness/core';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import {TableService} from '../../../services/table/table.service';
import {Table} from '../../../interfaces/table';

@Route({
    path: '/api/table',
    method: 'POST',
    config: {
        validate: {
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
                201: Joi.object().keys({
                    id: Joi.string().required(),
                    name: Joi.string().required(),
                    seatingCapacity: Joi.number().required(),
                    idOrders: Joi.array().items((Joi.string().required())),
                    idSalle: Joi.string().required()
                })
            }
        },
        description: 'Create one table',
        notes: 'Create a new table and return it',
        tags: ['api', 'table']
    }
})
export class PostCreateTableRoute implements OnPost {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _tableService: TableService) {
    }

    /**
     * OnPost implementation
     * @param request
     */
    onPost(request: Request): Observable<HapinessHTTPHandlerResponse> {
        return this._tableService.create(request.payload as Table);
    }
}
