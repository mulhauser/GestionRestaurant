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
                200: Joi.object().keys({
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
