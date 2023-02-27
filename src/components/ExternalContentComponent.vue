<template>
   <div class="bite__content__external">
      <iframe
        :src=documentEmbedUrl(details.externalDocumentUrl)
        width="100%"
        height="100%"
        frameborder="0"></iframe>
    </div>
</template>

<script>
import Jsuri from 'jsuri'

export default {
  name: 'ExternalContentComponent',
  props: {
    details: Object
  },
  methods: {
    documentEmbedUrl: function (orgUrl) {
      const uri = new Jsuri(orgUrl)
      switch (uri.host()) {
        case 'drive.google.com':
          if (uri.path().indexOf('preview') !== -1) {
            return orgUrl
          }
          const path = uri.path().slice(0, -4) + 'preview' // change view for preview
          uri.setPath(path)
          return uri.toString()
        case 'vimeo.com':
          const videoId = uri.path().split('/')[1]
          return `https://player.vimeo.com/video/${videoId}` // change the beginning of the link
        default:
          return orgUrl
      }
    }
  }
}
</script>

<style scoped>

.bite__content__external {
  height: 480px;
  min-height: 100vh;
}

</style>
