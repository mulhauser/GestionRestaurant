"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@hapiness/core");
const of_1 = require("rxjs/observable/of");
const Joi = require("joi");
let GetHelloWorldRoute = class GetHelloWorldRoute {
    /**
     * OnGet implementation
     *
     * @param {Request} request
     *
     * @return {Observable<string>}
     */
    onGet(request) {
        return of_1.of(`Hello ${request.params.name}!`);
    }
};
GetHelloWorldRoute = __decorate([
    core_1.Route({
        path: '/api/hello/{name}',
        method: 'GET',
        config: {
            validate: {
                params: {
                    name: Joi.string().min(3).max(10)
                }
            },
            response: {
                status: {
                    200: Joi.string().required()
                }
            },
            description: 'Say Hello',
            notes: 'The name parameter is required with min length of 3 and max length of 10',
            tags: ['api', 'hello']
        }
    })
], GetHelloWorldRoute);
exports.GetHelloWorldRoute = GetHelloWorldRoute;
//# sourceMappingURL=world.route.js.map