<template>
  <div>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4">
        <div class="box">
          <h1>Image upload, no resize</h1>
          <vue-img-upload width="300px" url="/upload" @onchangefile="onchg" @onupload="onup"></vue-img-upload>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <h1>Image upload, resize to 100px</h1>
        <vue-img-upload width="300px" resize="100px" url="/upload" @onchangefile="onchg" @onupload="onup"></vue-img-upload>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <h1>Image upload, resize 50%</h1>
        <vue-img-upload width="300px" resize="50%" url="/upload" @onchangefile="onchg" @onupload="onup"></vue-img-upload>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  name: "DocRoot",
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