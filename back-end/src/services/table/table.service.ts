import { Injectable } from '@hapiness/core';
import { HapinessHTTPHandlerResponse } from '@hapiness/core/extensions/http-server';
import { Biim } from '@hapiness/biim';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { flatMap, map, catchError } from 'rxjs/operators';
import {Table} from '../../interfaces/table';
import {TableDocumentService} from '../table-document/table-document.service';

@Injectable()
export class TableService {
    /**
     * Class constructor
     */
    constructor(private _tableDocumentService: TableDocumentService) {}

    /**
     * Returns all existing tables in the list
     *
     * @returns {Observable<Tables[]>}
     */
    listAll(): Observable<Table[] | void> {
        return this._tableDocumentService.find();
    }

    /**
     * Returns one tables of the list matching id in parameter
     *
     * @param {string} id of the tables
     *
     * @returns {Observable<Tables>}
     */
    one(id: string): Observable<Table> {
        return this._tableDocumentService.findById(id)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`Table with id '${id}' not found`))
                )
            );
    }

    /**
     * Check if table already exists and add it in tables list
     *
     * @param table to create
     *
     * @returns {Observable<HapinessHTTPHandlerResponse>}
     */
    create(table: Table): Observable<HapinessHTTPHandlerResponse> {
        return this._tableDocumentService.create(table)
            .pipe(
                catchError(e => _throw(Biim.conflict(e.message))),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }

    /**
     * Update a table in tables list
     *
     * @param {string} id of the table to update
     * @param table data to update
     *
     * @returns {Observable<Tables>}
     */
    update(id: string, table: Table): Observable<Table> {
        return this._tableDocumentService.findByIdAndUpdate(id, table)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        _throw(Biim.notFound(`Table with id '${id}' not found`))
                )
            );
    }

    /**
     * Deletes on table in tables list
     *
     * @param {string} id of the table to delete
     *
     * @returns {Observable<any>}
     */
    delete(id: string): Observable<void> {
        return this._tableDocumentService.findByIdAndRemove(id)
            .pipe(
                catchError(e => _throw(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        _throw(Biim.notFound(`Table with id '${id}' not found`))
                )
            );
    }
}
