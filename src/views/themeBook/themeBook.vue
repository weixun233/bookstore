<template>
  <zf-container>
    <!--header-->
    <son-header title="主题书单"></son-header>
    <!--nav-->
    <book-nav :dateNav="nav" :navIndex="navIndex" @selectNav="selectNav"></book-nav>
    <!--list-->
    <zf-scroll-container ref="scrollContainer" @scrollEnd="scrollEnd">
      <details-list v-for="(item, index) in nav"
                    :key="index"
                    :index="index"
                    :navIndex="navIndex"
                    @load="load"
                    @loadOk="loadOk"
                    @loadNo="loadNo"
                    @leave="leave"></details-list>
    </zf-scroll-container>
  </zf-container>
</template>
<script>
  import detailsList from './components/details-list'
  import {transmitLoad} from 'common/js/mixin'

  export default {
    mixins: [transmitLoad],
    components: { detailsList },
    data() {
      return {
        // 当前nav Index
        navIndex: 0,
        nav: ['本周最热', '最新发布', '最多收藏']
      }
    },
    methods: {
      // nav被点击
      selectNav(index) {
        this.navIndex = index
        this.$refs.scrollContainer._bannerTo(index)
      },
      // 列表滚动
      scrollEnd(index) {
        this.navIndex = index
      }
    }
  }
</script>
