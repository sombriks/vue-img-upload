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
      <div ref="toolbox"
           class="toolbox">
  
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
      sx: 0,
      sy: 0,
      rot: 0,
      zoom: 1,
      name: "",
      dragging: false,
      dataimg: undefined,
      lastmouse: undefined,
      lasttouch1: undefined,
      lasttouch2: undefined,
      noimg: "data:image/svg+xml;base64," + fs.readFileSync(__dirname + "/no-img.svg", "base64")
    }
  },
  mounted() {
    this.dataimg = this.img
    if (this.dataimg == null)
      this.dataimg = this.noimg
    const cnv = this.$refs["thecanvas"]
    cnv.addEventListener("touchstart", this.touchstart)
    cnv.addEventListener("touchmove", this.touchmove)
    cnv.addEventListener("touchend", this.touchend)
    cnv.addEventListener("mousedown", this.touchstart)
    cnv.addEventListener("mousemove", this.mousemove)
    cnv.addEventListener("wheel", this.wheel)
    cnv.addEventListener("mouseup", this.touchend)
    this.ajustaimagem()
  },
  methods: {
    touchstart(ev) {
      this.dragging = true
    },
    touchmove(ev) {
      if (this.dragging) {
        if (!this.lasttouch2)
          this.lasttouch2 = ev.touches[1]
        if (!this.lasttouch1) {
          this.lasttouch1 = ev.touches[0]
        } else {
          console.log(ev)
          const dx = this.lasttouch1.clientX - ev.touches[0].clientX
          const dy = this.lasttouch1.clientY - ev.touches[0].clientY
          this.dothemove(dx, dy)
          if (ev.touches[1]) {
            const ex = this.lasttouch2.clientX - ev.touches[1].clientX
            const ey = this.lasttouch2.clientY - ev.touches[1].clientY
            this.dothepinch(ex, ey)
          }
          this.lasttouch1 = ev.touches[0]
          this.lasttouch2 = ev.touches[1]
          this.desenhaimg()
        }
      }
    },
    mousemove(ev) {
      if (this.dragging) {
        if (!this.lastmouse) {
          this.lastmouse = ev
        } else {
          const dx = this.lastmouse.clientX - ev.clientX
          const dy = this.lastmouse.clientY - ev.clientY
          this.dothemove(dx, dy)
          this.lastmouse = ev
          this.desenhaimg()
        }
      }
    },
    dothemove(dx, dy) {
      // then we check rot, since it's very important thing to check
      if (this.rot == 0) {
        this.sx += dx
        this.sy += dy
      } else if (this.rot == 0.5) {
        this.sx += dy
        this.sy -= dx
      } else if (this.rot == 1) {
        this.sx -= dx
        this.sy -= dy
      } else if (this.rot == 1.5) {
        this.sx -= dy
        this.sy += dx
      }
    },
    dothepinch(ex, ey) {
      if (ex > 0 || ey < 0)
        this.afasta()
      else if (ex < 0 || ey > 0)
        this.aproxima()
    },
    wheel(ev) {
      console.log(ev)
      if (ev.deltaY < 0)
        this.aproxima()
      if (ev.deltaY > 0)
        this.afasta()
    },
    touchend(ev) {
      this.dragging = false
      this.lastmouse = null
      this.lasttouch1 = null
      this.lasttouch2 = null
    },
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
      const cnv = this.$refs["thecanvas"];
      const w = window.innerWidth
      const h = window.innerHeight
      const cw = document.createAttribute("width")
      const ch = document.createAttribute("height")
      const isportrait = w < h
      // always draw a square
      cw.value = ch.value = isportrait ? w : h
      cnv.setAttributeNode(cw)
      cnv.setAttributeNode(ch)
      cnv.style[isportrait ? "top" : "left"] = (isportrait ? (h - w) / 2 : (w - h) / 2) + "px"
      cnv.style[isportrait ? "left" : "top"] = "0px"
      const box = this.$refs["toolbox"]
      box.style[isportrait ? "top" : "left"] = (isportrait ? (h - w) / 2 : (w - h) / 2) + "px"
      box.style[isportrait ? "left" : "top"] = "0px"
      box.style.width = (isportrait ? w : h) + "px"
      box.style.height = "3em"

      this.desenhaimg()
    },
    desenhaimg() {
      const theimg = new Image()
      theimg.onload = _ => {
        const cnv = this.$refs["thecanvas"]
        const ctx = cnv.getContext("2d")
        const cw2 = cnv.width / 2
        const ch2 = cnv.height / 2
        ctx.fillStyle = "white"
        ctx.save()
        ctx.translate(cw2, ch2)
        ctx.rotate(this.rot * Math.PI)
        ctx.fillRect(-cw2, -ch2, cnv.width, cnv.height)
        // let's blit the canvas! https://en.wikipedia.org/wiki/Blitter
        ctx.drawImage(
          theimg, // data data data
          this.sx + cw2, // source coords on data
          this.sy + ch2,
          cnv.width * this.zoom, // size obeys destiny to avoid deformatons
          cnv.height * this.zoom,
          -cw2, // destiny coords to land data data data
          -ch2,
          cnv.width, // destiny area to paint
          cnv.height
        )
        ctx.restore()
      }
      theimg.src = this.dataimg
    },
    aproxima() {
      this.zoom -= 0.1
      this.desenhaimg()
    },
    afasta() {
      this.zoom += 0.1
      this.desenhaimg()
    },
    giraesquerda() {
      this.rot = (this.rot + 1.5) % 2;
      this.desenhaimg()
    },
    giradireita() {
      this.rot = (this.rot + 0.5) % 2;
      this.desenhaimg()
    },
    aceita() {
      // Só salva e vai embora
      this.dataimg = this.$refs["thecanvas"].toDataURL("image/jpeg", 0.75)
      this.$refs['updialog'].style.display = 'none'
      this.$refs["image"].src = this.dataimg
      this.$emit("onimagechange", { file: this.$refs["input"].files[0], image: this.dataimg })
      if (this.resize) {
        this.resizeimage()
      }
    },
    canceladialog() {
      this.$refs['updialog'].style.display = 'none'
      this.dataimg = this.noimg
      this.ajustaimagem()
    },
    resizeimage() {
      resizetool.resizedataimg(this.dataimg, this.resize).then(ret => {
        this.dataimg = ret // preview
        this.$refs["image"].src = this.dataimg
        this.$emit("resizeimage", { file: this.file[0], image: this.$refs["image"] })
        this.dotheupload()
      })
    },
    dotheupload() {
      if (this.url) {
        // le's trust the image, not the file
        let img = this.$refs["image"]
        let file = this.$refs["input"].files[0]
        const headers = {
          "Content-Type": file.type || "image/jpeg",
          "X-Filename": file.name
        }
        if (this.headers) {
          for (let k in this.headers)
            headers[k] = this.headers[k]
        }
        axios[this.method](this.url, resizetool.mkjpeg(this.dataimg), { headers }).then((ret) => {
          this.$emit("onupload", { file, image: this.$refs["image"], ret })
        }).catch(err => {
          this.$emit("onuploaderror", { file, image: this.$refs["image"], err })
        })
      }
    }
  },
  watch: {
    img(val) {
      if (!this.dataimg) {
        this.$refs["image"].src = val
        this.$emit("onchangeimg", val)
      }
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
  z-index: 99999;
  overflow: hidden;
}

.thedialog>canvas.thecanvas {
  position: fixed;
  border: 1px groove black;
}

.thedialog>div.toolbox {
  position: fixed;
}

.thedialog>div.toolbox>button {
  width: 15%;
}

input.theinput {
  display: none
}
</style>
