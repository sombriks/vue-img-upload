<template>
  <ul>
    <li v-for="r in routes" :key="r.path">
      <router-link :to="r.path">{{r.label}}</router-link>
    </li>
    <!-- <li><router-link to="/00-start">Start</router-link></li>
    <li><router-link to="/01-basic">Basic Usage</router-link></li>
    <li><router-link to="/02-resize-px">Resize (px)</router-link></li>
    <li><router-link to="/03-resize-pct">Resize (%)</router-link></li>
    <li><router-link to="/04-upload">Upload</router-link></li>
    <li><router-link to="/05-orientation">Orientation</router-link></li>
    <li><router-link to="/06-default-img">Default Img</router-link></li>
    <li><router-link to="/07-dialog">Dialog</router-link></li>
    <li><router-link to="/99-roadmap">Roadmap</router-link></li> -->
  </ul>
</template>
<script>
const routes = require("./routes");
module.exports = {
  name: "DocMenu",
  data: _ => ({ routes })
};
</script>