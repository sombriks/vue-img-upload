<template>
  <div>
    <div>
      <!-- Place this tag where you want the button to render. -->
      <a class="github-button" href="https://github.com/sombriks/vue-img-upload" data-icon="octicon-star" data-count-href="/sombriks/vue-img-upload/stargazers" data-show-count="true" data-count-aria-label="# stargazers on GitHub" aria-label="Star sombriks/vue-img-upload on GitHub">Star</a>
      <!-- Place this tag where you want the button to render. -->
      <a class="github-button" href="https://github.com/sombriks/vue-img-upload/issues" data-icon="octicon-issue-opened" data-show-count="true" data-count-aria-label="# issues on GitHub" aria-label="Issue sombriks/vue-img-upload on GitHub">Issue</a>
      <!-- Place this tag where you want the button to render. -->
      <a class="github-button" href="https://github.com/sombriks" data-count-href="/sombriks/followers" data-show-count="true" data-count-aria-label="# followers on GitHub" aria-label="Follow @sombriks on GitHub">Follow @sombriks</a>
      <!-- -->
      <a href="https://www.patreon.com/user?u=4566034" target="patreon" title="Buy me a beer">
        <img src="imgs/patreon-medium-button.png" alt="patreon" />
      </a>
      <hr/>
    </div>
    <div class="row" id="root">
      <div class="col-xs-3">
        <h3>Vue Image Upload</h3>
        <doc-menu></doc-menu>
      </div>
      <div class="col-xs-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <!--     <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-4">
                      <h1>Image preview, resize to 100px</h1>
                      <vue-img-upload width="300px" resize="100px" @onchangefile="onchg"></vue-img-upload>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                      <h1>Image review, resize 50%</h1>
                      <vue-img-upload width="300px" resize="50%" @onchangefile="onchg"></vue-img-upload>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4">
                      <h1>Image upoad, resize 10%,10%</h1>
                      <label>provide http upload link</label><br/>
                      <input v-model="url" style="width:100%"/> <vue-img-upload width="300px" resize="10%,10%" :url="url" @onupload="onup">
                      </vue-img-upload>
                    </div>
                   </div>  -->
</template>
<script>
module.exports = {
  name: "DocRoot",
  data() {
    return {
      url: "http://localhost:3000/upimage"
    }
  },
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
<style scoped>
#root {
  position: absolute;
  top: 50px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
</style>
