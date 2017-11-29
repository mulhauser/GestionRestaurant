import {Model, MongoClientService, MongoModel} from '@hapiness/mongo';
import {Config} from '@hapiness/config';

@MongoModel({
    adapter: 'mongoose',
    collection: 'peoples',
    options: Config.get('mongodb')
})

export class PeopleModel extends Model {
    readonly schema: any;

    constructor(private _mongoClientService: MongoClientService) {
        super(PeopleModel);

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
}
