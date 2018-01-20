<template>
  <div>
    <h2>1.0.0 (not released yet)</h2>
    <ul>
      <li>Add import/export support (currently only require/exports supported)</li>
      <li>Improve mobile usability</li>
    </ul>
    <h2>0.6.3</h2>
    <ul>
      <li>minor bugfix</li>
    </ul>
    <h2>0.6.2</h2>
    <ul>
      <li>minor bugfix</li>
    </ul>
    <h2>0.6.1</h2>
    <ul>
      <li>minor bugfix. since css are calculated later and browserify somehow fails to resolve it, the needed info to
        properly configure croppie css was added to the docs.
      </li>
    </ul>
    <h2>0.6.0</h2>
    <ul>
      <li>Added <b>croppie</b> dependecy in order to offer better crop usage</li>
      <li>Added "onremoveimage" event when you click on the fancy delete button which appears when 
        you select an image.</li>
      <li>Due to a code improvement (it's a feature, not a bug. Trust me), the 'image' field on event parameter became 
        erratic. For example, if your code handles "onchangefile" and also "onresizefile", only "onresizefile" get all 
        stuff. the "image" field will be undefined on "onchangefile". I <i>should</i> bump major, 
        <b>but i will not</b>. This isn't 1.x stuff yet.</li>
    </ul>
    <h2>0.5.6</h2>
    <ul>
      <li>minor bugfix</li>
    </ul>
    <h2>0.5.5</h2>
    <ul>
      <li>minor bugfix</li>
    </ul>
    <h2>0.5.4</h2>
    <ul>
      <li>added new events for dialog</li>
    </ul>
    <h2>0.4.4</h2>
    <ul>
      <li>fixed upload on dialog version</li>
    </ul>
    <h2>0.4.3</h2>
    <ul>
      <li>fixed buttons trying to submit form</li>
    </ul>
    <h2>0.4.2</h2>
    <ul>
      <li>Fixed another dialog buttons positioning problem</li>
    </ul>
    <h2>0.4.1</h2>
    <ul>
      <li>Fixed dialog buttons positioning problem</li>
    </ul>
    <h2>0.4.0</h2>
    <ul>
      <li>Implement the crop/rotate dialog</li>
    </ul>
    <h2>0.3.0</h2>
    <ul>
      <li>Added 'default image' example</li>
    </ul>
    <h2>0.2.0</h2>
    <ul>
      <li>Project docs under construction</li>
      <li>Added photo orientation</li>
    </ul>
    <h2>0.1.0</h2>
    <ul>
      <li>First 'usable' version</li>
    </ul>
  </div>
</template>

<script>
module.exports = {
  name: "Roadmap",
  created() {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>

</style>
