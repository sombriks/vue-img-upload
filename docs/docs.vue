<template>
  <div>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4">
        <div class="box">
          <h1>Image preview, no resize</h1>
          <vue-img-upload width="300px" @onchangefile="onchg"></vue-img-upload>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <h1>Image preview, resize to 100px</h1>
        <vue-img-upload width="300px" resize="100px" @onchangefile="onchg"></vue-img-upload>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <h1>Image review, resize 50%</h1>
        <vue-img-upload width="300px" resize="50%" @onchangefile="onchg"></vue-img-upload>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <h1>Image upoad, resize 10%,10%</h1>
        <label>provide http upload link</label><br/>
        <input v-model="url" style="width:100%"/> <vue-img-upload width="300px" resize="10%,10%" :url="url" @onupload="onup">
        </vue-img-upload>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  name: "DocRoot",
  data(){
    return {
      url:"http://localhost:3000/upimage"
    }
  },
  methods: {
    onup(ret) {
      console.log("up!")
      console.log(ret)
    },
    onchg(file) {
      console.log("changefile")
      console.log(file)
    }
  }
}
</script>