<template>
  <span></span>
</template>

<script>
import { login } from '../js/authentication/AuthService'
import _ from 'lodash'

export default {
  name: 'LoginComponent',
  mounted: function () {
    // in this.$route.query.redirect there's a path to where the user should be redirected after authorization
    // user should be redirected to this path after authentication
    // https://auth0.com/docs/users/redirecting-users#how-to-redirect-to-a-non-callback-url
    const redirectTo = _.get(this.$route.query, 'redirect')
    const error = _.get(this.$route.query, 'error')
    if (error) { this.$ga.event('login', 'login error', error) }
    login(redirectTo)
  }
}
</script>
