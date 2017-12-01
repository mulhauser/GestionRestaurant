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
const logger_1 = require("@hapiness/logger");
const swag_1 = require("@hapiness/swag");
const config_1 = require("@hapiness/config");
const mongo_1 = require("@hapiness/mongo");
const room_model_1 = require("./models/room/room.model");
const all_route_1 = require("./routes/room/get/all.route");
const one_route_1 = require("./routes/room/get/one.route");
const create_route_1 = require("./routes/room/post/create.route");
const one_route_2 = require("./routes/room/delete/one.route");
const update_route_1 = require("./routes/room/put/update.route");
const room_document_service_1 = require("./services/room-document/room-document.service");
const room_service_1 = require("./services/room/room.service");
const all_route_2 = require("./routes/ingredient/get/all.route");
const one_route_3 = require("./routes/ingredient/get/one.route");
const create_route_2 = require("./routes/ingredient/post/create.route");
const one_route_4 = require("./routes/ingredient/delete/one.route");
const update_route_2 = require("./routes/ingredient/put/update.route");
const ingredient_model_1 = require("./models/ingredient/ingredient.model");
const ingredient_service_1 = require("./services/ingredient/ingredient.service");
const ingredient_document_service_1 = require("./services/ingredient-document/ingredient-document.service");
const dish_document_service_1 = require("./services/dish-document/dish-document.service");
const all_route_3 = require("./routes/dish/get/all.route");
const one_route_5 = require("./routes/dish/get/one.route");
const create_route_3 = require("./routes/dish/post/create.route");
const one_route_6 = require("./routes/dish/delete/one.route");
const update_route_3 = require("./routes/dish/put/update.route");
const dish_model_1 = require("./models/dish/dish.model");
const dish_service_1 = require("./services/dish/dish.service");
const roomDocumentFactory = (mongoClientService) => new room_document_service_1.RoomDocumentService(mongoClientService);
const ingredientDocumentFactory = (mongoClientService) => new ingredient_document_service_1.IngredientDocumentService(mongoClientService);
const dishDocumentFactory = (mongoClientService) => new dish_document_service_1.DishDocumentService(mongoClientService);
let ApplicationModule = class ApplicationModule {
    /**
     * Class constructor
     *
     * @param {HttpServerService} _httpServer wrapper for instance of original Hapi server
     * @param {LoggerService} _logger
     */
    constructor(_httpServer, _logger) {
        this._httpServer = _httpServer;
        this._logger = _logger;
    }
    /**
     * On start process
     *
     * @return {void | Observable<any>}
     */
    onStart() {
        this._logger.info(`< Application.bootstrap > Server started at: ${this._httpServer.instance().info.uri}`);
    }
    /**
     * On error process
     *
     * @param {Error} error
     * @param data
     *
     * @return {void | Observable<any>}
     */
    onError(error, data) {
        this._logger.error('A problem occurred during application\'s lifecycle');
    }
};
ApplicationModule = __decorate([
    core_1.HapinessModule({
        version: '1.0.0',
        imports: [
            logger_1.LoggerModule,
            swag_1.SwagModule.setConfig(config_1.Config.get('swag')),
            mongo_1.MongoModule
        ],
        declarations: [
            room_model_1.RoomModel, all_route_1.GetAllRoomRoute, one_route_1.GetOneRoomRoute, create_route_1.PostCreateRoomRoute, one_route_2.DeleteOneRoomRoute, update_route_1.PutUpdateRoomRoute,
            ingredient_model_1.IngredientModel, all_route_2.GetAllIngredientRoute, one_route_3.GetOneIngredientRoute, create_route_2.PostCreateIngredientRoute, one_route_4.DeleteOneIngredientRoute,
            update_route_2.PutUpdateIngredientRoute,
            dish_model_1.DishModel, all_route_3.GetAllDishRoute, one_route_5.GetOneDishRoute, create_route_3.PostCreateDishRoute, one_route_6.DeleteOneDishRoute, update_route_3.PutUpdateDishRoute
        ],
        providers: [
            core_1.HttpServerService,
            room_service_1.RoomService,
            { provide: room_document_service_1.RoomDocumentService, useFactory: roomDocumentFactory, deps: [mongo_1.MongoClientService] },
            ingredient_service_1.IngredientService,
            { provide: ingredient_document_service_1.IngredientDocumentService, useFactory: ingredientDocumentFactory, deps: [mongo_1.MongoClientService] },
            dish_service_1.DishService,
            { provide: dish_document_service_1.DishDocumentService, useFactory: dishDocumentFactory, deps: [mongo_1.MongoClientService] },
        ]
    }),
    __metadata("design:paramtypes", [core_1.HttpServerService, logger_1.LoggerService])
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=application.module.js.map