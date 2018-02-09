<template>
  <header>
    <div class="title">
      <span>追书神器</span>
      <router-link tag="i" class="iconfont icon-search" to="/index/search"></router-link>
      <i class="iconfont icon-yejianmoshi"></i>
    </div>
    <ul class="nav">
      <li v-for="(item, index) in indexColumn" :key="index" :class='{active: indexActive == item.classpath}' @click.stop="navClick(item.classpath)">{{item.classname}}</li>
    </ul>
  </header>
</template>
<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'
  export default {
    computed: {
      ...mapState('index', [
        'indexActive',
        'indexColumn'
      ])
    },
    methods: {
      ...mapMutations('index', [
        'set_indexActive'
      ]),
      navClick(type) {
        this.set_indexActive(type) // 点击栏目需要改变vuex内的indexActive值，这是为了与swiper联动
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import '~common/css/variable'

  header
    background: $color-d93f30
    .title
      display: flex
      padding: .2rem .1rem .2rem .2rem
      align-items: center
      justify-content: space-between
      color: $color-fff
      span
        flex: 1
        font-size: $font-size-2_6
        font-family: 华文行楷
      i
        flex: 0 0 .4rem
        font-size: $font-size-1_8
        text-align: center
        position: relative
    .nav
      display: flex
      width: 80%
      margin: 0 auto
      align-items: center
      justify-content: center
      li
        flex: 1
        height: .4rem
        line-height: .4rem
        text-align: center
        color: $color-fff05
        &.active
          color: $color-fff
</style>
