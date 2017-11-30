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
const Joi = require("joi");
const room_service_1 = require("../../../services/room/room.service");
let PutUpdateRoomRoute = class PutUpdateRoomRoute {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(_roomService) {
        this._roomService = _roomService;
    }
    /**
     * OnPut implementation
     * @param request
     */
    onPut(request) {
        return this._roomService.update(request.params.id, request.payload);
    }
};
PutUpdateRoomRoute = __decorate([
    core_1.Route({
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
                        idTables: Joi.array().items(Joi.string())
                    })
                }
            },
            description: 'Update one room',
            notes: 'Update the room for the given id in path parameter and return it',
            tags: ['api', 'room']
        }
    }),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], PutUpdateRoomRoute);
exports.PutUpdateRoomRoute = PutUpdateRoomRoute;
//# sourceMappingURL=update.route.js.map