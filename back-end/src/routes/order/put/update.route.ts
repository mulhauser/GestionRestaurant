import { OnPut, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';


import * as Joi from 'joi';
import {OrderService} from '../../../services/order/order.service';
import {Order} from '../../../interfaces/order';

@Route({
    path: '/api/order/{id}',
    method: 'PUT',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: Joi.object().keys({
                idTable: Joi.string().required(),
                isServed: Joi.boolean().required(),
                isPayed: Joi.boolean().required(),
                idDishes: Joi.array().items((Joi.string().required())),
                orderDate: Joi.date().required(),
                serveDate: Joi.date().required()
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
                    idTable: Joi.string().required(),
                    isServed: Joi.boolean().required(),
                    isPayed: Joi.boolean().required(),
                    idDishes: Joi.array().items((Joi.string().required())),
                    orderDate: Joi.date().required(),
                    serveDate: Joi.date().required()
                })
            }
        },
        description: 'Update one order',
        notes: 'Update the order for the given id in path parameter and return it',
        tags: ['api', 'order']
    }
})
export class PutUpdateOrderRoute implements OnPut {
    /**
     * Class constructor
     * @param _orderService
     */
    constructor(private _orderService: OrderService) {
    }

    /**
     * OnPut implementation
     * @param request
     */
    onPut(request: Request): Observable<Order> {
        return this._orderService.update(request.params.id, request.payload);
    }
}
