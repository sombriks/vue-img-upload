
const VueImgUpload = require("./vue-img-upload.vue")

module.exports = {
  install: (Vue, opts) => {
    console.log("Installing vue-img-upload")
    Vue.component("vue-img-upload", VueImgUpload)
  },
  component: VueImgUpload
}