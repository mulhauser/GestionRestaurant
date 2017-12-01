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
const dish_service_1 = require("../../../services/dish/dish.service");
let DeleteOneDishRoute = class DeleteOneDishRoute {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(_dishService) {
        this._dishService = _dishService;
    }
    /**
     * OnDelete implementation
     * @param request
     */
    onDelete(request) {
        return this._dishService.delete(request.params.id);
    }
};
DeleteOneDishRoute = __decorate([
    core_1.Route({
        path: '/api/dish/{id}',
        method: 'DELETE',
        config: {
            validate: {
                params: {
                    id: Joi.string().required()
                }
            },
            description: 'Delete dish',
            notes: 'Delete one dish for the given id in path parameter',
            tags: ['api', 'dish']
        }
    }),
    __metadata("design:paramtypes", [dish_service_1.DishService])
], DeleteOneDishRoute);
exports.DeleteOneDishRoute = DeleteOneDishRoute;
//# sourceMappingURL=one.route.js.map