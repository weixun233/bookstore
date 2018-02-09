<template>
  <div class="home">
    <zf-scroll-y :data="bookChase" class="scroll" :style="windowWidth">
      <div>
        <ul>
          <li v-for="(item, index) in bookChase"
              :key="index"
              @click="selectBookCont(item)">
            <div class="img">
              <img :src="image(item.cover)" alt="">
            </div>
            <div class="text">
              <h3>{{item.title}}</h3>
              <p>
                <span></span>
                <span>{{item.lastChapter}}</span>
              </p>
            </div>
            <div class="control" @click.stop="selectControl(item)">
              <i class="iconfont icon-gengduo"></i>
            </div>
          </li>
        </ul>
        <zf-no-result class="noResult" title="暂无追的书" v-show="!bookChase.length"></zf-no-result>
      </div>
    </zf-scroll-y>
    <zf-eject-bottom ref="ejectBottom" :style="windowWidth">
      <div class="control-wrapper">
        <h3>{{book.title}}</h3>
        <ul>
          <li @click="selectBook(book)">书籍详情</li>
          <li @click="deleteBook">删除</li>
        </ul>
      </div>
    </zf-eject-bottom>
    <zf-confirm ref="confirm"
                :style="windowWidth"
                :title="deleteTitle"
                @confirm="delete_bookChase(book)"></zf-confirm>
  </div>
</template>
<script>
  import {createUrl, routerList} from 'common/js/mixin'
  import {mapState, mapMutations} from 'vuex'
  export default {
    mixins: [createUrl, routerList],
    props: {},
    data() {
      return {
        book: {}     // 点击的书籍数据
      }
    },
    computed: {
      ...mapState('book', [
        'bookChase'
      ]),
      windowWidth() {
        return `width: ${window.innerWidth}px`
      },
      deleteTitle() {
        return `移除${this.book.title}`
      }
    },
    methods: {
      ...mapMutations('book', [
        'delete_bookChase'
      ]),
      // 弹出控件
      selectControl(item) {
        this.book = item
        this.$refs.ejectBottom.show()
      },
      // 提出删除提示
      deleteBook() {
        this.$refs.confirm.show()
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import "~common/css/variable"
  @import "~common/css/mixin"

  .home
    height: 100%
  .scroll
    max-width: 640px
    position: fixed
    top: 0
    bottom: 1.04rem
    overflow: hidden
    ul
      li
        display: flex
        align-items: center
        position: relative
        .img
          flex: 0 0.85rem
          text-align: center
          img
            width: .45rem
        .text
          flex: 1
          padding: .2rem 0
          border-bottom: 1px solid $color-00001
          h3
            font-size: $font-size-1_5
          p
            max-width: 2.2rem
            line-height: .3rem
            font-size: $font-size-1_2
            color: $color-999
            @include no-warp
        .control
          position: absolute
          right: 0
          top: .2rem
          width: .4rem
          height: .4rem
          display: flex
          align-items: center
          i
            font-size: $font-size-2_2
            margin: 0 auto
    .noResult
      position: absolute
      left: 50%
      top: 2.5rem
      transform: translate3d(-50%, -50%, 0)
  .control-wrapper
    width: 100%
    position: absolute
    left: 0
    bottom: 1.04rem
    background: $color-fff
    h3
      height: .5rem
      line-height: .5rem
      margin: 0 .2rem
      color: $color-d93f30
      font-size: $font-size-1_8
      border-bottom: 1px solid $color-00001
    ul
      margin: .1rem .2rem
      li
        height: .4rem
        line-height: .4re
</style>
