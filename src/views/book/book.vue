<template>
  <zf-container>
    <son-header title="书籍详情"></son-header>
    <zf-scroll-y :data="dataCont" class="scroll" ref="scroll">
      <div>
        <!--title-->
        <div class="book-details">
          <img v-if="book.cover" :src="image(book.cover)" alt="">
          <div class="book-details-text">
            <h3>{{book.title}}</h3>
            <p>
              <span class="author" @click.stop="selectAuthor(book)">{{book.author}}</span>
              <span class="line">|</span>
              <span>{{book.minorCate}}</span>
              <span class="line">|</span>
              <span>{{book.wordCount | getPlayback}}字</span>
            </p>
            <p v-if="book.updated">{{book.updated | getDistanceTime}}</p>
          </div>
        </div>
        <!--追更-->
        <div class="book-btn">
          <div class="chase" @click="selectChaseBook" :class="chaseBg">
            <i>{{chaseIcon}}</i>
            <span>{{chaseText}}</span>
          </div>
          <div @click="selectBookCont(book)">
            <i class="iconfont icon-search"></i>
            <span>开始阅读</span>
          </div>
        </div>
        <!--书数据-->
        <ul class="book-info">
          <li>
            <p>追书人群</p>
            <p>{{book.latelyFollower}}</p>
          </li>
          <li>
            <p>读者留存率</p>
            <p>{{book.retentionRatio}}%</p>
          </li>
          <li>
            <p>日更新字数</p>
            <p>{{book.serializeWordCount}}</p>
          </li>
        </ul>
        <!--书标签-->
        <tags-list :data="book.tags" v-if="book.tags"></tags-list>
        <!--简介-->
        <p class="book-longIntro" :class="longIntro" @click="warpSwitch">{{book.longIntro}}</p>
        <div class="hr_1"></div>
        <!--热评-->
        <h3 class="title">
          <span>热门书评</span>
          <span>更多</span>
        </h3>
        <review-list :data="hotReview"></review-list>
        <div class="hr_1"></div>
        <!--// 推荐-->
        <h3 class="title">
          <span>你可能感兴趣</span>
          <span @click="selectRecommend(book)">更多</span>
        </h3>
        <ul class="recommend">
          <li v-for="(item, index) in recommend" :key="index" v-if="index < 4" @click="selectBook(item)">
            <img :src="image(item.cover)" alt="">
            <p>{{item.title}}</p>
          </li>
        </ul>
      </div>
    </zf-scroll-y>
    <router-view></router-view>
  </zf-container>
