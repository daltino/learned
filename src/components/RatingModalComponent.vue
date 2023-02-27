<template>
  <modal-component :onClose="popUpClose">
    <div class="content">
      <p>How did you like the content of this bite?</p>
      <img
        id="learned-app"
        src="https://s3.eu-central-1.amazonaws.com/images-develop/web-app-images/mobile-learned.svg"
      />

      <div class="rating__box">
        <img
          id="thumb"
          ref="thumb"
          src="https://s3.eu-central-1.amazonaws.com/images-develop/web-app-images/thumb-up.svg"
        />

        <div class="rating__box__stars" v-on:mouseleave="clearChoice">
          <!-- FIXME this causes: ESLint: Elements in iteration expect to have 'v-bind:key' directives. (vue/require-v-for-key) -->
          <img
            ref="stars"
            v-bind:key="starId"
            v-for="starId in [1, 2, 3, 4, 5].map((i) => `rating__star-${i}`)"
            :id="starId"
            src="https://s3.eu-central-1.amazonaws.com/images-develop/web-app-images/star.svg"
            v-on:click="clicked"
            v-on:mouseover="mouseOver"
          />
        </div>
      </div>
    </div>
  </modal-component>
</template>

<script>
import ModalComponent from "./ModalComponent";

export default {
  name: "RatingModal",
  components: { ModalComponent },
  props: {
    answer: {
      type: Function,
    },
  },
  data: function () {
    return {
      givenRating: null,
    };
  },
  methods: {
    popUpClose: function () {
      this.answer(this.givenRating);
    },
    clicked: function (event) {
      const ind = event.target.id.split("-")[1];
      this.givenRating = ind;
      this.markStars(ind);
      this.markThumb();
      setTimeout(
        function () {
          this.popUpClose();
        }.bind(this),
        1000
      );
    },
    mouseOver: function (event) {
      if (!this.givenRating) {
        const ind = event.target.id.split("-")[1];
        this.markStars(ind);
      }
    },
    clearChoice: function () {
      if (!this.givenRating) {
        this.markStars(0);
      }
    },
    markStars: function (index) {
      this.$refs.stars.forEach((star, i) => {
        const type = i < index ? "star-marked" : "star";
        star.src = `https://s3.eu-central-1.amazonaws.com/images-develop/web-app-images/${type}.svg`;
      });
    },
    markThumb: function () {
      this.$refs.thumb.src =
        "https://s3.eu-central-1.amazonaws.com/images-develop/web-app-images/thumb-up-marked.svg";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/styles";

.content {
  width: 465px;
  height: 405px;
  display: flex;
  flex-direction: column;
}

p {
  @extend %font-primary;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
}

.rating {
  &__box {
    margin-top: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

[id^="rating__star-"] {
  margin-right: 9px;
}

#thumb {
  margin-right: 20px;
}

#learned-app {
  margin-top: 29px;
  margin-bottom: 29px;
}
</style>
