import { Model, MongoClientService, MongoModel } from '@hapiness/mongo';
import { Config } from '@hapiness/config';

@MongoModel({
    adapter: 'mongoose',
    collection: 'orders',
    options: Config.get('mongodb')
})

export class OrderModel extends Model {
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
        super(OrderModel);

        // get dao
        const dao = this._mongoClientService.getDao(this.connectionOptions);

        this.childSchema = new dao.Schema({
                ref: { type: String, required: true },
                name: { type: String, required: true },
            },
            { versionKey: false }
        );

        // create schema
        this.schema = new dao.Schema({
            name: { type: String, required: true },
            tableId: { type: String, required: true },
            isServed: { type: Boolean, required: true },
            isPayed: { type: Boolean, required: true },
            orderDate: { type: Date, required: true },
            serveDate: Date,
            dishes: [
                {
                    type: new dao.Schema({
                            ref: { type: String, required: true },
                            name: { type: String, required: true },
                        },
                        { versionKey: false }
                    ).set('toJSON', {
                            virtuals: true,
                            transform: function (doc, ret) {
                                delete ret._id;
                                delete ret.id;
                                return ret;
                            }
                        }
                    )
                    , required: true }
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
