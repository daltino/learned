<template>
  <div class="full__screen">
    <iframe class="full__screen__iframe" :src=src></iframe>
  </div>
</template>

<script>
export default {
  name: 'FullScreenIframe',
  props: {
    src: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>

.full__screen {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.2);

  &__iframe {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}

</style>
