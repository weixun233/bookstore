<template>
  <div class="no-result">
    <i class="no-result-icon"></i>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'zfNoResult',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="sass" type="text/sass">
  @import '~common/css/variable'
  @import '~common/css/mixin'

  .no-result
    text-align: center
    .no-result-icon
      display: block
      width: .86rem
      height: .9rem
      margin: 0 auto
      @include bg-image('no-result')
      background-size: .86rem .9rem
    .no-result-text
      margin-top: .3rem
      font-size: $font-size-1_2
</style>
