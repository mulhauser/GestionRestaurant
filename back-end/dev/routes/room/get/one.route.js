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
const services_1 = require("../../../services");
const Joi = require("joi");
let GetOneRoomRoute = class GetOneRoomRoute {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(_roomService) {
        this._roomService = _roomService;
    }
    /**
     * OnGet implementation
     * @param request
     */
    onGet(request) {
        return this._roomService.one(request.params.id);
    }
};
GetOneRoomRoute = __decorate([
    core_1.Route({
        path: '/api/room/{id}',
        method: 'GET',
        config: {
            validate: {
                params: {
                    id: Joi.string().required()
                }
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
            description: 'Get one room',
            notes: 'Returns one room for the given id in path parameter',
            tags: ['api', 'room']
        }
    }),
    __metadata("design:paramtypes", [services_1.RoomService])
], GetOneRoomRoute);
exports.GetOneRoomRoute = GetOneRoomRoute;
//# sourceMappingURL=one.route.js.map