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
      default: "150px"
    },
    height: {
      type: String,
      default: "150px"
    }
  },
  data() {
    return {
      noimg: "data:image/svg+xml;base64," + fs.readFileSync(__dirname + "/ic_account_circle_black_24px.svg", "base64")
    }
  },
  mounted() {
    this.$refs["imgconainer"].style = `width:${this.width};height:${this.height}`
    this.$refs["image"].src = this.noimg
  },
  methods: {
    loadimg() {
      this.$refs["input"].click()
    },
    changefile() {
      console.log("changefile")
    }
  }
}
</script>