install:
	npm install

start:
	npx babel-node src/bin/gendiff.js

publish:
	npm publish --dry-run

test:
	npm test

watch:
	npm test --watch
	
lint:
	npx eslint .