<template>
    <div class="w-100 h-100 position-fixed" id="parent">
        <app-nav></app-nav>
        <router-view name="sidebar" id="parent__sidebar"></router-view>
        <router-view name="maincontent" id="parent__maincontent"></router-view>
    </div>
</template>

<script>
import SideBarComponent from './SideBarComponent'
import AppNav from './AppNavigationComponent'
import BiteComponent from './BiteComponent'
import AppFooter from './FooterComponent'
import { requestAPI } from '../js/LearnedAPI'

export default {
  name: 'ParentComponent',
  components: {
    AppFooter,
    AppNav,
    BiteComponent,
    SideBarComponent },
  beforeMount () {
    localStorage.setItem('trackingRef', this.$route.query.trackingRef || '')
    if (this.$route.query.trackingRef) {
      return requestAPI(`/track/${this.$route.query.trackingRef}/open`, 'POST', {
        'type': 'deeplink'
      })
    }
  }
}

</script>

<style scoped lang="scss">
    @import '../scss/styles.scss';

    #parent {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: stretch;
    align-items: flex-start;

    &__sidebar {
      order: 0;
      flex: 1;
      align-self: stretch;
      margin-top: $header-height;
      max-width: $sidebar-width;
      z-index: 0;
      background-color: #f0f0f5;
      overflow-y: auto;
      overflow-x: hidden;
    }

    &__maincontent {
      order: 1;
      flex: 3;
      align-self: stretch;
      overflow: auto;
    }
  }
</style>
