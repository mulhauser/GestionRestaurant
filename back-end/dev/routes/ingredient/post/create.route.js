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
const ingredient_service_1 = require("../../../services/ingredient/ingredient.service");
let PostCreateIngredientRoute = class PostCreateIngredientRoute {
    /**
     * Class constructor
     * @param _peopleService
     */
    constructor(_ingredientService) {
        this._ingredientService = _ingredientService;
    }
    /**
     * OnPost implementation
     * @param request
     */
    onPost(request) {
        return this._ingredientService.create(request.payload);
    }
};
PostCreateIngredientRoute = __decorate([
    core_1.Route({
        path: '/api/ingredient',
        method: 'POST',
        config: {
            cors: true,
            validate: {
                payload: Joi.object().keys({
                    name: Joi.string().required(),
                    quantity: Joi.number().required()
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
                        quantity: Joi.number().required()
                    })
                }
            },
            description: 'Create one ingredient',
            notes: 'Create a new ingredient and return it',
            tags: ['api', 'ingredient']
        }
    }),
    __metadata("design:paramtypes", [ingredient_service_1.IngredientService])
], PostCreateIngredientRoute);
exports.PostCreateIngredientRoute = PostCreateIngredientRoute;
//# sourceMappingURL=create.route.js.map