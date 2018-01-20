<template>
  <div ref="imgconainer" class="theimgcontainer">
    <img v-if="!dataimg" :src="img ? img : noimg" width="100%" height="100%" class="theimg" @click="loadimg" />
    <img v-if="dataimg" :src="dataimg" ref="image" width="100%" height="100%" class="theimg" />
    <img v-if="dataimg" :src="cancelimg" class="cancelimg" @click="removeimg" />
    <input type="file" ref="input" class="theinput" accept="image/*" @change="changefile" />
    <div class="legenda" v-if="!dataimg" @click="loadimg">
      <small>{{legenda}}</small>
    </div>
    <div v-if="file">
      <small @click="loadimg">{{file.name}}</small>
    </div>
  </div>
</template>
<script>
const fs = require("fs");
const axios = require("axios");
const resizetool = require("./resizetool");
module.exports = {
  name: "VueImgUpload",
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
  data() {
    return {
      dataimg: undefined,
      file: undefined,
      noimg:
        "data:image/svg+xml;base64," +
        fs.readFileSync(__dirname + "/no-img.svg", "base64"),
      cancelimg:
        "data:image/svg+xml;base64," +
        fs.readFileSync(__dirname + "/cancel-img.svg", "base64")
    };
  },
  mounted() {
    let attr = document.createAttribute("style");
    attr.value = `width:${this.width};height:${this.height};`;
    this.$refs["imgconainer"].setAttributeNode(attr);
  },
  methods: {
    loadimg() {
      this.file = null;
      this.$refs["input"].type = "";
      this.$refs["input"].type = "file";
      this.$refs["input"].click();
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
      if (this.resize) this.resizefile();
      else this.previewimg();
    },
    resizefile() {
      let file = this.file; //this.$refs["input"].files[0];
      resizetool.resize(file, this.resize).then(ret => {
        this.dataimg = ret; // preview
        this.$nextTick(_ =>
          this.$emit("onresizefile", { file, image: this.$refs["image"] })
        );
        this.checkorientation();
      });
    },
    previewimg() {
      this.dataimg = URL.createObjectURL(this.file);
      this.checkorientation();
    },
    checkorientation() {
      let file = this.file;
      if (this.orientation == "landscape") {
        resizetool.dolandscape(this.dataimg).then(dataimg => {
          this.dataimg = dataimg;
          this.$emit("onchangeorientation", {
            file,
            image: this.$refs["image"]
          });
          this.dotheupload();
        });
      } else if (this.orientation == "portrait") {
        resizetool.doportrait(this.dataimg).then(dataimg => {
          this.dataimg = dataimg;
          this.$emit("onchangeorientation", {
            file,
            image: this.$refs["image"]
          });
          this.dotheupload();
        });
      } else {
        this.dotheupload();
      }
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
    },
    removeimg() {
      this.dataimg = null;
      this.file = null;
      this.$emit("onremoveimage");
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
.cancelimg {
  position: absolute;
  max-width: 40px;
  max-height: 40px;
  top: 0px;
  right: 0px;
}
</style>