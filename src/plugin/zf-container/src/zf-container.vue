<template>
  <transition>
    <div class="container">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'zfContainer'
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import "~common/css/variable"
  @import "~common/css/mixin"

  .container
    @include maxWidth
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
</style>
