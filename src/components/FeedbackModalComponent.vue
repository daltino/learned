<template>
  <modal-component :onClose="popUpClose">
    <div class="content">
      <iframe
        title="Feedback Form"
        class="freshwidget-embedded-form"
        id="feedback__form"
        src="https://learned.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&screenshot=No&helpdesk_ticket[subject]=Feedback for Learned's web version&searchArea=no"
        scrolling="yes"
        frameborder="0"
      >
      </iframe>
    </div>
  </modal-component>
</template>

<script>
import ModalComponent from "./ModalComponent";

export default {
  name: "FeedbackModal",
  components: { ModalComponent },
  props: {
    answer: {
      type: Function,
    },
  },
  methods: {
    popUpClose: function () {
      this.answer(this.message);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/styles";

$modal-width: 465px;
$modal-content-width: 429px;

.content {
  width: 465px;
  height: 405px;
  background-color: white;
  display: flex;
  flex-direction: column;
}

#feedback {
  &__text {
    width: $modal-content-width;
    margin: 10px auto 11px;
  }

  &__form {
    width: $modal-content-width;
    margin: 0 auto;
    height: 405px;
  }
}

label {
  @extend %font-primary;
  font-size: 16px;
  font-weight: bold;
}
</style>
