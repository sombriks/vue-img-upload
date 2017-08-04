<template>
  <div class="row">
    <div class="col-xs-12">
        <h3>Image preview, no resize</h3>
    </div>
    <code-preview class="col-xs-12">
      <div slot="example">
        <vue-img-upload width="200px" @onchangefile="gotchange"></vue-img-upload>
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
