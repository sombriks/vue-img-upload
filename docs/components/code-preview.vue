<template>
  <div>
    <div class="row">
      <div class="col-xs-12">
        <h5>Example</h5>
        <slot name="example"></slot>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h5>Source</h5>
        <pre>
        <slot name="source"></slot>
      </pre>
      </div>
    </div>
  </div>
</template>
<script>
exports.name = "CodePreview"
</script>