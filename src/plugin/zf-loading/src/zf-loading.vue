<template>
  <div class="loading">
    <div class="loading-container" v-if="visible">
      <img class="load" src="./loading.gif">
      <p class="desc">{{title}}</p>
    </div>
    <div class="loading-container" v-else>
      <h3>载入失败</h3>
      <p class="reTxt">点击按钮重新加载</p>
      <p class="reload iconfont icon-jiazai" @click.stop="reload"></p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'zfLoading',
    props: {
      // 判断是否请求失败
      visible: {
        type: Boolean,
        default: true
      },
      // 请求时的txt
      title: {
        type: String,
        default: ''
      },
      // 失败执行的函数
      reload: Function
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import '~common/css/variable'
  .loading
    position: absolute
    left: 50%
    top: 50%
    transform: translate3d(-50%, -50%, 0)
    text-align: center
    .loading-container
      .load
        width: .4rem
        height: .4rem
      .desc
        line-height: .3rem
        font-size: $font-size-1_4
        color: $color-999
      h3
        color: $color-999
        font-size: $font-size-2_0
      .reTxt
        color: $color-999
        font-size: $font-size-1_1
        line-height: .3rem
        margin-bottom: .06rem
      .reload
        width: .5rem
        height: .5rem
        font-size: .5rem
        color: $color-default
        padding: .1rem
        border-radius: 50%
        border: .06rem solid $color-999
</style>
