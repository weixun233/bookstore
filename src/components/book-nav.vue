<template>
  <ul class="nav">
    <li v-for="(item, index) in dateNav" :key="index" @click="selectNav(index)" :class="navActive(index)">{{item}}</li>
  </ul>
</template>
<script>
  export default {
    props: {
      // nav 名字
      dateNav: {
        type: Array,
        default: () => []
      },
      navIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      // 点击nav
      selectNav(index) {
        this.$emit('selectNav', index)
      },
      // active
      navActive(index) {
        return this.navIndex === index ? 'active' : ''
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import "~common/css/variable"

  .nav
    display: flex
    align-items: center
    justify-content: center
    background: $color-d93f30
    margin-top: -1px
    li
      flex: 1
      height: .4rem
      line-height: .4rem
      text-align: center
      color: $color-fff05
      &.active
        color: $color-fff
</style>
