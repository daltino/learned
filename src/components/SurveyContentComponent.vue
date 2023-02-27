<template>
  <div class="bite__content__survey">
    <button class="main__button" v-on:click="gotoTypeform()">
      Open Survey
    </button>
    <img
      class="bite__content__survey__img"
      src="https://s3.eu-central-1.amazonaws.com/images-develop/web-app-images/typeform.jpg"
    />
    <full-screen-iframe
      v-if="showFullScreen"
      v-bind:src="details.typeFormUrl"
    ></full-screen-iframe>
  </div>
</template>

<script>
import FullScreenIframe from "./FullScreenIframe";

export default {
  name: "SurveyContentComponent",
  components: { FullScreenIframe },
  props: {
    details: Object,
  },
  data: function () {
    return {
      showFullScreen: false,
    };
  },
  methods: {
    gotoTypeform: function () {
      this.showFullScreen = true;
      this.$ga.event({
        eventCategory: "survey",
        eventAction: "typeform_clicked",
        eventLabel: this.$route.path,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/styles.scss";

.main__button {
  @extend %common-button;
}

.bite__content__survey {
  width: $content-width;
  margin: 0 0;

  &__img {
    width: 390px;
    height: 390px;
    margin: 0 auto;
    display: block;
  }
}
</style>
