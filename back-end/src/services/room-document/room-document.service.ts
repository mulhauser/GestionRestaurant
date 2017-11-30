import { Injectable } from '@hapiness/core';
import { MongoClientService } from '@hapiness/mongo';
import { MongooseDocument } from 'mongoose';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { flatMap, filter, map } from 'rxjs/operators';
import { mergeStatic } from 'rxjs/operators/merge';

import { RoomModel } from '../../models';
import { Room } from '../../interfaces';
import { Config } from '@hapiness/config';

@Injectable()
export class RoomDocumentService {
    // private property to store document instance
    private _document: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        this._document = this._mongoClientService.getModel({
            adapter: 'mongoose',
            options: Config.get('mongodb')
        }, RoomModel);
    }

    /**
     * Call mongoose method, call toJSON on each result and returns People[] or undefined
     *
     * @return {Observable<Room[] | void>}
     */
    find(): Observable<Room[] | void> {
        return fromPromise(this._document.find({}))
            .pipe(
                flatMap((docs: MongooseDocument[]) =>
                    of(of(docs))
                        .pipe(
                            flatMap(_ =>
                                mergeStatic(
                                    _.pipe(
                                        filter(__ => !!__ && __.length > 0),
                                        map(__ => __.map(doc => doc.toJSON())),
                                    ),
                                    _.pipe(
                                        filter(__ => !__ || __.length === 0),
                                        map(__ => undefined)
                                    )
                                )
                            )
                        )
                )
            );
    }

    /**
     * Returns one people of the list matching id in parameter
     *
     * @param {string} id of the people in the db
     *
     * @return {Observable<Room | void>}
     */
    findById(id: string): Observable<Room | void> {
        return fromPromise(this._document.findById(id))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as Room) :
                        of(undefined)
                )
            )
    }

    /**
     * Check if person already exists and add it in people list
     *
     * @param {Room} room to create
     *
     * @return {Observable<Room>}
     */
    create(room: Room): Observable<Room> {
        return fromPromise(this._document.findOne({
            name: { $regex: new RegExp(room.name, 'i') },
        }))
            .pipe(
                flatMap(_ => !!_ ?
                    _throw(
                        new Error(`Room with name '${room.name}' already exists`)
                    ) :
                    fromPromise(this._document.create(room))
                ),
                map((doc: MongooseDocument) => doc.toJSON() as Room)
            );
    }

    /**
     * Update a person in people list
     *
     * @param {string} id
     * @param {Room} room
     *
     * @return {Observable<Room>}
     */
    findByIdAndUpdate(id: string, room: Room): Observable<Room> {
        return fromPromise(this._document.findByIdAndUpdate(id, room, { new: true }))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as Room) :
                        of(undefined)
                )
            )
    }

    /**
     * Delete a person in people list
     *
     * @param {string} id
     *
     * @return {Observable<Room>}
     */
    findByIdAndRemove(id: string): Observable<Room> {
        return fromPromise(this._document.findByIdAndRemove(id))
            .pipe(
                flatMap((doc: MongooseDocument) =>
                    !!doc ?
                        of(doc.toJSON() as Room) :
                        of(undefined)
                )
            )
    }
}
