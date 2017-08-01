<template>
  <div class="row">
    <div class="col-xs-4">
      <h5>Example</h5>
      <slot name="example"></slot>
    </div>
    <div class="col-xs-8">
      <h5>Source</h5>
      <pre>
        <slot name="source"></slot>
      </pre>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: "CodePreview",
  created() {

  },
  data() {
    return {

    };
  },
  methods: {

  }
};
</script>

<style>

</style>
