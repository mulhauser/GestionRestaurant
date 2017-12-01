import { Model, MongoClientService, MongoModel } from '@hapiness/mongo';
import { Config } from '@hapiness/config';

@MongoModel({
    adapter: 'mongoose',
    collection: 'dishes',
    options: Config.get('mongodb')
})
export class DishModel extends Model {
    // property to store schema
    readonly schema: any;
    readonly childSchema: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        // call parent constructor
        super(DishModel);

        // get dao
        const dao = this._mongoClientService.getDao(this.connectionOptions);

        this.childSchema = new dao.Schema({
            ref: { type: String, required: true },
            quantityUse: { type: Number, required: true }
        }, {
            versionKey: false
        });
        this.childSchema.set('toJSON', {
                virtuals: true,
                transform: function (doc, ret) {
                    delete ret._id;
                    delete ret.id;
                    return ret;
                }
            }
        );

        // create schema
        this.schema = new dao.Schema({
            name: { type: String, required: true },
            price: { type: Number, required: true },
            ingredients: [
                { type: this.childSchema, required: true }
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
            }
        );
    }
}
