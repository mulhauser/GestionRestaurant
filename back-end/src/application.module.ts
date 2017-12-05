import { HapinessModule, HttpServerService, OnError, OnStart } from '@hapiness/core';
import { LoggerModule, LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs/Observable';
import {SwagModule} from '@hapiness/swag';
import {Config} from '@hapiness/config';
import {MongoClientService, MongoModule} from '@hapiness/mongo';

import {RoomModel} from './models/room/room.model';
import {GetAllRoomRoute} from './routes/room/get/all.route';
import {GetOneRoomRoute} from './routes/room/get/one.route';
import {PostCreateRoomRoute} from './routes/room/post/create.route';
import {DeleteOneRoomRoute} from './routes/room/delete/one.route';
import {PutUpdateRoomRoute} from './routes/room/put/update.route';
import {RoomDocumentService} from './services/room-document/room-document.service';
import {RoomService} from './services/room/room.service';

import {GetAllIngredientRoute} from './routes/ingredient/get/all.route';
import {GetOneIngredientRoute} from './routes/ingredient/get/one.route';
import {PostCreateIngredientRoute} from './routes/ingredient/post/create.route';
import {DeleteOneIngredientRoute} from './routes/ingredient/delete/one.route';
import {PutUpdateIngredientRoute} from './routes/ingredient/put/update.route';
import {IngredientModel} from './models/ingredient/ingredient.model';
import {IngredientService} from './services/ingredient/ingredient.service';
import {IngredientDocumentService} from './services/ingredient-document/ingredient-document.service';

import {DishDocumentService} from './services/dish-document/dish-document.service';
import {GetAllDishRoute} from './routes/dish/get/all.route';
import {GetOneDishRoute} from './routes/dish/get/one.route';
import {PostCreateDishRoute} from './routes/dish/post/create.route';
import {DeleteOneDishRoute} from './routes/dish/delete/one.route';
import {PutUpdateDishRoute} from './routes/dish/put/update.route';
import {DishModel} from './models/dish/dish.model';
import {DishService} from './services/dish/dish.service';
import {GetOneByNameIngredientRoute} from './routes/ingredient/get/one-by-name.route';

import {OrderDocumentService} from './services/order-document/order-document.service';
import {GetAllOrderRoute} from './routes/order/get/all.route';
import {GetOneOrderRoute} from './routes/order/get/one.route';
import {PostCreateOrderRoute} from './routes/order/post/create.route';
import {DeleteOneOrderRoute} from './routes/order/delete/one.route';
import {PutUpdateOrderRoute} from './routes/order/put/update.route';
import {OrderModel} from './models/order/order.model';
import {OrderService} from './services/order/order.service';

import {TableDocumentService} from './services/table-document/table-document.service';
import {GetAllTableRoute} from './routes/table/get/all.route';
import {GetOneTableRoute} from './routes/table/get/one.route';
import {PostCreateTableRoute} from './routes/table/post/create.route';
import {DeleteOneTableRoute} from './routes/table/delete/one.route';
import {PutUpdateTableRoute} from './routes/table/put/update.route';
import {TableModel} from './models/table/table.model';
import {TableService} from './services/table/table.service';

const roomDocumentFactory = (mongoClientService: MongoClientService) => new RoomDocumentService(mongoClientService);
const ingredientDocumentFactory = (mongoClientService: MongoClientService) => new IngredientDocumentService(mongoClientService);
const dishDocumentFactory = (mongoClientService: MongoClientService) => new DishDocumentService(mongoClientService);
const orderDocumentFactory = (mongoClientService: MongoClientService) => new OrderDocumentService(mongoClientService);
const tableDocumentFactory = (mongoClientService: MongoClientService) => new TableDocumentService(mongoClientService);

@HapinessModule({
    version: '1.0.0',
    imports: [
        LoggerModule,
        SwagModule.setConfig(Config.get('swag')),
        MongoModule
    ],
    declarations: [
        RoomModel, GetAllRoomRoute, GetOneRoomRoute, PostCreateRoomRoute, DeleteOneRoomRoute, PutUpdateRoomRoute,
        IngredientModel, GetAllIngredientRoute, GetOneIngredientRoute, PostCreateIngredientRoute, DeleteOneIngredientRoute,
        PutUpdateIngredientRoute, GetOneByNameIngredientRoute,
        DishModel, GetAllDishRoute, GetOneDishRoute, PostCreateDishRoute, DeleteOneDishRoute, PutUpdateDishRoute,
        OrderModel, GetAllOrderRoute, GetOneOrderRoute, PostCreateOrderRoute, DeleteOneOrderRoute, PutUpdateOrderRoute,
        TableModel, GetAllTableRoute, GetOneTableRoute, PostCreateTableRoute, DeleteOneTableRoute, PutUpdateTableRoute

    ],
    providers: [
        HttpServerService,
        RoomService,
        { provide: RoomDocumentService, useFactory: roomDocumentFactory, deps: [MongoClientService] },
        IngredientService,
        { provide: IngredientDocumentService, useFactory: ingredientDocumentFactory, deps: [MongoClientService] },
        DishService,
        { provide: DishDocumentService, useFactory: dishDocumentFactory, deps: [MongoClientService] },
        OrderService,
        { provide: OrderDocumentService, useFactory: orderDocumentFactory, deps: [MongoClientService] },
        TableService,
        { provide: TableDocumentService, useFactory: tableDocumentFactory, deps: [MongoClientService] },
    ]
})
export class ApplicationModule implements OnStart, OnError {
    /**
     * Class constructor
     *
     * @param {HttpServerService} _httpServer wrapper for instance of original Hapi server
     * @param {LoggerService} _logger
     */
    constructor(private _httpServer: HttpServerService, private _logger: LoggerService) {}
    /**
     * On start process
     *
     * @return {void | Observable<any>}
     */
    onStart(): void | Observable<any> {
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
    onError(error: Error, data?: any): void | Observable<any> {
        this._logger.error('A problem occurred during application\'s lifecycle');
    }
}
