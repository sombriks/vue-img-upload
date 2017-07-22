<template>
  <div class="row">
    <div class="col-xs-12">
      <h3>Image upoad, resize 10%,10%</h3>
    </div>
    <code-preview class="col-xs-12">
      <div slot="example">
        <label for="theinput">provide http upload link</label><br/>
        <input id="theinput" v-model="url" style="width:100%"/> <br/>
        <vue-img-upload width="300px" resize="10%,10%" :url="url" @onupload="gotupload" @onuploaderror="goterror"></vue-img-upload>
      </div>
      <div slot="source">
&lt;template>
  &lt;div>
    &lt;label for="theinput">provide http upload link&lt;/label>&lt;br/>
    &lt;input id="theinput" v-model="url" style="width:100%"/> &lt;br/>
    &lt;vue-img-upload width="300px" resize="10%,10%" :url="url" @onupload="gotupload" @onuploaderror="goterror">&lt;/vue-img-upload>
  &lt;/div>
&lt;/template>
&lt;script>
module.exports = {
  name: "Upload",
  data(){
    return {
      url:"http://localhost:3000/upimage"
    };
  }
  methods:{
    gotchange(img){
      console.log(img)
    },
    gotupload(ret){
      console.log(ret)
    },
    goterror(ret){
      console.log(ret)
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
  name: "Upload",
  data() {
    return {
      url:"http://localhost:3000/upimage"
    };
  },
  methods: {
    gotchange(img){
      console.log(img)
    },
    gotupload(ret){
      console.log(ret)
    },
    goterror(ret){
      console.log(ret)
    }
  }
};
</script>

<style>

</style>
