<template>
  <zf-container>
    <son-header title="书单详情"></son-header>
    <zf-scroll-y class="scroll" :data="themeBook" v-show="themeBook">
      <div>
        <!--简介-->
        <div class="synopsis">
          <h3>{{themeBook.title}}</h3>
          <p class="desc" :class="descText" @click="selectDesc">{{themeBook.desc}}</p>
          <div class="author" v-if="themeBook.author">
            <img :src="image(themeBook.author.avatar)" alt="">
            <p>
              创建自
              <span>{{themeBook.author.nickname}}</span>
            </p>
          </div>
        </div>
        <!--推荐的书-->
        <ul class="bookList">
          <li v-for="(item, index) in themeBook.books" :key="index" @click="selectBook(item.book)">
            <div class="info" v-if="item.book">
              <img v-lazy="image(item.book.cover)" alt="">
              <div class="text">
                <h3>{{item.book.title}}</h3>
                <address>{{item.book.author}}</address>
                <p>
                  <span>{{item.book.latelyFollower}}</span>人在追
                  <span class="line">|</span>
                  <span>{{item.book.wordCount | getPlayback}}</span>万字
                </p>
              </div>
            </div>
            <p class="evaluate" :class="evaluateText" v-if="item.comment" @click.stop="selectEval">{{item.comment}}</p>
          </li>
        </ul>
      </div>
    </zf-scroll-y>
  </zf-container>
</template>
<script>
  import sonHeader from 'components/son-header'
  import {getBookAuthorDetails} from 'api/themeBook'
  import {routerList, createUrl} from 'common/js/mixin'
  import {getPlayback} from 'common/js/util'

  export default {
    name: 'themeBook-details',
    created() {
      this._id = this.$route.query._id
    },
    mixins: [routerList, createUrl],
    mounted() {
      setTimeout(() => {
        this.init()
      }, 20)
    },
    // 组件停用时调用
    beforeDestroy () {
      this.$emit('leave')
    },
    filters: {
      getPlayback
    },
    data() {
      return {
        themeBook: {},
        evaluate: true,
        desc: true        // 简介是否收起
      }
    },
    computed: {
      descText() {
        return this.desc ? 'no-warp' : ''
      },
      evaluateText() {
        return this.evaluate ? 'no-warp' : ''
      }
    },
    methods: {
      init() {
        this.$emit('load')
        getBookAuthorDetails(this._id).then((res) => {
          if (res.bookList) {
            this.themeBook = res.bookList
            this.$emit('loadOk')
          } else {
            this.$emit('loadNo', this.init)
          }
        }).catch(err => {
          console.log(err)
          this.$emit('loadNo', this.init)
        })
      },
      // 简介展开收起
      selectDesc() {
        this.desc = !this.desc
      },
      selectEval() {
        this.evaluate = !this.evaluate
      }
    },
    components: {
      sonHeader
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
    .synopsis
      padding: .1rem .2rem .2rem .2rem
      h3
        font-size: $font-size-1_8
        max-width: 2rem
        line-height: .5rem
        @include no-warp
      .desc
        line-height: .2rem
        color: $color-999
        font-size: $font-size-1_2
        &.no-warp
          @include no-warp-box(5)
          /* autoprefixer: off*/
          -webkit-box-orient: vertical
          /* autoprefixer: on*/
      .author
        display: flex
        align-items: center
        margin-top: .2rem
        img
          width: .5rem
          height: .5rem
          border-radius: 50%
        p
          margin-left: .2rem
          font-size: $font-size-1_2
          span
            padding-left: .05rem
            color: $color-f6bc7e
    .bookList
      background: $color-f8f8f8
      overflow: hidden
      li
        margin: .1rem
        padding: .2rem .2rem 0 .2rem
        background: $color-fff
        .info
          display: flex
          align-items: center
          padding-bottom: .2rem
          border-bottom: 1px solid $color-00001
          img
            width: .6rem
            margin-right: .2rem
          .text
            line-height: .2rem
            h3
              font-size: $font-size-1_5
            address
              font-size: $font-size-1_2
              color: $color-999
            p
              font-size: $font-size-1_2
              color: $color-999
              span
                color: $color-d93f30
              .line
                color: $color-999
                padding: 0 .05rem
        .evaluate
          line-height: .5rem
          font-size: $font-size-1_5
          &.no-warp
            @include no-warp
</style>
