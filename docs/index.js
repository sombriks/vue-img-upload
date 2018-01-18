
require("./index.css")

const Vue = require("vue")

const VueRouter = require("vue-router")
Vue.use(VueRouter)

const VueImgUpload = require("../src/main")
Vue.use(VueImgUpload)

Vue.component("doc-menu", require("./components/doc-menu.vue"))
Vue.component("code-preview", require("./components/code-preview.vue"))

const vm = new Vue({
  el: "#mountpoint",
  render: f => f(require("./index.vue"))
})
