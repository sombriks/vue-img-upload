<template>
  <div class="row">
    <div class="col-xs-12">
        <h1>Image preview, no resize</h1>
    </div>
    <code-preview class="col-xs-12">
      <div slot="example">
        <vue-img-upload width="200px" @onchangefile="gotchange"></vue-img-upload>
      </div>
      <div slot="source">
&lt;template>
  &lt;vue-img-upload width="200px" @onchangefile="gotchange">&lt;/vue-img-upload>
&lt;/template>
&lt;script>
module.exports = {
  name: "Basic",
  methods:{
    gotchange(img){
      console.log(img)
    }
  }
}
&lt;/script> 
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
