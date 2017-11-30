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
let PostCreateRoomRoute = class PostCreateRoomRoute {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(_roomService) {
        this._roomService = _roomService;
    }
    /**
     * OnPost implementation
     * @param request
     */
    onPost(request) {
        return this._roomService.create(request.payload);
    }
};
PostCreateRoomRoute = __decorate([
    core_1.Route({
        path: '/api/room',
        method: 'POST',
        config: {
            validate: {
                payload: Joi.object().keys({
                    name: Joi.string().required(),
                    idTables: Joi.array().items(Joi.string())
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
                        idTables: Joi.array().items(Joi.string())
                    })
                }
            },
            description: 'Create one room',
            notes: 'Create a new room and return it',
            tags: ['api', 'room']
        }
    }),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], PostCreateRoomRoute);
exports.PostCreateRoomRoute = PostCreateRoomRoute;
//# sourceMappingURL=create.route.js.map