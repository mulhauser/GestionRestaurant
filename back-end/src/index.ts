import { HapiConfig, Hapiness, HttpServerExt } from '@hapiness/core';
import { LoggerExt } from '@hapiness/logger';

import { ApplicationModule } from './application.module';
import {MongoClientExt} from '@hapiness/mongo';
import {Config} from '@hapiness/config';

// bootstrap application
Hapiness.bootstrap(ApplicationModule, [
    LoggerExt,
    HttpServerExt.setConfig(Config.get<HapiConfig>('server')),
    MongoClientExt.setConfig({
        load: [
            {
                name: 'mongoose',
                config: Config.get('mongodb')
            }
        ]
    })
])
    .catch(err => console.log(err));
