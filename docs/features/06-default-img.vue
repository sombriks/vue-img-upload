<template>
  <div class="row">
    <div class="col-xs-12">
      <h3>Change default img</h3>
    </div>
    <code-preview class="col-xs-12">
      <div slot="example">
        <vue-img-upload width="200px" :img="oneimg" legenda=""></vue-img-upload>
      </div>
      <div slot="source">
        &lt;template> 
          &lt;vue-img-upload width="200px" :img="oneimg" legenda="">&lt;/vue-img-upload> 
        &lt;/template> 
        &lt;script> 
          module.exports = { 
            name: "DefaultImg", 
            data: _ => ({ oneimg: "imgs/default1.jpg" }) 
          } 
        &lt;/script>
      </div>
    </code-preview>
  </div>
</template>

<script>
  module.exports = { 
    name: "DefaultImg", 
    data: _ => ({ oneimg: "imgs/default1.jpg" }) 
  } 
</script>

<style>

</style>
