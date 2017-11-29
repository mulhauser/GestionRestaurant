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
let PostCreatePeopleRoute = class PostCreatePeopleRoute {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(_peopleService) {
        this._peopleService = _peopleService;
    }
    /**
     * OnPost implementation
     * @param request
     */
    onPost(request) {
        return this._peopleService.create(request.payload);
    }
};
PostCreatePeopleRoute = __decorate([
    core_1.Route({
        path: '/api/people',
        method: 'POST',
        config: {
            validate: {
                payload: Joi.object().keys({
                    photo: Joi.string(),
                    firstname: Joi.string().required(),
                    lastname: Joi.string().required(),
                    email: Joi.string().email().required(),
                    phone: Joi.string().required(),
                    address: Joi.object().keys({
                        street: Joi.string().required(),
                        postalCode: Joi.number().required(),
                        city: Joi.string().required()
                    }).required()
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
                        photo: Joi.string(),
                        firstname: Joi.string().required(),
                        lastname: Joi.string().required(),
                        email: Joi.string().email().required(),
                        phone: Joi.string().required(),
                        address: Joi.object().keys({
                            street: Joi.string().required(),
                            postalCode: Joi.number().required(),
                            city: Joi.string().required()
                        }).required()
                    })
                }
            },
            description: 'Create one people',
            notes: 'Create a new people and return it',
            tags: ['api', 'people']
        }
    }),
    __metadata("design:paramtypes", [services_1.PeopleService])
], PostCreatePeopleRoute);
exports.PostCreatePeopleRoute = PostCreatePeopleRoute;
//# sourceMappingURL=create.route.js.map