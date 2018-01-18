
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
  render: f => f(require("./index.vue")),
  router: new VueRouter({
    routes: [
      { path: "/", redirect: "/00-start" },
      { path: "/00-start", component: require("./features/00-start.vue") },
      { path: "/01-basic", component: require("./features/01-basic.vue") },
      { path: "/02-resize-px", component: require("./features/02-resize-px.vue") },
      { path: "/03-resize-pct", component: require("./features/03-resize-pct.vue") },
      { path: "/04-upload", component: require("./features/04-upload.vue") },
      { path: "/05-orientation", component: require("./features/05-orientation.vue") },
      { path: "/06-default-img", component: require("./features/06-default-img.vue") },
      { path: "/07-dialog", component: require("./features/07-dialog.vue") },
      { path: "/99-roadmap", component: require("./features/99-roadmap.vue") },
    ]
  }),
})
