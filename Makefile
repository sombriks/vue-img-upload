
clean:
	rm -rf docs/build.js
	rm -rf dist
	mkdir dist

docs: clean
	browserify docs/index.js -o docs/build.js

dev:
	budo docs/index.js:build.js -o -l -d docs -H 127.0.0.1
