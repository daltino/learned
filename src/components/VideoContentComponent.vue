<template>
  <div class="bite__content__video">
    <iframe :src=youtubeEmbedUrl(details.youtubeUrl) frameborder="0" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>
  </div>
</template>

<script>
export default {
  name: 'VideoContentComponent',
  props: {
    details: Object
  },
  methods: {
    youtubeEmbedUrl: function (url) {
      const { searchParams, pathname } = new URL(url)
      return `https://www.youtube.com/embed/${searchParams.get('v') || pathname.substring(1)}?rel=0`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/styles.scss';

.bite__content__video {
  width: $content-width;
  height: 360px;
  margin: 0 auto;
}

</style>
