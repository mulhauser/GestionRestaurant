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
const mongo_1 = require("@hapiness/mongo");
const config_1 = require("@hapiness/config");
let RoomModel = RoomModel_1 = class RoomModel extends mongo_1.Model {
    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(_mongoClientService) {
        // call parent constructor
        super(RoomModel_1);
        this._mongoClientService = _mongoClientService;
        // get dao
        const dao = this._mongoClientService.getDao(this.connectionOptions);
        // create schema
        this.schema = new dao.Schema({
            name: { type: String, required: true },
            idTables: [
                { type: String }
            ]
        }, {
            versionKey: false
        });
        // implement virtual method toJSON to delete _id field
        this.schema.set('toJSON', {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret._id;
                return ret;
            }
        });
    }
};
RoomModel = RoomModel_1 = __decorate([
    mongo_1.MongoModel({
        adapter: 'mongoose',
        collection: 'rooms',
        options: config_1.Config.get('mongodb')
    }),
    __metadata("design:paramtypes", [mongo_1.MongoClientService])
], RoomModel);
exports.RoomModel = RoomModel;
var RoomModel_1;
//# sourceMappingURL=room.model.js.map