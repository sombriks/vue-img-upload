
const VueImgUpload = require(__dirname + "/vue-img-upload.vue")

module.exports = {
  install(vue, opts) {
    vue.component(VueImgUpload)
  },
  VueImgUpload
}