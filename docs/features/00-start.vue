<template>
  <div>
    <h3>Introduction</h3>
    <p>Vue Image Upload is yet another
      <a href="https://vuejs.org/" target="vuejs">vue.js</a> lib to preview/upload images.</p>
    <h3>Dependencies</h3>
    <ul>
      <li>Vue.js 2.2+</li>
      <li>Axios 0.16+</li>
      <li>Croppie 2.6.1+</li>
      <li>Bluebird 3.5+</li>
      <li>Brfs 1.4.3+</li>
    </ul>
    <p>Your project <b>must</b> provide that in order to get things working.</p>
    <h3>Installation</h3>
    <pre>
      npm install croppie --save
      // all othe dependecies
      npm install vue-img-upload --save
    </pre>
    <p>After that you have to register it with Vue:</p>
    <pre>
require("../node_modules/croppie/croppie.css")

const VueImgUpload = require("vue-img-upload")
Vue.use(VueImgUpload)
// now you can use either vue-img-ipload or vue-img-dialog-upload components on your application
    </pre>
    <h3>Roadmap</h3>
    <p>See
      <router-link to="/99-roadmap">here</router-link>.</p>
    <h3>Help wanted!</h3>
    <p>This is an open source project and i am still willing to receive patches.</p>
  </div>
</template>

<script>
module.exports = {
  name: "Start",
};
</script>

<style>

</style>
