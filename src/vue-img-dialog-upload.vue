<template>
  <div ref="imgconainer">
    <div class="theimgcontainer">
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
    <div ref="thedialog" class="thedialog">
      <div class="dialogpane">
        <img :src="cancelimg" class="cancelimg" @click="closedialog" />
        <div ref="imgpane" class="imgpane"></div>
      </div>
    </div>
  </div>
</template>
<script>
const fs = require("fs");
const axios = require("axios");
const resizetool = require("./resizetool");
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
    dataimg: undefined,
    file: undefined,
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
      this.$refs["thedialog"].style.display = "block";
    },
    closedialog() {
      this.$refs["thedialog"].style.display = "none";
      this.resetfile();
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
  top: 50px;
  right: 50px;
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
}
</style>
