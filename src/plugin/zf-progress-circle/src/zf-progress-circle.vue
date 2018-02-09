<template>
    <div class="progress-circle">
      <svg width="30" heigth="30" ref="svg" viewBox="0 0 100 100" version="1.2" xmlns="http://www.w3.org/2000/svg">
        <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"></circle>
        <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent"
                :stroke-dasharray="dashArray"
                :stroke-dashoffset="dashOffset"></circle>
      </svg>
      <slot></slot>
    </div>
</template>
<script>
  import {getHtmlSize} from 'common/js/util'

  export default {
    name: 'zfProgressCircle',
    // percent 为：进度条百分比(1~100)
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        dashArray: Math.PI * 100
      }
    },
    computed: {
      dashOffset() {
        return (100 - this.percent) * this.dashArray / 100
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import '~common/css/variable'

  .progress-circle
    height: 30px
    position: relative
    text-align: center
    circle
      box-sizing: border-box
      stroke-width: 4px
      transform-origin: center
      &.progress-background
        transform: scale(0.9)
        stroke: $color-d93f30-05
      &.progress-bar
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-d93f30
</style>
