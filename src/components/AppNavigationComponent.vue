<template>
  <header id="app-nav">
    <div id="box">
    <img id="logo" src="../assets/logo.svg"/>
    <Button id="leave-feedback-button" class="leave-feedback-button" :onClick="leaveFeedback">Leave Feedback</Button>
    </div>
    <button id="logout" class="logout-button" v-on:click="logout($router, redirectBack)">Logout</button>
  </header>

</template>

<script>
import { logout } from '../js/authentication/AuthService'
import Button from './Button'

export default {
  name: 'app-nav',
  components: {
    Button
  },
  props: {
    redirectBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    logout,
    leaveFeedback () {
      return this.$router.push({ name: 'feedback' })
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../scss/styles';

button {
  outline: none;
  border: none;
}

#app-nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: $header-height;
  background-color: #ffffff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 0;
  left: 0;
}

#box {
  display: flex;
  justify-content: space-between;
  width: 750px
}

#logo {
  margin: 27px 22px;
  width: 98px;
  height: 30px;
}

#logout {
  @extend %font-primary;
  font-size: 18px;
  background: none;
  float: right;
  width: 79px;
  height: 18px;
  color: #abbdd3;
  text-transform: uppercase;
  margin: 33px 22px;
}

#leave-feedback-button {
  @extend %font-primary;
  @extend %common-button;
  margin: 23px 400px 0px 0px;
}

</style>
