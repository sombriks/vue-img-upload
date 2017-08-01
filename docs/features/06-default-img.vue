<template>
  <div class="row">
    <div class="col-xs-12">
      <h3>Change default img</h3>
    </div>
    <code-preview class="col-xs-12">
      <div slot="example">
        <vue-img-upload width="200px"
                        :img="oneimg"
                        @onchangefile="gotchange"></vue-img-upload>
        <span v-show="!changed">Default img is</span>
        <button v-show="!changed"
                @click="oneimg = oneimg == 'imgs/star.png' ? 'imgs/wolf-moon.png' : 'imgs/star.png'">{{oneimg}}</button>
        <span v-show="changed">Once a file is selected, default image isn't needed anymore</span>
      </div>
      <div slot="source">
        &lt;template> &lt;vue-img-upload width="200px" @onchangefile="gotchange">&lt;/vue-img-upload>
        &lt;/template> &lt;script> module.exports = { name: "Basic", methods:{ gotchange(img){
        console.log(img) } } } &lt;/script>
      </div>
    </code-preview>
  </div>
</template>

<script>
module.exports = {
  name: "DefaultImg",
  created() {

  },
  data() {
    return {
      oneimg: "imgs/star.png",
      changed: false
    };
  },
  methods: {
    gotchange(img) {
      console.log(img)
      this.changed = true;
    }
  }
};
</script>

<style>

</style>
