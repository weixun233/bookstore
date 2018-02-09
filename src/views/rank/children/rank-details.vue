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
                    :_id="rankListID[index]"
                    @load="load"
                    @loadOk="loadOk"
                    @loadNo="loadNo"
                    @leave="leave"></details-list>
    </zf-scroll-container>
  </zf-container>
</template>
<script>
  import detailsList from '../components/details-list'
  import {transmitLoad} from 'common/js/mixin'

  export default {
    mixins: [transmitLoad],
    components: { detailsList },
    name: 'rank-details',
    created() {
      this.title = this.$route.query.title
      this.rankListID = [this.$route.query._id, this.$route.query.monthRank, this.$route.query.totalRank]
    },
    data() {
      return {
        navIndex: 0,        // 当前nav Index
        nav: ['周榜', '月榜', '总榜']
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
