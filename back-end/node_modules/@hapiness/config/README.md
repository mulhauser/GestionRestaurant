<img src="http://bit.ly/2mxmKKI" width="500" alt="Hapiness" />

<div style="margin-bottom:20px;">
<div style="line-height:60px">
    <a href="https://travis-ci.org/hapinessjs/config.svg?branch=master">
        <img src="https://travis-ci.org/hapinessjs/config.svg?branch=master" alt="build" />
    </a>
    <a href="https://coveralls.io/github/hapinessjs/config?branch=master">
        <img src="https://coveralls.io/repos/github/hapinessjs/config/badge.svg?branch=master" alt="coveralls" />
    </a>
    <a href="https://david-dm.org/hapinessjs/config">
        <img src="https://david-dm.org/hapinessjs/config.svg" alt="dependencies" />
    </a>
    <a href="https://david-dm.org/hapinessjs/config?type=dev">
        <img src="https://david-dm.org/hapinessjs/config/dev-status.svg" alt="devDependencies" />
    </a>
</div>
<div>
    <a href="https://www.typescriptlang.org/docs/tutorial.html">
        <img src="https://cdn-images-1.medium.com/max/800/1*8lKzkDJVWuVbqumysxMRYw.png"
             align="right" alt="Typescript logo" width="50" height="50" style="border:none;" />
    </a>
    <a href="http://reactivex.io/rxjs">
        <img src="http://reactivex.io/assets/Rx_Logo_S.png"
             align="right" alt="ReactiveX logo" width="50" height="50" style="border:none;" />
    </a>
    <a href="http://hapijs.com">
        <img src="http://bit.ly/2lYPYPw"
             align="right" alt="Hapijs logo" width="75" style="border:none;" />
    </a>
</div>
</div>

# Hapiness Config

Configuration module based on [node-config](https://github.com/lorenwest/node-config) & [js-yaml](https://github.com/nodeca/js-yaml) libraries.

## Table of contents

* [Using config module](#using-config-module)
    * [Yarn or NPM it in your package.json](#yarn-or-npm-it-in-your-packagejson)
    * [Standalone](#standalone)
    * [Hapiness](#hapiness)
* [Change History](#change-history)
* [Maintainers](#maintainers)
* [License](#license)

## Using config module

### `yarn` or `npm` it in your `package.json`

```bash
$ npm install --save @hapiness/core @hapiness/config rxjs

or

$ yarn add @hapiness/core @hapiness/config rxjs
```

```javascript
"dependencies": {
    "@hapiness/core": "^1.2.2",
    "@hapiness/config": "^1.1.0",
    "rxjs": "^5.5.2",
    //...
}
//...
```

### Standalone

`./config/default.yml`:

```yaml
my:
    config: test
```


`Node.js Script`:

```javascript
import { Config } from '@hapiness/config';

if (Config.has('my.config')) {
    console.log(Config.get('my.config')); // output: 'test'
}
```

### Hapiness

`./config/default.yml`:

```yaml
external_service:
    baseUrl: 'test'

mymodule_database:
    provider: postgresql
    hostname: localhost
    user: pguser
    password: keyboard cat
```

`Hapiness module`:

```javascript
// external-module.ts
  import {
    HapinessModule,
    CoreModuleWithProviders,
    InjectionToken,
    Inject,
    Optional,
  } from '@hapiness/core';

  import { ConfigHelper, ConfigInterface } from '@hapiness/config';

    @HapinessModule({
        ...
    })

    export class ExternalModule {
        static setConfig(config: ConfigInterface): CoreModuleWithProviders {
            return {
                module: ExternalModule,
                providers: [ConfigHelpers.getProvider('mymodule_database', config)]
            };
        }
    }

    export class Service {
      constructor(@Optional() @Inject(ConfigHelper.getInjectionToken('mymodule_database')) config) { // @Optional to not throw errors if config is not passed
        ...
      }
    }
```

```javascript

    // main-module.ts
    import {
      HapinessModule,
    } from '@hapiness/core';
    import { ExternalModule } from 'external-module';
    import { Config } from '@hapiness/config';

    @HapinessModule({
        ...
        imports: [ ExternalModule.setConfig(Config.get('mymodule_database')) ]
    })
    ...
```

`Hapiness service`:

```javascript

    // main-module.ts
    import {
      HapinessModule,
    } from '@hapiness/core';
    import { ConfigHelper, Config } from '@hapiness/config';
    import { MyCustomService } from './services';

    @HapinessModule({
        ...
        providers: [
            ConfigHelper.getProvider('external_service'),
            MyCustomService,
            ...
        ]
    })
    ...
```

```javascript
    import { Injectable } from '@hapiness/core';
    import { ConfigInterface } from '@hapiness/config';

    // my-custom-service.ts
    @Injectable()
    class MyCustomService {

        private _baseUrl: string;

        constrcutor(
            @Inject(ConfigHelper.getInjectionToken('external_service'))
            private _config: ConfigInterface
        ) {}

        connect() {
            this._baseUrl = this._config.get<string>('baseUrl');
        }

    }
    ...
```

[Back to top](#table-of-contents)

## Change History
* v1.1.0 (2017-11-20)
    * Latest packages' versions.
    * Documentation.
    * Change packaging process.
* v1.0.0 (2017-10-27)
    * Create `Config` module.
    * Tests module.
    * Documentation.
    * First stable version.

[Back to top](#table-of-contents)

## Maintainers

<table>
    <tr>
        <td colspan="4" align="center"><a href="https://www.tadaweb.com"><img src="http://bit.ly/2xHQkTi" width="117" alt="tadaweb" /></a></td>
    </tr>
    <tr>
        <td align="center"><a href="https://github.com/Juneil"><img src="https://avatars3.githubusercontent.com/u/6546204?v=3&s=117" width="117"/></a></td>
        <td align="center"><a href="https://github.com/antoinegomez"><img src="https://avatars3.githubusercontent.com/u/997028?v=3&s=117" width="117"/></a></td>
        <td align="center"><a href="https://github.com/reptilbud"><img src="https://avatars3.githubusercontent.com/u/6841511?v=3&s=117" width="117"/></a></td>
        <td align="center"><a href="https://github.com/njl07"><img src="https://avatars3.githubusercontent.com/u/1673977?v=3&s=117" width="117"/></a></td>
    </tr>
    <tr>
        <td align="center"><a href="https://github.com/Juneil">Julien Fauville</a></td>
        <td align="center"><a href="https://github.com/antoinegomez">Antoine Gomez</a></td>
        <td align="center"><a href="https://github.com/reptilbud">Sébastien Ritz</a></td>
        <td align="center"><a href="https://github.com/njl07">Nicolas Jessel</a></td>
    </tr>
</table>

[Back to top](#table-of-contents)

## License

Copyright (c) 2017 **Hapiness** Licensed under the [MIT license](https://github.com/hapinessjs/config/blob/master/LICENSE.md).

[Back to top](#table-of-contents)
