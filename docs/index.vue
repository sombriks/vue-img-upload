<template>
  <div>
    <div>
      <!-- Place this tag where you want the button to render. -->
      <a class="github-button"
         href="https://github.com/sombriks/vue-img-upload"
         data-icon="octicon-star"
         data-count-href="/sombriks/vue-img-upload/stargazers"
         data-show-count="true"
         data-count-aria-label="# stargazers on GitHub"
         aria-label="Star sombriks/vue-img-upload on GitHub">Star</a>
      <!-- Place this tag where you want the button to render. -->
      <a class="github-button"
         href="https://github.com/sombriks/vue-img-upload/issues"
         data-icon="octicon-issue-opened"
         data-show-count="true"
         data-count-aria-label="# issues on GitHub"
         aria-label="Issue sombriks/vue-img-upload on GitHub">Issue</a>
      <!-- Place this tag where you want the button to render. -->
      <a class="github-button"
         href="https://github.com/sombriks"
         data-count-href="/sombriks/followers"
         data-show-count="true"
         data-count-aria-label="# followers on GitHub"
         aria-label="Follow @sombriks on GitHub">Follow @sombriks</a>
      <!-- -->
      <a href="https://www.patreon.com/user?u=4566034"
         target="patreon"
         title="Buy me a beer">
        <img src="imgs/patreon-medium-button.png"
             alt="patreon" />
      </a>
      <hr/>
    </div>
    <div class="row"
         id="root">
      <div class="col-xs-3">
        <h3>Vue Image Upload</h3>
        <doc-menu></doc-menu>
      </div>
      <div class="col-xs-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
const VueRouter = require("vue-router")
module.exports = {
  name: "DocRoot",
  router: new VueRouter({
    routes: [
      { path: "/", redirect: "/00-start" },
      ... require("./components/routes")
    ]
  }),
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
