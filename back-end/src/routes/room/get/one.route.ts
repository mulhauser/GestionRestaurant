import { OnGet, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import { RoomService } from '../../../services';

import * as Joi from 'joi';
import {Room} from '../../../interfaces/room';

@Route({
    path: '/api/room/{id}',
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
                    idTables: Joi.array().items(
                        Joi.string()
                    )
                })
            }
        },
        description: 'Get one room',
        notes: 'Returns one room for the given id in path parameter',
        tags: ['api', 'room']
    }
})
export class GetOneRoomRoute implements OnGet {
    /**
     * Class constructor
     * @param _roomService
     */
    constructor(private _roomService: RoomService) {}

    /**
     * OnGet implementation
     * @param request
     */
    onGet(request: Request): Observable<Room> {
        return this._roomService.one(request.params.id);
    }
}
