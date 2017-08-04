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
      <canvas ref="thecanvas"
              class="thecanvas"></canvas>
      <button class="fecha"
              @click="canceladialog">
        X
      </button>
      <button class="aproxima"
              @click="aproxima">
        +
      </button>
      <button class="afasta"
              @click="afasta">
        -
      </button>
      <button class="giraesquerda"
              @click="giraesquerda">
        &#8634;
      </button>
      <button class="giradireita"
              @click="giradireita">
        &#8635;
      </button>
      <button class="aceita"
              @click="aceita">
        &#10003;
      </button>
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
      const theimg = new Image()
      theimg.onload = _ => {
        const cnv = this.$refs["thecanvas"]
        const iw = theimg.width
        const ih = theimg.height
        const ctx = cnv.getContext("2d")
        ctx.drawImage(theimg, 0, 0, cnv.width, cnv.height, 0, 0, cnv.width, cnv.height)
      }
      theimg.src = this.dataimg
    },
    canceladialog() {
      this.$refs['updialog'].style.display = 'none'
      this.dataimg = this.noimg
      this.ajustaimagem()
    },
    aproxima() { },
    afasta() { },
    giraesquerda() { },
    giradireita() { },
    aceita() { },
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

.thedialog>button.fecha,
.thedialog>button.aproxima,
.thedialog>button.afasta,
.thedialog>button.giraesquerda,
.thedialog>button.giradireita,
.thedialog>button.aceita {
  position: fixed;
  width: 2em;
}

.thedialog>button.aproxima,
.thedialog>button.afasta,
.thedialog>button.giraesquerda,
.thedialog>button.giradireita,
.thedialog>button.aceita {
  left: 0.5em;
  top: 0.5em;
}

.thedialog>button.fecha {
  right: 2.5em;
  top: 0.5em;
}

.thedialog>button.afasta {
  top: 4em;
}

.thedialog>button.giraesquerda {
  top: 7.5em;
}

.thedialog>button.giradireita {
  top: 11em;
}

.thedialog>button.aceita {
  top: 14.5em;
}

.thedialog>canvas.thecanvas {
  position: fixed;
  border: 1px groove black;
}

input.theinput {
  display: none
}
</style>
