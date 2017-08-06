<template>
  <div class="row">
    <div class="col-xs-12">
      <h3>Image preview, dialog to crop/zoom/rotate</h3>
    </div>
    <code-preview class="col-xs-12">
      <div slot="example">
        <vue-img-dialog-upload width="200px"
                               @onchangefile="gotchange"
                               @onimagechange="gotnewimage"></vue-img-dialog-upload>
      </div>
      <div slot="source">
&lt;template>
  &lt;vue-img-dialog-upload width="200px"
                        @onchangefile="gotchange"
                        @onimagechange="gotnewimage">&lt;/vue-img-dialog-upload>
&lt;/template>
&lt;script>
module.exports = {
  name: "Dialog",
  methods: {
    gotchange(ev) {
      console.log(ev)
    },
    gotnewimage(ev) {
      console.log(ev)
    }
  }
};
&lt;/script>
      </div>
    </code-preview>
  </div>
</template>

<script>
module.exports = {
  name: "Dialog",
  methods: {
    gotchange(ev) {
      console.log(ev)
    },
    gotnewimage(ev) {
      console.log(ev)
    }
  }
};
</script>

<style>

</style>
