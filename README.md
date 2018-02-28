# vue-img-upload

yet another vue image upload component

- [preview](https://sombriks.github.io/vue-img-upload/)
- [available on npm](https://www.npmjs.com/package/vue-img-upload)
- single image per tag
- offer resize options
- offer basic portrait/landscape support
- offer direct upload options
- **accepting PR's**

## Installation

```bash
 npm install croppie --save
// all othe dependecies
npm install vue-img-upload --save
```

## Basic usage

```javascript
require("../node_modules/croppie/croppie.css")

const VueImgUpload = require("vue-img-upload")
Vue.use(VueImgUpload)
// now you can use either vue-img-ipload or vue-img-dialog-upload components on your application
```

## TODO 

- see how to make it dance well with browserify and webpack. just browserify for the moment
- make it even simpler
- ~server side project to test upload capabilities~ see https://github.com/sombriks/viu-up-tester

## Copyright

- MIT license
