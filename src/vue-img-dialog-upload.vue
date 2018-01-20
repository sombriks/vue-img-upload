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
      </div>
      <img :src="cancelimg" class="dialogcancelimg" @click="closedialog" />
      <img :src="okimg" class="dialogokimg" @click="savecrop" />
    </div>
  </div>
</template>
<script>
const fs = require("fs");
const axios = require("axios");
const resizetool = require("./resizetool");
const Croppie = require("croppie");

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
    file: undefined,
    dataimg: undefined,
    cropper: undefined,
    dialogdata: undefined,
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
    this.checkcnvsize();
  },
  methods: {
    resetfile() {
      this.file = null;
      this.dataimg = null;
      this.dialogdata = null;
      if (this.cropper) {
        this.cropper.destroy();
        this.cropper = null;
      }
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
      this.$nextTick(_ => {
        this.$emit("onchangefile", { file, image: this.$refs["image"] });
      });
      resizetool.resize(file, this.cwidth + "px").then(ret => {
        this.dialogdata = ret;
        let imgpane = this.$refs["imgpane"];
        this.cropper = new Croppie(imgpane, {
          url: this.dialogdata,
          viewport: { width: this.cwidth * 0.55, height: this.cheight * 0.55 },
          showZoomer: true,
          enableExif: true,
          maxZoom: 3
        });
        this.$refs["thedialog"].style.display = "block";
      });
    },
    closedialog() {
      this.$refs["thedialog"].style.display = "none";
      this.resetfile();
      // rootcanvas.innerHTML = "";;
    },
    savecrop() {
      this.cropper.result("base64").then(ret => {
        this.cropper.destroy();
        this.cropper = null;
        this.dataimg = ret;
        this.$refs["thedialog"].style.display = "none";
        this.$emit("onimagechange", { file: this.file, dataimg: this.dataimg });
        this.dotheupload();
      });
    },
    dotheupload() {
      if (this.url) {
        // le's trust the image, not the file
        let img = this.$refs["image"];
        let file = this.file;
        const headers = {
          "Content-Type": file.type || "image/jpeg",
          "X-Filename": file.name
        };
        if (this.headers) {
          for (let k in this.headers) headers[k] = this.headers[k];
        }
        axios[this.method](this.url, resizetool.mkjpeg(this.dataimg), {
          headers
        })
          .then(ret =>
            this.$nextTick(_ =>
              this.$emit("onupload", { file, image: this.$refs["image"], ret })
            )
          )
          .catch(err => {
            this.$nextTick(_ =>
              this.$emit("onuploaderror", {
                file,
                image: this.$refs["image"],
                err
              })
            );
          });
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
.dialogokimg,
.dialogcancelimg {
  position: absolute;
  max-width: 40px;
  max-height: 40px;
  top: -20px;
  right: -20px;
  /* background-color:white; */
}
.dialogcancelimg {
  top: 0px;
  right: 30px;
  z-index: 999999;
}
.dialogokimg {
  top: 0px;
  left: 30px;
  z-index: 999999;
}
.thedialog {
  display: none;
  z-index: 999998;
  position: absolute;
  background-color: white;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
.dialogpane {
  width: 100%;
  height: 100%;
}
.imgpane {
  /* position: absolute; */
  /* top: 40px; */
  /* left: 40px; */
  /* right: 40px; */
  border: 1px groove black;
}
</style>
