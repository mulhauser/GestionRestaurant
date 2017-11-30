import { OnPost, Route, Request } from '@hapiness/core';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import {RoomService} from '../../../services/room/room.service';
import {Room} from '../../../interfaces/room';

@Route({
    path: '/api/room',
    method: 'POST',
    config: {
        validate: {
            payload: Joi.object().keys({
                name: Joi.string().required(),
                idTables: Joi.array().items(
                    Joi.string()
                )
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
                    idTables: Joi.array().items(
                        Joi.string()
                    )
                })
            }
        },
        description: 'Create one room',
        notes: 'Create a new room and return it',
        tags: ['api', 'room']
    }
})
export class PostCreateRoomRoute implements OnPost {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _roomService: RoomService) {
    }

    /**
     * OnPost implementation
     * @param request
     */
    onPost(request: Request): Observable<HapinessHTTPHandlerResponse> {
        return this._roomService.create(request.payload as Room);
    }
}
