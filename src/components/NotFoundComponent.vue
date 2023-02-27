<template>
  <div class="w-100 h-100 position-fixed" id="main">
    <app-nav :redirectBack="false"></app-nav>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <h3>The link you’re trying to open may be broken or the page may have been removed.</h3>
    <h4>Please, try to open the link from email again</h4>
  </div>
</template>

<script>

import AppNav from './AppNavigationComponent'

export default {
  name: 'NotFoundComponent',
  components: { AppNav }

}
</script>

<style lang="scss" scoped>
@import '../scss/styles';

#main {
  text-align: center;
}

.bar {
  width: 100%;
  min-height: 84px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
}

h1 {
  @extend %font-light;
  font-size: 150px;
  color: #C8CED7;
  margin-top: 127px;
}

h2 {
  @extend %font-light;
  font-size: 50px;
  color: #343951;
  margin-top: 20px;
}

h3 {
  @extend %font-light;
  font-size: 18px;
  font-weight: normal;
  color: #343951;
  margin-top: 31px;
}

h4 {
  @extend %font-light;
  font-size: 14px;
  font-weight: normal;
  color: #96A2B1;
  margin-top: 32px;
}

</style>
