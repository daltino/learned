<template>
   <div class="modal__mask">
      <div class="modal__content" :style=contentStyle>

        <div v-if="closeModal" class="modal__content__close">
          <img id="close__icon"
               src="https://s3.eu-central-1.amazonaws.com/images-develop/web-app-images/close.svg"
               v-on:click="onClose">
        </div>

        <slot> </slot>

      </div>
  </div>
</template>

<script>
export default {
  name: 'ModalComponent',
  props: {
    closeModal: {
      type: Boolean,
      default: true
    },
    onClose: {
      type: Function
    },
    contentStyle: {
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>

.modal {
  &__mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  &__content {
    background-color: #6b7785;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);

    transition: all .3s ease;
    overflow-x: auto;
  }
}

#close__icon {
  float: right;
}

</style>
