import { OnPost, Route, Request } from '@hapiness/core';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import {OrderService} from '../../../services/order/order.service';
import {Order} from '../../../interfaces/order';

@Route({
    path: '/api/order',
    method: 'POST',
    config: {
        validate: {
            payload: Joi.object().keys({
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
                serveDate: Joi.date()
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
                    isServed: Joi.boolean().required(),
                    isPayed: Joi.boolean().required(),
                    dishes: Joi.array().items(
                        Joi.object().keys({
                            ref: Joi.string().required(),
                            name: Joi.string().required(),
                        })
                    ),
                    orderDate: Joi.date().required(),
                })
            }
        },
        description: 'Create one order',
        notes: 'Create a new order and return it',
        tags: ['api', 'order']
    }
})
export class PostCreateOrderRoute implements OnPost {
    /**
     * Class constructor
     * @param _orderService
     */
    constructor(private _orderService: OrderService) {
    }

    /**
     * OnPost implementation
     * @param request
     */
    onPost(request: Request): Observable<HapinessHTTPHandlerResponse> {
        return this._orderService.create(request.payload as Order);
    }
}
