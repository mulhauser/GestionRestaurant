import { OnDelete, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import {OrderService} from '../../../services/order/order.service';

@Route({
    path: '/api/order/{id}',
    method: 'DELETE',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        description: 'Delete order',
        notes: 'Delete one order for the given id in path parameter',
        tags: ['api', 'order']
    }
})
export class DeleteOneOrderRoute implements OnDelete {
    /**
     * Class constructor
     * @param _orderService
     */
    constructor(private _orderService: OrderService) {
    }

    /**
     * OnDelete implementation
     * @param request
     */
    onDelete(request: Request): Observable<void> {
        return this._orderService.delete(request.params.id);
    }
}
