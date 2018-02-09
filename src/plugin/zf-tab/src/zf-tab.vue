<template>
    <ul class="tab">
      <li class="item"
          v-for="(item, index) in tabs"
          :key="index"
          :class="{'active': currentIndex === index}"
          @click="selectItem(index)">
        <span>{{item.name}}</span>
      </li>
    </ul>
</template>
<script>
  export default {
    name: 'zfTab',
    props: {
      tabs: {
        type: Array,
        default: () => []
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      selectItem(index) {
        this.$emit('tab', index)
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import '~common/css/variable'

  .tab
    display: flex
    align-items: center
    margin: 0 auto
    width: 2.4rem
    border: 1px solid $color-222
    border-radius: .5rem
    .item
      flex: 1
      padding: .08rem
      text-align: center
      font-size: $font-size-1_6
      color: $color-d93f30-05
      &.active
        background: $color-333
        color: $color-fff
</style>
