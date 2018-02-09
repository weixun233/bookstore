<template>
  <zf-scroll-y :data="data"
               class="scroll"
               :style="windowWidth"
               :probeType="probeType"
               :pullup="pullup"
               @scrollToEnd="scrollToEnd">
    <ul class="list" v-if="data">
      <li v-for="(item, index) in data" :key="index" @click="select(item)">
        <img :src="image(item.cover)" alt="">
        <div class="text">
          <h3>{{item.title}}</h3>
          <div v-if="listClass === 'one'">
            <address>{{item.author}}</address>
            <!--书简介-->
            <p v-if="item.shortIntro">{{item.shortIntro}}</p>
            <!--书单简介-->
            <p v-if="item.desc">{{item.desc}}</p>
            <!--书信息-->
            <div class="info" v-if="item.latelyFollower">
              <span>{{item.latelyFollower}}人在追</span>
              <span class="line">|</span>
              <span>{{item.retentionRatio}}%读者留存</span>
            </div>
            <!--书单信息-->
            <div class="info" v-if="item.bookCount">
              <span>共{{item.bookCount}}本书</span>
              <span class="line">|</span>
              <span>{{item.collectorCount}}人收藏</span>
            </div>
          </div>
          <div v-if="listClass === 'two'">
            <p class="info">
              <span>{{item.latelyFollower}}人在追</span>
              <span class="line">|</span>
              <span>{{item.retentionRatio}}读者留存</span>
              <span class="line">|</span>
              <span>{{item.author}}著</span>
            </p>
          </div>
        </div>
      </li>
    </ul>
    <p class="no-result" v-if="data.length === 0 && noResult && listClass === 'one'">无内容</p>
    <zf-no-result v-show="!data.length && listClass === 'two'" title="未找到搜索结果"></zf-no-result>
  </zf-scroll-y>
</template>
<script>
  import {createUrl, routerList} from 'common/js/mixin'

  export default {
    mixins: [createUrl, routerList],
    props: {
      // 当前 index
      data: {
        type: Array,
        default: () => []
      },
      noResult: {
        type: Boolean,
        default: false
      },
      // 列表模式
      listClass: {
        type: String,
        default: 'one'
      }
    },
    created() {
      this.probeType = 3
      this.pullup = true
    },
    methods: {
      scrollToEnd() {
        this.$emit('scrollToEnd')
      }
    },
    computed: {
      windowWidth() {
        return `width: ${window.innerWidth}px`
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import "~common/css/variable"
  @import "~common/css/mixin"

  .scroll
    .list
      padding: .2rem
      li
        display: flex
        align-items: center
        text-align: left
        img
          margin-right: .2rem
          width: .5rem
        .text
          flex: 1
          padding: .2rem 0
          line-height: .23rem
          border-bottom: 1px solid $color-00001
          h3
            max-width: 2.7rem
            @include no-warp
          address
            @include no-warp
            font-style: normal
            font-size: $font-size-1_2
            color: $color-999
          p
            @include no-warp
            max-width: 2.7rem
            font-size: $font-size-1_2
            color: $color-00005
          .info
            font-size: $font-size-1_2
            .line
              padding: 0 .05rem
    .no-result
      position: absolute
      left: 50%
      top: 50%
      margin: -.2rem 0 0 -.2rem
</style>
