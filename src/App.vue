<template>
  <div id="app">
    <h1>Test Status</h1>
    <local-usage />
    <custom-name />
    <many-status />
    <many-promises-to-same-feature />
  </div>
</template>

<script>
import CustomName from './examples/CustomName.vue'
import LocalUsage from './examples/LocalUsage.vue'
import ManyPromisesToSameFeature from './examples/ManyPromisesToSameFeature.vue'
import ManyStatus from './examples/ManyStatus.vue'

export default {
  name: 'App',
  components: {
    LocalUsage,
    CustomName,
    ManyStatus,
    ManyPromisesToSameFeature
  },
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.space {
  margin: 20px;
}
.error {
  color: red;
}
.success {
  color: green;
}
</style>
