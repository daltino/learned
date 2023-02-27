<template>

<loader-component></loader-component>

</template>

<script>

import { handleAuthentication } from '../js/authentication/AuthService'
import LoaderComponent from './LoaderComponent'

export default {
  name: 'CallbackComponent',
  components: { LoaderComponent },
  mounted () {
    this.$nextTick(() => {
      handleAuthentication(this.$router)
    })
  }
}

</script>
