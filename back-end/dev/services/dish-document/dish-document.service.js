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
const mongo_1 = require("@hapiness/mongo");
const fromPromise_1 = require("rxjs/observable/fromPromise");
const of_1 = require("rxjs/observable/of");
const throw_1 = require("rxjs/observable/throw");
const operators_1 = require("rxjs/operators");
const merge_1 = require("rxjs/operators/merge");
const config_1 = require("@hapiness/config");
const dish_model_1 = require("../../models/dish/dish.model");
const ingredient_document_service_1 = require("../ingredient-document/ingredient-document.service");
const biim_1 = require("@hapiness/biim");
let DishDocumentService = class DishDocumentService {
    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(_mongoClientService) {
        this._mongoClientService = _mongoClientService;
        this._document = this._mongoClientService.getModel({
            adapter: 'mongoose',
            options: config_1.Config.get('mongodb')
        }, dish_model_1.DishModel);
        this._documentIngredient = new ingredient_document_service_1.IngredientDocumentService(_mongoClientService);
    }
    /**
     * Call mongoose method, call toJSON on each result and returns People[] or undefined
     *
     * @return {Observable<Room[] | void>}
     */
    find() {
        return fromPromise_1.fromPromise(this._document.find({}))
            .pipe(operators_1.flatMap((docs) => of_1.of(of_1.of(docs))
            .pipe(operators_1.flatMap(_ => merge_1.mergeStatic(_.pipe(operators_1.filter(__ => !!__ && __.length > 0), operators_1.map(__ => __.map(doc => doc.toJSON()))), _.pipe(operators_1.filter(__ => !__ || __.length === 0), operators_1.map(__ => undefined)))))));
    }
    /**
     * Returns one people of the list matching id in parameter
     *
     * @param {string} id of the people in the db
     *
     * @return {Observable<Room | void>}
     */
    findById(id) {
        return fromPromise_1.fromPromise(this._document.findById(id))
            .pipe(operators_1.flatMap((doc) => !!doc ?
            of_1.of(doc.toJSON()) :
            of_1.of(undefined)));
    }
    /**
     * Check if person already exists and add it in people list
     *
     * @param {Room} room to create
     *
     * @return {Observable<Room>}
     */
    create(dish) {
        let obs;
        for (let ingredient of dish.ingredients) {
            obs = fromPromise_1.fromPromise(this._documentIngredient.findById(ingredient.ref));
        }
        return obs.pipe(operators_1.catchError(e => throw_1._throw(biim_1.Biim.preconditionFailed(e.message))), operators_1.flatMap(_ => !!_ ?
            of_1.of(_) :
            throw_1._throw(biim_1.Biim)));
        // return fromPromise(this._documentIngredient.findById())
        /*return fromPromise(this._document.findOne({
            name: { $regex: new RegExp(dish.name, 'i') },
        }))
            .pipe(
                flatMap(_ => !!_ ?
                    _throw(
                        new Error(`Dish with name '${dish.name}' already exists`)
                    ) :
                    fromPromise(this._document.create(dish))
                ),
                map((doc: MongooseDocument) => doc.toJSON() as Dish)
            );*/
    }
    /**
     * Update a person in people list
     *
     * @param {string} id
     * @param {Room} room
     *
     * @return {Observable<Room>}
     */
    findByIdAndUpdate(id, dish) {
        return fromPromise_1.fromPromise(this._document.findByIdAndUpdate(id, dish, { new: true }))
            .pipe(operators_1.flatMap((doc) => !!doc ?
            of_1.of(doc.toJSON()) :
            of_1.of(undefined)));
    }
    /**
     * Delete a person in people list
     *
     * @param {string} id
     *
     * @return {Observable<Room>}
     */
    findByIdAndRemove(id) {
        return fromPromise_1.fromPromise(this._document.findByIdAndRemove(id))
            .pipe(operators_1.flatMap((doc) => !!doc ?
            of_1.of(doc.toJSON()) :
            of_1.of(undefined)));
    }
};
DishDocumentService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [mongo_1.MongoClientService])
], DishDocumentService);
exports.DishDocumentService = DishDocumentService;
//# sourceMappingURL=dish-document.service.js.map