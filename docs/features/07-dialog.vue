<template>
  <div class="row">
    <div class="col-xs-12">
        <h3>Image preview, dialog to crop/zoom/rotate</h3>
    </div>
    <code-preview class="col-xs-12">
      <div slot="example">
        <vue-img-dialog-upload width="200px" @onchangefile="gotchange"></vue-img-dialog-upload>
      </div>
      <div slot="source">

      </div>
    </code-preview>
  </div>
</template>

<script>
module.exports = {
  name: "Basic",
  created() {

  },
  data() {
    return {

    };
  },
  methods:{
    gotchange(img){
      console.log(img)
    }
  }
};
</script>

<style>

</style>
