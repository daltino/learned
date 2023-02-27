<template>
  <div class="bite__content__article">
    <button class="main__button" v-on:click="gotoArticle()">Open Article</button>
  </div>
</template>

<script>
export default {
  name: 'ArticleContentComponent',
  props: {
    details: Object
  },
  methods: {
    gotoArticle: function () {
      window.open(this.details.articleUrl, '_blank').focus()
      this.$ga.event({
        eventCategory: 'article',
        eventAction: 'article_clicked',
        eventLabel: this.$route.path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/styles.scss';

.main__button {
  @extend %common-button;
}

.bite__content__article {
  width: $content-width;
  margin: 0 auto;
}
</style>
