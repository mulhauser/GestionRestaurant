import { Injectable } from '@hapiness/core';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';
import { Biim } from '@hapiness/biim';
import { Observable } from 'rxjs/Observable';

import { Room } from '../../interfaces';
import { RoomDocumentService } from '../room-document/room-document.service';

import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { flatMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class RoomService {
    /**
     * Class constructor
     */
    constructor(private _roomDocumentService: RoomDocumentService) {}

    /**
     * Returns all existing people in the list
     *
     * @returns {Observable<People[]>}
     */
    listAll(): Observable<Room[] | void> {
        return this._roomDocumentService.find();
    }

    /**
     * Returns one people of the list matching id in parameter
     *
     * @param {string} id of the people
     *
     * @returns {Observable<People>}
     */
    one(id: string): Observable<Room> {
        return this._roomDocumentService.findById(id)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`Room with id '${id}' not found`))
                )
            );
    }

    /**
     * Check if person already exists and add it in people list
     *
     * @param person to create
     *
     * @returns {Observable<HapinessHTTPHandlerResponse>}
     */
    create(room: Room): Observable<HapinessHTTPHandlerResponse> {
        return this._roomDocumentService.create(room)
            .pipe(
                catchError(e => _throw(Biim.conflict(e.message))),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }

    /**
     * Update a person in people list
     *
     * @param {string} id of the person to update
     * @param person data to update
     *
     * @returns {Observable<People>}
     */
    update(id: string, room: Room): Observable<Room> {
        return this._roomDocumentService.findByIdAndUpdate(id, room)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`Room with id '${id}' not found`))
                )
            );
    }

    /**
     * Deletes on person in people list
     *
     * @param {string} id of the person to delete
     *
     * @returns {Observable<any>}
     */
    delete(id: string): Observable<void> {
        return this._roomDocumentService.findByIdAndRemove(id)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        _throw(Biim.notFound(`Room with id '${id}' not found`))
                )
            );
    }
}
