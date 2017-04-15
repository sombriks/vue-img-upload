
const Vue = require("vue")
const VueImgUpload = require("../dist/build")
// const VueImgUpload = require("../src/main")
Vue.use(VueImgUpload)

require("../node_modules/flexboxgrid/css/flexboxgrid.css")

new Vue({
  el: "#mountpoint",
  render: (f) => f(require("./docs.vue"))
})
