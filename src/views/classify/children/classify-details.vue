<template>
  <zf-container>
    <!--header-->
    <son-header :title="title"></son-header>
    <!--nav-->
    <book-nav :dateNav="nav" :navIndex="navIndex" @selectNav="selectNav"></book-nav>
    <!--list-->
    <zf-scroll-container ref="scrollContainer" @scrollEnd="scrollEnd">
      <details-list v-for="(item, index) in nav"
                    :key="index"
                    :index="index"
                    :navIndex="navIndex"
                    :major="title"
                    @load="load"
                    @loadOk="loadOk"
                    @loadNo="loadNo"
                    @leave="leave"></details-list>
    </zf-scroll-container>
    <router-view></router-view>
  </zf-container>
</template>
<script>
  import detailsList from '../components/details-list'
  import {transmitLoad} from 'common/js/mixin'

  export default {
    name: 'class-details',
    mixins: [transmitLoad],
    components: { detailsList },
    created() {
      this.title = this.$route.query.major
    },
    data() {
      return {
        navIndex: 0,        // 当前nav Index
        nav: ['新书', '热门', '口碑', '完结']
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
