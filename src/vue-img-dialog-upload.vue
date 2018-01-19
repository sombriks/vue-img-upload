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
        <div ref="imgpane" class="imgpane"></div>
        <img :src="cancelimg" class="dialogcancelimg" @click="closedialog" />
      </div>
    </div>
  </div>
</template>
<script>
const fs = require("fs");
const axios = require("axios");
const resizetool = require("./resizetool");
const PIXI = require("pixi.js");
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
    mc: undefined,
    file: undefined,
    pixiapp: undefined,
    piximg: undefined,
    dataimg: undefined,
    dragging: false,
    dragdata: undefined,
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
    this.mc.get("rotate").set({ enable: true });
    this.mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    this.mc.get("swipe").set({ direction: Hammer.DIRECTION_VERTICAL });
    this.mc.on("pinch", e => this.pinchimg(e));
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
    changefile() {
      this.file = this.$refs["input"].files[0];
      let file = this.file;
      if (!file) {
        // silent french exit
        return;
      }
      this.dataimg = URL.createObjectURL(this.file);
      this.$refs["thedialog"].style.display = "block";
      let rootcanvas = this.$refs["imgpane"];
      let w = window.innerWidth;
      let h = window.innerHeight;
      // we need a square
      let portrait = w > h;
      let landscape = h >= w;
      if (landscape) h = w;
      if (portrait) w = h;
      this.pixiapp = new PIXI.Application(w, h, { backgroundColor: 0xf0f0f0 });
      rootcanvas.appendChild(this.pixiapp.view);

      this.piximg = PIXI.Sprite.fromImage(this.dataimg);
      this.piximg.anchor.set(0.5);
      this.piximg.x = w/2;
      this.piximg.y = h/2;
      this.piximg.interactive = true;
      this.piximg.buttonMode = true;
      this.piximg
        .on("pointerdown", this.onDragStart)
        .on("pointerup", this.onDragEnd)
        .on("pointerupoutside", this.onDragEnd)
        .on("pointermove", this.onDragMove);
      this.pixiapp.stage.addChild(this.piximg);
    },
    closedialog() {
      this.$refs["thedialog"].style.display = "none";
      this.resetfile();
      let rootcanvas = this.$refs["imgpane"];
      if (this.pixiapp) {
        this.pixiapp.destroy();
        this.pixiapp = null;
        this.piximg = null;
        rootcanvas.innerHTML = "";
      }
    },
    pinchimg(e) {
      const piximg = this.piximg;
      if (!piximg) return;
    },
    onDragStart(e) {
      this.dragging = true;
      this.dragdata = e.data;
    },
    onDragEnd(e) {
      this.dragging = false;
      this.dragdata = undefined;
    },
    onDragMove(e) {
      if (this.dragging) {
        let xy = this.dragdata.getLocalPosition(this.piximg.parent);
        this.piximg.x = xy.x;
        this.piximg.y = xy.y;
      }
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
  top: 30px;
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
  left: 0px;
  right: 0px;
  /* border: 1px groove black; */
}
</style>
