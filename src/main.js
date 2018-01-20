// component installation entry point
exports.install = (Vue, opts) => {
  Vue.component("vue-img-upload", require("./vue-img-upload.vue"))
  Vue.component("vue-img-dialog-upload", require("./vue-img-dialog-upload.vue"))
};
