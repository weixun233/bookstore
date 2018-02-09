<template>
  <div class="find">
    <ul>
      <li v-for="(item, index) in nav" :key="index" @click="selectItem(index)">
        <i></i>
        <div class="title">
          <span>{{item}}</span>
          <i>&gt;</i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        nav: ['排行', '主题书单', '分类']
      }
    },
    methods: {
      selectItem(index) {
        switch (index) {
          case 0:
            this.$router.push({
              path: `/index/rank`
            })
            break
          case 1:
            this.$router.push({
              path: `/index/themeBook?index=0`
            })
            break
          case 2:
            this.$router.push({
              path: `/index/classify`
            })
            break
          default:
            break
        }
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import "~common/css/variable"
  .find
    height: 100%
    ul
      padding-top: .05rem
      li
        display: flex
        align-items: center
        >i
          flex: 0 0 .2rem
          height: .2rem
          margin: 0 .1rem
          background: $color-d93f30
          border-radius: 50%
        .title
          flex: 1
          padding: .2rem 0
          margin-left: .1rem
          display: flex
          align-items: center
          font-size: $font-size-1_6
          border-bottom: 1px solid $color-00001
          span
            flex: 1
          >i
            flex: 0 0 .3rem
            color: $color-999
            font-family: 宋体
            font-style: normal
</style>
