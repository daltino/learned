<template>
  <div id="footer">
    <div class="line"></div>
    <div id="footer__content">
        <div v-if="this.isCompleted">
            <Button class="completed" v-on:click="clicked()">
                <img src="../assets/complete-checkmark.png"
                 srcset="../assets/complete-checkmark@2x.png 2x,../assets/complete-checkmark@3x.png 3x"
                 class="complete-checkmark">
                Completed </Button>
        </div>
        <div v-else>
            <Button class="uncompleted" v-on:click="clicked()">
            <img src="../assets/complete-checkmark.png"
                 srcset="../assets/complete-checkmark@2x.png 2x,../assets/complete-checkmark@3x.png 3x"
                 class="complete-checkmark__uncompleted">
                Mark as complete
                </Button>
        </div>
      <div class="uncompleted-hint" v-if="this.isCompleted">
          <Icon class="uncompleted-hint__icon" icon="exclamation-circle"/>
          <div id="uncompleted-hint-text">Not completed yet? You can mark this as uncompleted.</div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon'

export default {
  name: 'app-footer',
  components: {
    Icon
  },
  props: {
    isCompleted: {
      type: Boolean,
      default: false
    },
    complete: {
      type: Function
    }
  },
  methods: {
    clicked: function () {
      this.complete(!this.isCompleted)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/styles.scss';

#footer {
  height: $footer-height;
  width: $main-content-width;
  background-color: #ffffff;
  flex-wrap: wrap;
  padding-left: 20px;
}

#footer__content {
  max-width: $content-width;
  text-align: left;
  margin: 15px auto;
  display:flex;
  flex-direction: row;
  justify-content: center;
}

.completion-button {
  @extend %font-primary;
  width: 230px;
  height: 50px;
  object-fit: contain;
  border-radius: 25px;
  margin:10px;
}

.complete-checkmark {
  margin: 5px;
  &__uncompleted {
  filter: brightness(0) saturate(100%) invert(79%) sepia(15%) saturate(399%) hue-rotate(173deg) brightness(96%) contrast(84%) ;
  }
}

.completed {
  @extend .completion-button;
  background-color: #3bc363;
  font-size: 14px;
  color: #ffffff;
  margin:10px;
}

.uncompleted {
  @extend .completion-button;
  background-color: #f0f0f5;
  font-size: 14px;
  color: #abbdd3;
}

.uncompleted-hint {
  @extend %font-primary;
  width: 196px;
  height: 32px;
  object-fit: contain;
  font-family: Lato;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  color: #687786;
  display:flex;
  padding: 20px 0px 20px 0px;
  &__icon {
  width: 20px;
  height: 20px;
  margin: 5px;
}
}

</style>
