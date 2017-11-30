import { OnDelete, Route, Request } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import * as Joi from 'joi';
import {RoomService} from '../../../services/room/room.service';

@Route({
    path: '/api/room/{id}',
    method: 'DELETE',
    config: {
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        description: 'Delete room',
        notes: 'Delete one room for the given id in path parameter',
        tags: ['api', 'room']
    }
})
export class DeleteOneRoomRoute implements OnDelete {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(private _roomService: RoomService) {
    }

    /**
     * OnDelete implementation
     * @param request
     */
    onDelete(request: Request): Observable<void> {
        return this._roomService.delete(request.params.id);
    }
}
