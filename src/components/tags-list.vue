<template>
  <ul class="book-tags">
    <li v-for="(item, index) in data" :key="index" :class="bookTagsClo(index)" @click="select(item.word)">{{item.word}}</li>
  </ul>
</template>
<script>
  export default {
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      // 标签颜色
      bookTagsClo(index) {
        let i = index % 7
        switch (i) {
          case 0:
            return 'color-1'
          case 1:
            return 'color-2'
          case 2:
            return 'color-3'
          case 3:
            return 'color-4'
          case 4:
            return 'color-5'
          case 5:
            return 'color-6'
          case 6:
            return 'color-7'
          default:
            return ''
        }
      },
      select(item) {
        this.$emit('selectTags', item)
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import "~common/css/variable"
  .book-tags
    display: flex
    align-items: center
    flex-wrap: wrap
    margin: 0 .2rem
    li
      margin: 0 .2rem .2rem 0
      padding: .1rem .16rem
      border-radius: .03rem
      color: $color-fff
      &.color-1
        background: $color-90c5f0
      &.color-2
        background: $color-c0afd0
      &.color-3
        background: $color-f6bc7e
      &.color-4
        background: $color-67ccb7
      &.color-5
        background: $color-e78f8f
      &.color-6
        background: $color-f88f55
      &.color-7
        background: $color-67ccb7
</style>
