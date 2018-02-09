<template>
  <transition name="list-fade">
    <div class="wrapper" v-show="showFlag" @click="hide">
      <div class="cont">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'zfEjectBlock',
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      hide() {
        this.showFlag = false
        this.$emit('hide')
      },
      show() {
        this.showFlag = true
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import '~common/css/variable'

  .wrapper
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: $zIndex_40
    background-color: $color-00003
    .cont
      width: 100%
      height: 100%
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
</style>
