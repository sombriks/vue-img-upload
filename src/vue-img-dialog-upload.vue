<template>
  <div ref="imgconainer">
    <div class="theimgcontainer">
      <img v-if="!dataimg" :src="img ? img : noimg" width="100%" height="100%" class="theimg" @click="loadimg" />
      <img v-if="dataimg" :src="dataimg" ref="image" width="100%" height="100%" class="theimg" />
      <img v-if="dataimg" :src="cancelimg" class="cancelimg" @click="resetfile" />
      <input type="file" ref="input" class="theinput" accept="image/*" @change="changefile" />
      <div v-if="!dataimg" class="legenda" @click="loadimg">
        <small>{{legenda}}</small>
      </div>
      <div v-if="file">
        <small @click="loadimg">{{file.name}}</small>
      </div>
    </div>
    <div ref="thedialog" class="thedialog">
      <div class="dialogpane">
        <canvas ref="imgpane" :width="cwidth" :height="cheight" class="imgpane"></canvas>
        <img :src="cancelimg" class="dialogcancelimg" @click="closedialog" />
      </div>
    </div>
  </div>
</template>
<script>
const fs = require("fs");
const axios = require("axios");
const resizetool = require("./resizetool");
const Hammer = require("hammerjs");
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
  data: _ => ({
    imx: 0,
    imy: 0,
    cwidth: 240,
    cheight: 320,
    mc: undefined,
    file: undefined,
    cnvimg: undefined,
    dataimg: undefined,
    noimg:
      "data:image/svg+xml;base64," +
      fs.readFileSync(__dirname + "/no-img.svg", "base64"),
    cancelimg:
      "data:image/svg+xml;base64," +
      fs.readFileSync(__dirname + "/cancel-img.svg", "base64"),
    okimg:
      "data:image/svg+xml;base64," +
      fs.readFileSync(__dirname + "/ok-img.svg", "base64")
  }),
  mounted() {
    let attr = document.createAttribute("style");
    attr.value = `width:${this.width};height:${this.height};`;
    this.$refs["imgconainer"].setAttributeNode(attr);

    this.mc = new Hammer(this.$refs["imgpane"]);

    this.mc.get("pinch").set({ enable: true });
    this.mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });

    this.mc.on("pinch", e => this.pinchimg(e));
    this.mc.on("pan", e => this.panimg(e));
    this.checkcnvsize();
  },
  methods: {
    resetfile() {
      this.file = null;
      this.dataimg = null;
      this.$refs["input"].type = "";
      this.$refs["input"].type = "file";
    },
    loadimg() {
      this.resetfile();
      this.$refs["input"].click();
    },
    checkcnvsize() {
      let w = window.innerWidth;
      let h = window.innerHeight;
      // we need a square
      let portrait = w > h;
      let landscape = h >= w;
      if (landscape) h = w;
      if (portrait) w = h;
      this.cwidth = w;
      this.cheight = h;
    },
    changefile() {
      this.file = this.$refs["input"].files[0];
      let file = this.file;
      if (!file) {
        // silent french exit
        return;
      }
      this.dataimg = URL.createObjectURL(this.file);
      this.cnvimg = new Image();
      this.cnvimg.onload = _ => {
        let imgpane = this.$refs["imgpane"];
        this.imx = 0;
        this.imy = 0;
        imgpane.getContext("2d").drawImage(this.cnvimg, this.imx, this.imy);
      };
      this.cnvimg.src = this.dataimg;
      this.$refs["thedialog"].style.display = "block";
    },
    closedialog() {
      this.$refs["thedialog"].style.display = "none";
      this.resetfile();
      // rootcanvas.innerHTML = "";;
    },
    pinchimg(e) {
      console.log(e);
    },
    panimg(e) {
      let imgpane = this.$refs["imgpane"];
      imgpane.getContext("2d").clearRect(0, 0, this.cwidth, this.cheight);
      this.imx += e.deltaX * 0.2;
      this.imy += e.deltaY * 0.2;
      imgpane.getContext("2d").drawImage(this.cnvimg, this.imx, this.imy);
      console.log(e);
    }
  }
};
</script>
<style scoped>
.theimgcontainer {
  position: relative;
}
.theimg {
  min-height: 100px;
}
input.theinput {
  display: none;
}
.legenda {
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
}
.cancelimg,
.dialogcancelimg {
  position: absolute;
  max-width: 40px;
  max-height: 40px;
  top: -20px;
  right: -20px;
}
.dialogcancelimg {
  top: 0px;
  right: 30px;
}
.thedialog {
  display: none;
  z-index: 999999;
  position: absolute;
  background-color: white;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
.imgpane {
  position: absolute;
  top: 35px;
  left: 0px;
  right: 0px;
  /* border: 1px groove black; */
}
</style>
