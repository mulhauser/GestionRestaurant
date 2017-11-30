"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@hapiness/core");
const biim_1 = require("@hapiness/biim");
const of_1 = require("rxjs/observable/of");
const throw_1 = require("rxjs/observable/throw");
const operators_1 = require("rxjs/operators");
const table_document_service_1 = require("../table-document/table-document.service");
let TableService = class TableService {
    /**
     * Class constructor
     */
    constructor(_tableDocumentService) {
        this._tableDocumentService = _tableDocumentService;
    }
    /**
     * Returns all existing people in the list
     *
     * @returns {Observable<People[]>}
     */
    listAll() {
        return this._tableDocumentService.find();
    }
    /**
     * Returns one people of the list matching id in parameter
     *
     * @param {string} id of the people
     *
     * @returns {Observable<People>}
     */
    one(id) {
        return this._tableDocumentService.findById(id)
            .pipe(operators_1.catchError(e => throw_1._throw(biim_1.Biim.preconditionFailed(e.message))), operators_1.flatMap(_ => !!_ ?
            of_1.of(_) :
            throw_1._throw(biim_1.Biim.notFound(`Table with id '${id}' not found`))));
    }
    /**
     * Check if person already exists and add it in people list
     *
     * @param person to create
     *
     * @returns {Observable<HapinessHTTPHandlerResponse>}
     */
    create(table) {
        return this._tableDocumentService.create(table)
            .pipe(operators_1.catchError(e => throw_1._throw(biim_1.Biim.conflict(e.message))), operators_1.map(_ => ({ response: _, statusCode: 201 })));
    }
    /**
     * Update a person in people list
     *
     * @param {string} id of the person to update
     * @param person data to update
     *
     * @returns {Observable<People>}
     */
    update(id, table) {
        return this._tableDocumentService.findByIdAndUpdate(id, table)
            .pipe(operators_1.catchError(e => throw_1._throw(biim_1.Biim.preconditionFailed(e.message))), operators_1.flatMap(_ => !!_ ?
            of_1.of(_) :
            throw_1._throw(biim_1.Biim.notFound(`Table with id '${id}' not found`))));
    }
    /**
     * Deletes on person in people list
     *
     * @param {string} id of the person to delete
     *
     * @returns {Observable<any>}
     */
    delete(id) {
        return this._tableDocumentService.findByIdAndRemove(id)
            .pipe(operators_1.catchError(e => throw_1._throw(biim_1.Biim.preconditionFailed(e.message))), operators_1.flatMap(_ => !!_ ?
            of_1.of(undefined) :
            throw_1._throw(biim_1.Biim.notFound(`Table with id '${id}' not found`))));
    }
};
TableService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [table_document_service_1.TableDocumentService])
], TableService);
exports.TableService = TableService;
//# sourceMappingURL=table.service.js.map