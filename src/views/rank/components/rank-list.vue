<template>
  <div class="rank-list">
    <h3>{{title}}</h3>
    <ul class="rank-cont-list">
      <li v-for="(item, index) in data" :key="index" @click="selectItem(item)" v-if="index < 7">
        <img :src="image(item.cover)">
        <span>{{item.title}}</span>
      </li>
    </ul>
    <!--别人家的排行榜-->
    <div class="others" @click="othersItem" :class="arrowActive">
      <i class="icon"></i>
      <span>别人家的排行榜</span>
      <i class="arrow iconfont icon-jiantouxia"></i>
    </div>
    <ul class="rank-cont-list" v-show="others">
      <li v-for="(item, index) in dataOthers" :key="index" @click="selectItem(item)">
        <img :src="image(item.cover)">
        <span>{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import {createUrl} from 'common/js/mixin'
  export default {
    mixins: [createUrl],
    props: {
      data: {
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        others: false
      }
    },
    computed: {
      arrowActive() {
        return this.others ? 'active' : ''
      },
      dataOthers() {
        return this.data.slice(7)
      }
    },
    methods: {
      othersItem() {
        this.others = !this.others
      },
      selectItem(item) {
        this.$emit('selectRank', item)
      }
    },
    components: {}
  }
</script>
<style scoped lang="sass" type="text/sass">
  @import "~common/css/variable"

  .rank-list
    h3
      height: .5rem
      line-height: .5rem
      padding-left: .2rem
    .rank-cont-list
      li
        display: flex
        padding: .1rem 0
        align-items: center
        img
          flex: 0 0 .3rem
          width: .3rem
          margin: 0 .2rem
          border-radius: 50%
        span
          flex: 1
          padding-left: .1rem
    .others
      display: flex
      padding: .1rem .2rem
      align-items: center
      .icon
        flex: 0 0 .3rem
        height: .3rem
        margin-right: .1rem
        border-radius: 50%
        background: $color-999
      span
        flex: 1
        padding-left: .1rem
      .arrow
        flex: 0 0 .3rem
        text-align: center
      &.active
        span
          color: $color-d93f30
        .arrow
          transform: rotate(180deg)
</style>
