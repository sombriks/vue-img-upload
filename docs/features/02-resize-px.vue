<template>
  <div class="row">
    <div class="col-xs-12">
        <h3>Image preview, resize to 100px</h3>
        <p>You can capture <i><b>onchangefile</b></i> and <i><b>onresizefile</b></i>, but prefer <i><b>onresizefile</b></i>.</p>
    </div>
    <code-preview class="col-xs-12">
      <div slot="example">
        <vue-img-upload resize="100px" width="200px" 
          @onchangefile="gotchange" @onresizefile="gotresize"></vue-img-upload>
      </div>
      <div slot="source">
&lt;template>
  &lt;vue-img-upload resize="100px" width="200px" 
  @onchangefile="gotchange" @onresizefile="gotresize">&lt;/vue-img-upload>
&lt;/template>
&lt;script>
module.exports = {
  name: "ResizePx",
  methods:{
    gotchange(img){
      console.log(img)
    },
    gotresize(img){
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
  name: "ResizePx",
  created() {

  },
  data() {
    return {

    };
  },
  methods:{
    gotchange(img){
      console.log(img)
    },
    gotresize(img){
      console.log(img)
    }
  }
};
</script>

<style>

</style>
