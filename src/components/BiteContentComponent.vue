<template>
  <div v-if="details" class="bite__content">
    <component v-bind:is="this.componentName()" :details="this.details" :description="this.description"></component>
  </div>
</template>

<script>
import _ from 'lodash'
import FullScreenIframe from './FullScreenIframe'
import SurveyContentComponent from './SurveyContentComponent'
import ExternalContentComponent from './ExternalContentComponent'
import VideoContentComponent from './VideoContentComponent'
import ArticleContentComponent from './ArticleContentComponent'
import TextContentComponent from './TextContentComponent'
import WordCloudContentComponent from './WordCloudContentComponent'

export default {
  name: 'BiteContentComponent',
  components: {
    FullScreenIframe,
    ArticleContentComponent,
    ExternalContentComponent,
    SurveyContentComponent,
    TextContentComponent,
    VideoContentComponent,
    WordCloudContentComponent
  },
  props: {
    type: String,
    subtype: String,
    details: Object,
    description: String
  },
  data: function () {
    return {
      showFullScreen: false
    }
  },
  methods: {
    componentName: function () {
      if (this.type === 'externalDocument') { return 'ExternalContentComponent' }
      if (this.type === 'text' && this.subtype === 'wordcloud') { return 'WordCloudContentComponent' }
      return `${_.capitalize(this.type)}ContentComponent`
    }
  }
}
</script>

<style lang="scss" scoped>

.bite__content {
  margin-top: 20px;
}

</style>
