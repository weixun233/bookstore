<template>
  <transition name="drop">
    <div class="hint" :class="positionTip" v-show="showFlag" @click.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'zfHint',
    props: {
      // 提示框存在时间
      delay: {
        type: Number,
        default: 2000
      },
      // 参数出现位置(top、middle)
      position: {
        type: String,
        default: 'middle'
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    computed: {
      positionTip() {
        return this.position === 'top' ? 'top-tip' : this.position === 'middle' ? 'middle-tip' : ''
      }
    },
    methods: {
      show() {
        this.showFlag = true
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.hide()
        }, this.delay)
      },
      hide() {
        this.showFlag = false
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import '~common/css/variable'

  .hint
    z-index: $zIndex_10
  .top-tip
    position: fixed
    top: 0
    width: 100%
    color: $color-fff
    padding: .08rem .15rem
    background: rgba(0, 0, 0, 0.8)
    &.drop-enter-active, &.drop-leave-active
      transition: all 0.3s
    &.drop-enter, &.drop-leave-to
      transform: translate3d(0, -100%, 0)
  .middle-tip
    max-width: 80%
    position: fixed
    top: 50%
    left: 50%
    padding: .08rem .15rem
    border-radius:
    font-size: $font-size-1_4
    color: $color-fff
    background: rgba(0, 0, 0, 0.8)
    transform: translate3d(-50%, -50%, 0)
    &.drop-enter-active, &.drop-leave-active
      transition: all 0.3s
    &.drop-enter, &.drop-leave-to
      opacity: 0
</style>
