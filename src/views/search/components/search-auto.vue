<template>
  <zf-scroll-y
    class="scroll"
    :data="data"
    :probeType="probeType"
    :beforeScroll="beforeScroll"
    @beforeScroll="listScroll">
    <ul>
      <li v-for="(item, index) in data" :key="index" @click="select(item)">
        <i class="iconfont icon-search"></i>
        <span>{{item}}</span>
      </li>
    </ul>
  </zf-scroll-y>
</template>
<script>
  export default {
    created() {
      this.beforeScroll = true
      this.probeType = 3
    },
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      select(item) {
        this.$emit('selectAuto', item)
      },
      // 发布事件、让父组件执行收起键盘
      listScroll() {
        this.$emit('listScroll')
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import "~common/css/variable"
  .scroll
    max-width: 640px
    position: fixed
    width: 100%
    top: .5rem
    bottom: 0
    overflow: hidden
    background: $color-fff
    ul
      width: 100%
      height: 100%
      li
        display: flex
        align-items: center
        i
          flex: 0 0 .4rem
          text-align: center
        span
          flex: 1
          padding: .1rem 0 .1rem .2rem
</style>
