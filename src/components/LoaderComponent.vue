
<!-- copied from the dashboard -->

<template>
    <div class="preloader">
        <div class="preloader__item preloader__item--triangle">
            <svg>
                <path fill="#ff0055"  stroke-width="0" d="M 1.4707837188976767 13.385273388626352 L 7.5292162811023235 2.614726611373648 C 8.26460814055116 1.307363305686824 9.73539185944884 1.307363305686824 10.470783718897676 2.614726611373648 L 16.52921628110232 13.385273388626352 C 17.26460814055116 14.692636694313176 16.5 16 15 16 L 3 16 C 1.5 16 0.7353918594488383 14.692636694313176 1.4707837188976767 13.385273388626352 Z "></path>
            </svg>
        </div>
        <div class="preloader__item preloader__item--square"></div>
        <div class="preloader__item preloader__item--circle"></div>

        <div class="preloader__info">{{info}}</div>
    </div>
</template>

<script>
export default {
  name: 'LoaderComponent',
  data: function () {
    return {
      info: 'Loading'
    }
  }
}
</script>

<style lang="scss" scoped>

@import "../scss/loader.scss";

</style>
