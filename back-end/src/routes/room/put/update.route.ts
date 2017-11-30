import { OnPut, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';


import * as Joi from 'joi';
import {RoomService} from '../../../services/room/room.service';
import {Room} from '../../../interfaces/room';

@Route({
    path: '/api/room/{id}',
    method: 'PUT',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: Joi.object().keys({
                name: Joi.string().required()
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
                    idTables: Joi.array().items(
                        Joi.string()
                    )
                })
            }
        },
        description: 'Update one room',
        notes: 'Update the room for the given id in path parameter and return it',
        tags: ['api', 'room']
    }
})
export class PutUpdateRoomRoute implements OnPut {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _roomService: RoomService) {
    }

    /**
     * OnPut implementation
     * @param request
     */
    onPut(request: Request): Observable<Room> {
        return this._roomService.update(request.params.id, request.payload);
    }
}
