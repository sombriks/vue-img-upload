<template>
  <div>
    <h1>Image upload, no resize</h1>
    <div class="row">
      <div class="col-xs-6">
        <div class="box">
          <vue-img-upload width="300px"
                          url="/upload"
                          @onchangefile="onchg"
                          @onupload="onup"></vue-img-upload>
        </div>
      </div>
      <div class="col-xs-6">
  
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