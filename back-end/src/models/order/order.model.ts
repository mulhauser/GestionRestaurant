import { Model, MongoClientService, MongoModel } from '@hapiness/mongo';
import { Config } from '@hapiness/config';
import { TableModel } from '../index';
import { DishModel } from '../dish/dish.model';

@MongoModel({
    adapter: 'mongoose',
    collection: 'orders',
    options: Config.get('mongodb')
})

export class OrderModel extends Model {
    // property to store schema
    readonly schema: any;

    /**
     * Class constructor
     *
     * @param {MongoClientService} _mongoClientService
     */
    constructor(private _mongoClientService: MongoClientService) {
        // call parent constructor
        super(OrderModel);

        // get dao
        const dao = this._mongoClientService.getDao(this.connectionOptions);

        // create schema
        this.schema = new dao.Schema({
            table: [{ type: Object, ref: TableModel, required: true }],
            isServed: { type: Boolean, required: true },
            isPayed: { type: Boolean, required: true },
            orderDate: { type: Date, required: true },
            serveDate: Date,
            dishes: [{ type: Object, ref: DishModel }]
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
