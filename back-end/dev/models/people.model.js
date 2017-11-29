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
let PeopleModel = PeopleModel_1 = class PeopleModel extends mongo_1.Model {
    constructor(_mongoClientService) {
        super(PeopleModel_1);
        this._mongoClientService = _mongoClientService;
        const dao = this._mongoClientService.getDao(this.connectionOptions);
        this.schema = new dao.Schema({
            photo: String,
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            email: { type: String, required: true, match: '[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}' },
            phone: { type: String, required: true },
            nested: {
                address: {
                    street: { type: String, required: true },
                    postalCode: { type: Number, required: true },
                    city: { type: String, required: true }
                }
            }
        }, {
            versionKey: false
        });
        this.schema.set('toJSON', {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret._id;
                return ret;
            }
        });
    }
};
PeopleModel = PeopleModel_1 = __decorate([
    mongo_1.MongoModel({
        adapter: 'mongoose',
        collection: 'peoples',
        options: config_1.Config.get('mongodb')
    }),
    __metadata("design:paramtypes", [mongo_1.MongoClientService])
], PeopleModel);
exports.PeopleModel = PeopleModel;
var PeopleModel_1;
//# sourceMappingURL=people.model.js.map