</template>
<script>
  import ReviewList from './components/review-list'
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import {createUrl, routerList} from 'common/js/mixin'
  import {getPlayback, getDistanceTime} from 'common/js/util'
  import { getBookDetails, getBookContent, getBookRecommend, getBookReview } from 'api/book'

  export default {
    name: 'book',
    mixins: [createUrl, routerList],
    components: { ReviewList },
    mounted() {
      setTimeout(() => {
        this.init()
      }, 20)
    },
    data() {
      return {
        warp: true,
        book: {},       // 书详情
        hotReview: [],  // 热评
        recommend: []   // 推荐
      }
    },
    filters: {
      getPlayback,
      getDistanceTime
    },
    watch: {
      $route(val) {
        if (val.query.bookid) {
          this.init() // 自己调用自己，重新初始化
          this.$refs.scroll.scrollTo(0, 0, 0)
        }
      }
    },
    // 离开路由钩子
    beforeRouteLeave(to, from, next) {
      next() // 一定要调用next() 不然路由不会跳转
    },
    // 重复调用组件的钩子
    beforeRouteUpdate(to, from, next) {
      next()
    },
    computed: {
      ...mapState('book', [
        'bookChase'
      ]),
      ...mapGetters('book', [
        'ifLikeBook'
      ]),
      dataCont() {
        if (this.hotReview && this.recommend) {
          let arr = this.hotReview.concat(this.recommend)
          return arr
        }
      },
      // 简介是否三行显示
      longIntro() {
        return this.warp ? 'noWarp' : ''
      },
      // 是否追书样式切换
      chaseBg() {
        return this.ifLikeBook ? 'live' : ''
      },
      chaseIcon() {
        return this.ifLikeBook ? '-' : '+'
      },
      chaseText() {
        return this.ifLikeBook ? '不追了' : '追更新'
      }
    },
    methods: {
      ...mapMutations('book', [
        'btnbookChase',
        'set_bookid',
        'set_book'
      ]),
      init() {
        this.bookid = this.$route.query.bookid
        this.set_bookid(this.bookid)
        this.$emit('load')
        // 书详情
        getBookDetails(this.bookid).then(res => {
          if (res.data) {
            this.book = res.data
            this.set_book(this.book)
            this.$emit('loadOk')
          } else {
            this.$emit('loadNo', this.init)
          }
        }).catch(err => {
          console.log(err)
          this.$emit('loadNo', this.init)
        })
        // 书相关推荐
        getBookRecommend(this.bookid).then(res => {
          if (res.data.books) {
            this.recommend = res.data.books
            this.$emit('loadOk')
          } else {
            this.$emit('loadNo', this.init)
          }
        }).catch(err => {
          console.log(err)
          this.$emit('loadNo', this.init)
        })
        // 书讨论 书id 排序 开始、数量
        getBookReview({
          bookId: this.bookid,
          sort: 'comment-count',
          start: 0,
          limit: 2
        }).then(res => {
          if (res.reviews) {
            this.hotReview = res.reviews
            this.$emit('loadOk')
          } else {
            this.$emit('loadNo', this.init)
          }
        }).catch(err => {
          console.log(err)
          this.$emit('loadNo', this.init)
        })
      },
      // 追书/ 取消追书
      selectChaseBook() {
        this.btnbookChase(this.book)
      },
      // 简介显示切换
      warpSwitch() {
        this.warp = !this.warp
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import "~common/css/variable"
  @import "~common/css/mixin"

  .scroll
    position: fixed
    top: .5rem
    bottom: 0
    width: 100%
    max-width: 640px
    overflow: hidden
    .book-details
      display: flex
      align-items: center
      margin: .2rem
      img
        width: .7rem
        height: .9rem
        margin-right: .2rem
        border-radius: .03rem
      .book-details-text
        flex: 1
        line-height: .25rem
        h3
          @include no-warp
          font-size: $font-size-1_6
        p
          color: $color-999
          font-size: $font-size-1_3
          .author
            color: $color-d93f30
          .line
            padding: 0 .03rem
    .book-btn
      margin: 0 .2rem
      display: flex
      align-items: center
      justify-content: space-between
      >div
        flex: 1
        text-align: center
        height: .4rem
        line-height: .4rem
        border-radius: .03rem
        color: $color-fff
        background: $color-d93f30
        &.live
          background: $color-999
      .chase
        margin-right: .2rem
    .book-info
      display: flex
      align-items: center
      justify-content: center
      padding: .2rem 0
      margin: .2rem
      border-top: 1px solid $color-00001
      border-bottom: 1px solid $color-00001
      li
        flex: 1
        text-align: center
        line-height: .2rem
        p:first-child
          color: $color-999
          font-size: $font-size-1_2
        p:last-child
          font-size: $font-size-1_5
    .book-longIntro
      margin: .2rem
      line-height: .2rem
      &.noWarp
        @include no-warp-box(3)
    .hr_1
      @include hr_1
    .title
      display: flex
      margin: .2rem
      align-items: center
      span:first-child
        flex: 1
        font-size: $font-size-1_6
      span:last-child
        width: .5rem
        text-align: right
        color: $color-999
        @include extend-click
    .recommend
      display: flex
      margin: .2rem
      padding-bottom: .4rem
      align-items: center
      justify-content: space-between
      li
        flex: 0 0 20%
        justify-content: center
        img
          width: 100%
          height: .8rem
          border-radius: .03rem
        p
          margin-top: .05rem
          max-width: .8rem
          font-size: $font-size-1_2
          text-align: center
          @include no-warp
</style>
