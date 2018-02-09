<template>
  <div class="wrapper">
    <h3>{{title}}</h3>
    <ul>
      <li v-for="(item, index) in data" :key="index" @click="select(item)">
        <p>{{item.name}}</p>
        <p class="num">{{item.bookCount}}本</p>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      data: {
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      select(item) {
        this.$emit('selectClass', item)
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import "~common/css/variable"

  h3
    height: .5rem
    line-height: .5rem
    margin: 0 .2rem
  ul
    display: flex
    align-items: center
    flex-wrap: wrap
    border-top: 1px solid $color-00001
    li
      flex: 0 0 33.33%
      text-align: center
      padding: .1rem 0
      box-sizing: border-box
      border-right: 1px solid $color-00001
      border-bottom: 1px solid $color-00001
      .num
        line-height: .3rem
        font-size: $font-size-1_2
        color: $color-999
</style>
