
const VueImgUpload = require("./vue-img-upload.vue")

module.exports = {
  install(Vue, opts) {
    Vue.component("vue-img-upload", VueImgUpload)
  },
  component: VueImgUpload
}