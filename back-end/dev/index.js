"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@hapiness/core");
const logger_1 = require("@hapiness/logger");
const application_module_1 = require("./application.module");
// bootstrap application
core_1.Hapiness.bootstrap(application_module_1.ApplicationModule, [
    logger_1.LoggerExt,
    core_1.HttpServerExt.setConfig({ host: '0.0.0.0', port: 4443 })
])
    .catch(err => console.log(err));
//# sourceMappingURL=index.js.map