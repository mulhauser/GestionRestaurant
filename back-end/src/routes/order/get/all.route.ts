import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';


import * as Joi from 'joi';
import {OrderService} from '../../../services/order/order.service';
import {Order} from '../../../interfaces/order';

@Route({
    path: '/api/order',
    method: 'GET',
    config: {
        response: {
            status: {
                200: Joi.array().items(
                    Joi.object().keys({
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
                ).unique().min(1)
            }
        },
        description: 'Get all order',
        notes: 'Returns an array of order or 204',
        tags: ['api', 'order']
    }
})
export class GetAllOrderRoute implements OnGet {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _orderService: OrderService) {
    }

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Order[] | void> {
        return this._orderService.listAll();
    }
}
