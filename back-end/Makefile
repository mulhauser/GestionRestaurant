pretest:
	@node ./node_modules/.bin/tslint -p ./tsconfig.json "./src/**/*.ts" "./test/**/*.ts"
tsc:
	@node ./node_modules/.bin/tsc -p ./tsconfig.build.json
clean:
	@node ./node_modules/.bin/rimraf ./dist
packaging:
	@node ./node_modules/.bin/ts-node ./tools/packaging.ts
clean-dev:
	@node ./node_modules/.bin/rimraf ./dev && ./node_modules/.bin/ts-node ./tools/init-dev.ts
build-dev:
	@node ./node_modules/.bin/nodemon -q -e ts -w src -x "./node_modules/.bin/tslint -p ./tsconfig.dev.json \"./src/**/*.ts\" && ./node_modules/.bin/tsc -p ./tsconfig.dev.json || true"
run-dev:
	@node ./node_modules/.bin/nodemon -q -x "node ./dev/index.js || true"

.PHONY: pretest tsc clean packaging clean-dev build-dev run-dev