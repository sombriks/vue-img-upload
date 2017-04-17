
clean:
	rm -rf dist  
	mkdir dist 
	
build: clean
	browserify src/main.js -o dist/build.js
	cp src/vue-img-upload.vue dist/vue-img-upload.vue
	cp src/ic_account_circle_black_24px.svg dist/ic_account_circle_black_24px.svg
