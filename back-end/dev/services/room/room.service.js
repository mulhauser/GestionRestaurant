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
const room_document_service_1 = require("../room-document/room-document.service");
const of_1 = require("rxjs/observable/of");
const throw_1 = require("rxjs/observable/throw");
const operators_1 = require("rxjs/operators");
let RoomService = class RoomService {
    /**
     * Class constructor
     */
    constructor(_roomDocumentService) {
        this._roomDocumentService = _roomDocumentService;
    }
    /**
     * Returns all existing people in the list
     *
     * @returns {Observable<People[]>}
     */
    listAll() {
        return this._roomDocumentService.find();
    }
    /**
     * Returns one people of the list matching id in parameter
     *
     * @param {string} id of the people
     *
     * @returns {Observable<People>}
     */
    one(id) {
        return this._roomDocumentService.findById(id)
            .pipe(operators_1.catchError(e => throw_1._throw(biim_1.Biim.preconditionFailed(e.message))), operators_1.flatMap(_ => !!_ ?
            of_1.of(_) :
            throw_1._throw(biim_1.Biim.notFound(`Room with id '${id}' not found`))));
    }
    /**
     * Check if person already exists and add it in people list
     *
     * @param person to create
     *
     * @returns {Observable<HapinessHTTPHandlerResponse>}
     */
    create(room) {
        return this._roomDocumentService.create(room)
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
    update(id, room) {
        return this._roomDocumentService.findByIdAndUpdate(id, room)
            .pipe(operators_1.catchError(e => throw_1._throw(biim_1.Biim.preconditionFailed(e.message))), operators_1.flatMap(_ => !!_ ?
            of_1.of(_) :
            throw_1._throw(biim_1.Biim.notFound(`Room with id '${id}' not found`))));
    }
    /**
     * Deletes on person in people list
     *
     * @param {string} id of the person to delete
     *
     * @returns {Observable<any>}
     */
    delete(id) {
        return this._roomDocumentService.findByIdAndRemove(id)
            .pipe(operators_1.catchError(e => throw_1._throw(biim_1.Biim.preconditionFailed(e.message))), operators_1.flatMap(_ => !!_ ?
            of_1.of(undefined) :
            throw_1._throw(biim_1.Biim.notFound(`Room with id '${id}' not found`))));
    }
};
RoomService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [room_document_service_1.RoomDocumentService])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map