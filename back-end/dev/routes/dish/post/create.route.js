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
let PostCreateDishRoute = class PostCreateDishRoute {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(_dishService) {
        this._dishService = _dishService;
    }
    /**
     * OnPost implementation
     * @param request
     */
    onPost(request) {
        return this._dishService.create(request.payload);
    }
};
PostCreateDishRoute = __decorate([
    core_1.Route({
        path: '/api/dish',
        method: 'POST',
        config: {
            cors: true,
            validate: {
                payload: Joi.object().keys({
                    name: Joi.string().required(),
                    price: Joi.number().required(),
                    ingredients: Joi.array().items(Joi.object().keys({
                        ref: Joi.string().required(),
                        quantityUse: Joi.number().required()
                    }))
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
                        price: Joi.number().required(),
                        ingredients: Joi.array().items(Joi.object().keys({
                            ref: Joi.string().required(),
                            quantityUse: Joi.number()
                        }))
                    })
                }
            },
            description: 'Create one dish',
            notes: 'Create a new dish and return it',
            tags: ['api', 'dish']
        }
    }),
    __metadata("design:paramtypes", [dish_service_1.DishService])
], PostCreateDishRoute);
exports.PostCreateDishRoute = PostCreateDishRoute;
//# sourceMappingURL=create.route.js.map