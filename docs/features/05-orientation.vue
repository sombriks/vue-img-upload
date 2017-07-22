<template>
  <div class="row">
    <div class="col-xs-12">
        <h3>Image orientation</h3>
    </div>
    <code-preview class="col-xs-12">
      <div slot="example">
        <vue-img-upload width="200px" :orientation="ori" @onchangefile="gotchange"></vue-img-upload>
        Next image will be <button @click="ori = ori == 'landscape' ? 'portrait' : 'landscape'">{{ori}}</button>
      </div>
      <div slot="source">
&lt;template>
  &lt;div>
    &lt;vue-img-upload width="200px" :orientation="ori" legenda="Landscape Only" @onchangefile="gotchange">&lt;/vue-img-upload>
    Next image will be &lt;button @click="ori = ori == 'landscape' ? 'portrait' : 'landscape'">{ {ori}}&lt;/button>
  &lt;/div>
&lt;/template>
&lt;script>
module.exports = {
  name: "Orientation",
  data(){
    return {
      ori:"portrait"
    }
  },
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
  name: "Orientation",
  data(){
    return {
      ori:"portrait"
    }
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
