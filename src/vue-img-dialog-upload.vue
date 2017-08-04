<template>
  <div>
    <img ref="image"
         width="100%"
         height="100%"
         @click="opendialog" />
    <input type="file"
           ref="input"
           class="theinput"
           accept="image/*"
           @change="changefile" />
    <div ref="dialog"
         class="thedialog">
  
    </div>
  </div>
</template>

<script>
module.exports = {
  name: "VueImgDialogUpload",
  props: {
    url: String,
    headers: Object,
    resize: String,
    width: {
      type: String,
      default: "auto"
    },
    height: {
      type: String,
      default: "auto"
    },
    legenda: {
      type: String,
      default: "Toque a imagem para alterar"
    },
    method: {
      type: String,
      default: "post"
    },
    orientation: {
      type: String,
      default: "any"
    },
    img: {
      type: String,
      default: this.noimg
    }
  },
  created() {

  },
  methods: {
    opendialog() { },
    changefile() { }
  }
};
</script>

<style>
.thedialog {
  display: none;
}
</style>
