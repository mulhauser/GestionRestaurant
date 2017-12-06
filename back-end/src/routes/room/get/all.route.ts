import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import { Room } from '../../../interfaces';
import { RoomService } from '../../../services';

import * as Joi from 'joi';

@Route({
    path: '/api/room',
    method: 'GET',
    config: {
        response: {
            status: {
                200: Joi.array().items(
                    Joi.object().keys({
                        id: Joi.string().required(),
                        name: Joi.string().required(),
                        idTables: Joi.array().items(
                            Joi.string()
                        ).required()
                    })
                ).unique().min(1)
            }
        },
        description: 'Get all room',
        notes: 'Returns an array of room or 204',
        tags: ['api', 'room']
    }
})
export class GetAllRoomRoute implements OnGet {
    /**
     * Class constructor
     * @param _roomService
     */
    constructor(private _roomService: RoomService) {
    }

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Room[] | void> {
        return this._roomService.listAll();
    }
}
