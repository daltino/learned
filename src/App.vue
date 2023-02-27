<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>

* {
  margin: 0;
  border: none;
  padding: 0;
}

html, body, #app {
  position:relative;
  height: 100%;
  width: 100%;
  margin: 0;
}

</style>
