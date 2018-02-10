<template>
  <ul>
    <li v-for="(item, index) in data" :key="index">
      <div class="img">
        <img :src="image(item.author.avatar)" alt="">
      </div>
      <div class="text">
        <address>{{item.author.nickname}} lv.{{item.author.lv}}</address>
        <h3>{{item.title}}</h3>
        <div class="rating">
          <i v-for="index in item.rating" :key="index" class="iconfont icon-iconfontxingxing"></i>
        </div>
        <p class="content">{{item.content}}</p>
        <div class="helpful">
          <i class="iconfont icon-zan1"></i>
          <span>{{item.helpful.yes}}</span>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
  import {createUrl} from 'common/js/mixin'
  export default {
    mixins: [createUrl],
    props: {
      data: {
        type: Array,
        default: () => []
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import "~common/css/variable"
  @import "~common/css/mixin"

  ul
    li
      display: flex
      align-items: flex-start
      margin: 0 .2rem
      border-bottom: 1px solid $color-00001
      padding: .1rem 0
      .img
        flex: 0 0 .65rem
        img
          width: .45rem
          border-radius: 50%
      .text
        flex: 1
        max-width: 2.7rem
        line-height: .23rem
        address
          font-style: normal
          font-size: $font-size-1_2
          color: $color-ffce6b
        h3
          @include no-warp
        .rating
          i
            color: $color-be671b
            font-size: $font-size-1_3
        .content
          @include no-warp-box(2)
          /* autoprefixer: off*/
          -webkit-box-orient: vertical
          /* autoprefixer: on*/
          color: $color-999
          font-size: $font-size-1_3
        .helpful
          margin-top: .05rem
          color: $color-00003
          font-size: $font-size-1_2
</style>
