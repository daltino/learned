<template>
  <div class="bite__content__text">
    <p> <span v-html=details.text></span> </p>
  </div>
</template>

<script>
export default {
  name: 'TextContentComponent',
  props: {
    details: Object
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/styles.scss';

.bite__content__text {
  @extend %font-secondary;
  max-width: $content-width;
  color: #333333;
  margin: 0 auto;
  text-align: justify;
}

</style>
