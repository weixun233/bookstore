<template>
  <div id="app">
    <!--动画效果-->
    <transition :name="transitionName">
      <!--公共组件不缓存-->
      <keep-alive exclude="book,rank-details,class-details">
        <router-view
          class="router"
          @load="load"
          @loadOk="loadOk"
          @loadNo="loadNo"
          @leave="leave"
          @activatedLoad="activatedLoad"></router-view>
      </keep-alive>
    </transition>
    <zf-loading v-show="loading"
                :visible="loadVisible"
                :title="loadTitle"
                :reload="loadReload"></zf-loading>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {setHtmlSize} from 'common/js/util'
  export default {
    name: 'App',
    computed: {
      ...mapState('load', [
        'loading',
        'loadVisible',
        'loadTitle',
        'loadReload'
      ])
    },
    data() {
      return {
        transitionName: 'slide-right'  // 默认动态路由变化为slide-right
      }
    },
    watch: {
      $route(to, from) {
        let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
        if (isBack) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
        this.$router.isBack = false
      }
    },
    mounted() {
      setHtmlSize()
      window.onresize = () => setHtmlSize()
    },
    methods: {
      ...mapMutations('load', [
        'set_loading',
        'set_loadVisible',
        'set_loadReload'
      ]),
      // 加载中
      load() {
        this.set_loading(true)
      },
      // 加载成功
      loadOk() {
        this.set_loading(false)
        this.set_loadVisible(true)
      },
      // 加载失败 显示重新加载load
      loadNo(init) {
        this.set_loadVisible(false)
        this.set_loadReload(init)
      },
      // 退出页面隐藏load
      leave() {
        this.set_loading(false)
      },
      // 缓存失败后 再次进入页面 显示重新加载
      activatedLoad() {
        if (!this.loadVisible) {
          this.set_loading(true)
        }
      }
    }
  }
</script>

<style lang='sass' type="text/sass">
  @import '~common/css/variable'

  #app
    position: relative
    width: 100%
    height: 100%
    background: $color-f8f8f8
    .router
      transition: all .3s ease
</style>
