<template>
  <div ref="imgconainer">
    <img ref="image"
         width="100%"
         height="100%"
         @click="loadimg" />
    <input type="file"
           ref="input"
           class="theinput"
           accept="image/*"
           @change="changefile" />
  <div>
    <small>{{name}}</small>
  </div>
  <div>
    <small>{{legenda}}</small>
  </div>
  </div>
</template>
<style scoped>
input.theinput {
  display: none
}
</style>
<script>
const fs = require("fs")
module.exports = {
  // vue-img-upload
  name: "VueImgUpload",
  props: {
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
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: "",
      dataimg: undefined,
      noimg: "data:image/svg+xml;base64," + fs.readFileSync(__dirname + "/ic_account_circle_black_24px.svg", "base64")
    }
  },
  mounted() {
    let attr = document.createAttribute("style")
    attr.value = `width:${this.width};height:${this.height}`
    this.$refs["imgconainer"].setAttributeNode(attr)
    this.$refs["image"].src = this.noimg
  },
  methods: {
    loadimg() {
      this.$refs["input"].click()
    },
    changefile() {
      console.log("changefile")
      let file = this.$refs["input"].files[0]
      this.dataimg = URL.createObjectURL(file)
      this.$refs["image"].src = this.dataimg
      this.name=file.name
      console.log(this.$refs["image"])
    }
  }
}
</script>