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
                table: Joi.object().keys({
                    id: Joi.string().required(),
                    name: Joi.string().required(),
                    seatingCapacity: Joi.number().required(),
                    idSalle: Joi.string().required()
                }),
                isServed: Joi.boolean().required(),
                isPayed: Joi.boolean().required(),
                dishes: Joi.array().items(
                    Joi.object().keys({
                        id: Joi.string().required(),
                        name: Joi.string().required(),
                        price: Joi.number().required(),
                        ingredients: Joi.array().items(
                            Joi.object().keys({
                                ref: Joi.string().required(),
                                name: Joi.string().required(),
                                quantityUse: Joi.number().required()
                            })
                        )
                    })
                ),
                orderDate: Joi.date().required(),
                serveDate: Joi.date().optional()
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
                    table: Joi.object().keys({
                        id: Joi.string().required(),
                        name: Joi.string().required(),
                        seatingCapacity: Joi.number().required(),
                        idSalle: Joi.string().required()
                    }),
                    isServed: Joi.boolean().required(),
                    isPayed: Joi.boolean().required(),
                    dishes: Joi.array().items(
                        Joi.object().keys({
                            id: Joi.string().required(),
                            name: Joi.string().required(),
                            price: Joi.number().required(),
                            ingredients: Joi.array().items(
                                Joi.object().keys({
                                    ref: Joi.string().required(),
                                    name: Joi.string().required(),
                                    quantityUse: Joi.number().required()
                                })
                            )
                        })
                    ),
                    orderDate: Joi.date().required(),
                    serveDate: Joi.date().optional()
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
     * @param _peopleService
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
