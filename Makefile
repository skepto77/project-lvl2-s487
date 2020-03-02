install:
	npm install

start:
	npx babel-node dist/bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .