import { Hapiness, HttpServerExt } from '@hapiness/core';
import { LoggerExt } from '@hapiness/logger';

import { ApplicationModule } from './application.module';

// bootstrap application
Hapiness.bootstrap(ApplicationModule, [
    LoggerExt,
    HttpServerExt.setConfig({ host: '0.0.0.0', port: 4443 })
])
    .catch(err => console.log(err));
