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
    <div ref="updialog"
         class="thedialog">
      <button class="fecha"
              @click="canceladialog">
        <h1>X</h1>
      </button>
      <canvas ref="thecanvas"
              class="thecanvas"></canvas>
    </div>
  </div>
</template>

<script>
const fs = require("fs")
const axios = require("axios")
const resizetool = require("./resizetool")
module.exports = {
  name: "VueImgDialogUpload",
  props: {
    url: String,
    headers: Object,
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
    img: {
      type: String,
      default: this.noimg
    }
  },
  data() {
    return {
      name: "",
      dataimg: undefined,
      noimg: "data:image/svg+xml;base64," + fs.readFileSync(__dirname + "/no-img.svg", "base64")
    }
  },
  mounted() {
    this.dataimg = this.img
    if (this.dataimg == null)
      this.dataimg = this.noimg
    this.ajustaimagem()
  },
  methods: {
    ajustaimagem() {
      const attr = document.createAttribute("style")
      attr.value = `width:${this.width};height:${this.height};`
      this.$refs["imgconainer"].setAttributeNode(attr)
      this.$refs["image"].src = this.dataimg
    },
    loadimg() {
      this.$refs["input"].click()
    },
    changefile() {
      let file = this.$refs["input"].files[0]
      if (!file) {
        // silent french exit
        return
      }
      this.name = file.name
      this.dataimg = URL.createObjectURL(file)
      this.ajustaimagem()
      this.$emit("onchangefile", { file, image: this.$refs["image"] })
      this.preparedialog()
    },
    preparedialog() {

      this.$refs["updialog"].style.display = "block"

      const w = window.innerWidth
      const h = window.innerHeight
      const cw = document.createAttribute("width")
      const ch = document.createAttribute("height")
      // always draw a square
      cw.value = ch.value = w < h ? w : h
      this.$refs["thecanvas"].setAttributeNode(cw)
      this.$refs["thecanvas"].setAttributeNode(ch)

      this.desenhaimg()
    },
    desenhaimg() {
      const ctx = this.$refs["thecanvas"].getContext("2d")
      ctx.drawImage(this.$refs["image"], 0, 0)

      console.log("foo")
    },
    canceladialog() {
      this.$refs['updialog'].style.display = 'none'
      this.dataimg = this.noimg
      this.ajustaimagem()
    }
  }
};
</script>

<style scoped>
.thedialog {
  position: fixed;
  display: none;
  background-color: white;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 9999;
  overflow: hidden;
}

.thedialog>button.fecha {
  position: fixed;
  right: 20px;
  top: 20px;
}

.thedialog>canvas.thecanvas {
  position: fixed;
  border: 1px groove black;
}

input.theinput {
  display: none
}
</style>
