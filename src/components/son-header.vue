<template>
  <header>
    <i class="iconfont icon-zuojiantou" @click="$router.go(-1)"></i>
    <h3>{{title}}</h3>
  </header>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import "~common/css/variable"

  header
    display: flex
    padding: 0 .1rem
    align-items: center
    background: $color-d93f30
    color: $color-fff
    overflow: hidden
    vertical-align: middle
    i
      flex: 0 0 .4rem
      height: .5rem
      line-height: .5rem
      font-size: $font-size-2_2
      text-align: center
    h3
      flex: 1
      font-size: $font-size-1_6
      margin-left: .3rem
</style>
