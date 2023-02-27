<template>
  <button
    type="button"
    v-on:click="onButtonClick"
    :disabled="disabled"
  >
    <slot></slot>{{text}}
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    middle: Boolean,
    onClick: {
      type: Function,
      default: () => {}
    },
    href: String,
    size: String,
    text: String,
    disabled: {
      type: Boolean,
      default: () => false
    }
  },

  methods: {
    onButtonClick (event) {
      this.href && this.$router.push(this.href)
      this.$emit('click')
      this.onClick(event)
    }
  }
}
</script>
