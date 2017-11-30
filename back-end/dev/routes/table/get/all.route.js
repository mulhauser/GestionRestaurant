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
const table_service_1 = require("../../../services/table/table.service");
let GetAllTableRoute = class GetAllTableRoute {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(_tableService) {
        this._tableService = _tableService;
    }
    /**
     * OnGet implementation
     * @param request
     */
    onGet(request) {
        return this._tableService.listAll();
    }
};
GetAllTableRoute = __decorate([
    core_1.Route({
        path: '/api/table',
        method: 'GET',
        config: {
            response: {
                status: {
                    200: Joi.array().items(Joi.object().keys({
                        id: Joi.string().required(),
                        name: Joi.string().required(),
                        seatingCapacity: Joi.number().required(),
                        idOrders: Joi.array().items(Joi.string()),
                        idSalle: Joi.string().required()
                    })).unique().min(1)
                }
            },
            description: 'Get all table',
            notes: 'Returns an array of table or 204',
            tags: ['api', 'table']
        }
    }),
    __metadata("design:paramtypes", [table_service_1.TableService])
], GetAllTableRoute);
exports.GetAllTableRoute = GetAllTableRoute;
//# sourceMappingURL=all.route.js.map