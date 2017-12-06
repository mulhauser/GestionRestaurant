import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import { OrderService } from '../../../services';
import { Order } from '../../../interfaces/order';

@Route({
    path: '/api/order/{id}',
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
                    isServed: Joi.boolean().required(),
                    isPayed: Joi.boolean().required(),
                    dishes: Joi.array().items(
                        Joi.object().keys({
                            ref: Joi.string().required(),
                            name: Joi.string().required(),
                        })
                    ),
                    orderDate: Joi.date().required(),
                    serveDate: Joi.date().optional()
                })
            }
        },
        description: 'Get one order',
        notes: 'Returns one order for the given id in path parameter',
        tags: ['api', 'order']
    }
})
export class GetOneOrderRoute implements OnGet {
    /**
     * Class constructor
     * @param _orderService
     */
    constructor(private _orderService: OrderService) {}

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Order> {
        return this._orderService.one(request.params.id);
    }
}
