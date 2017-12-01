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

const roomDocumentFactory = (mongoClientService: MongoClientService) => new RoomDocumentService(mongoClientService);
const ingredientDocumentFactory = (mongoClientService: MongoClientService) => new IngredientDocumentService(mongoClientService);
const dishDocumentFactory = (mongoClientService: MongoClientService) => new DishDocumentService(mongoClientService);

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
        PutUpdateIngredientRoute,
        DishModel, GetAllDishRoute, GetOneDishRoute, PostCreateDishRoute, DeleteOneDishRoute, PutUpdateDishRoute
    ],
    providers: [
        HttpServerService,
        RoomService,
        { provide: RoomDocumentService, useFactory: roomDocumentFactory, deps: [MongoClientService] },
        IngredientService,
        { provide: IngredientDocumentService, useFactory: ingredientDocumentFactory, deps: [MongoClientService] },
        DishService,
        { provide: DishDocumentService, useFactory: dishDocumentFactory, deps: [MongoClientService] },
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
