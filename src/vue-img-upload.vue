<template>
  <div ref="imgconainer">
    <img ref="image" width="100%" height="100%" @click="loadimg" />
    <input type="file" ref="input" class="theinput" accept="image/*" @change="changefile" />
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
const axios = require("axios")
const resizetool = require("./resizetool")
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
    method: {
      type: String,
      default: "post"
    },
    url: String,
    headers: Object,
    resize: String,
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
      name: "",
      dataimg: undefined,
      noimg: "data:image/svg+xml;base64," + fs.readFileSync(__dirname + "/ic_account_circle_black_24px.svg", "base64")
    }
  },
  mounted() {
    let attr = document.createAttribute("style")
    attr.value = `width:${this.width};height:${this.height};`
    this.$refs["imgconainer"].setAttributeNode(attr)
    if (this.img != null)
      this.$refs["image"].src = this.img
    else
      this.$refs["image"].src = this.noimg
  },
  methods: {
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
      this.$emit("onchangefile", { file, image: this.$refs["image"] })
      if (this.resize)
        this.resizefile()
      else
        this.previewimg()
    },
    resizefile() {
      let file = this.$refs["input"].files[0]
      resizetool.resize(file, this.resize).then((ret) => {
        this.dataimg = ret // preview
        this.checkorientation()
        this.$emit("onresizefile", { file, image: this.$refs["image"] })
      })
    },
    previewimg() {
      let file = this.$refs["input"].files[0]
      this.dataimg = URL.createObjectURL(file)
      this.checkorientation()
    },
    checkorientation() {
      let file = this.$refs["input"].files[0]
      if (this.orientation == "landscape") {
        resizetool.dolandscape(this.dataimg).then(dataimg => {
          this.dataimg = dataimg;
          this.$refs["image"].src = this.dataimg
          this.$emit("onchangeorientation", { file, image: this.$refs["image"] })
          this.dotheupload();
        })
      } else if (this.orientation == "portrait") {
        resizetool.doportrait(this.dataimg).then(dataimg => {
          this.dataimg = dataimg;
          this.$refs["image"].src = this.dataimg
          this.$emit("onchangeorientation", { file, image: this.$refs["image"] })
          this.dotheupload();
        })
      } else {
        this.$refs["image"].src = this.dataimg
        this.dotheupload();
      }
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
  }
}
</script>