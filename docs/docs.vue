<template>
  <div>
    <h1>Image upload</h1>
    <div class="row">
      <div class="col-xs-6">
        <div class="box">
          <vue-img-upload width="100px" url="/upload" resize="100px" @onupload="onup"></vue-img-upload>
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
  method:{
    onup(){

    }
  }
}
</script>