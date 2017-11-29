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
let DeleteOnePeopleRoute = class DeleteOnePeopleRoute {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(_peopleService) {
        this._peopleService = _peopleService;
    }
    /**
     * OnDelete implementation
     * @param request
     */
    onDelete(request) {
        return this._peopleService.delete(request.params.id);
    }
};
DeleteOnePeopleRoute = __decorate([
    core_1.Route({
        path: '/api/people/{id}',
        method: 'DELETE',
        config: {
            validate: {
                params: {
                    id: Joi.string().required()
                }
            },
            description: 'Delete people',
            notes: 'Delete one people for the given id in path parameter',
            tags: ['api', 'people']
        }
    }),
    __metadata("design:paramtypes", [services_1.PeopleService])
], DeleteOnePeopleRoute);
exports.DeleteOnePeopleRoute = DeleteOnePeopleRoute;
//# sourceMappingURL=one.route.js.map