
clean:
	rm -rf docs/ic_account_circle_black_24px.svg
	rm -rf docs/build.js
	rm -rf dist
	mkdir dist

build: clean
	browserify src/main.js -o dist/build.js
	cp src/vue-img-upload.vue dist/vue-img-upload.vue
	cp src/ic_account_circle_black_24px.svg dist/ic_account_circle_black_24px.svg

docs: clean
	browserify docs/index.js -o docs/build.js
	