
const Vue = require("vue")
// const VueImgUpload = require("../dist/build")
const VueImgUpload = require("../src/main")
Vue.use(VueImgUpload)

new Vue({
  el: "#mountpoint",
  render: (f) => f(require("./docs.vue"))
})
