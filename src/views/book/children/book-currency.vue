<template>
  <zf-container>
    <son-header title="选择来源"></son-header>
    <zf-scroll-y :data="bookSource" class="scroll">
      <ul>
        <li v-for="(item, index) in bookSource" :key="index" @click="setBookSource(index)" :class="active(index)">
          <div class="icon">
            <span>{{icon(item.host)}}</span>
          </div>
          <div class="txt">
            <h3>{{item.name}}</h3>
            <p>
              <span>{{item.updated | getDistanceTime}}</span>
              <span class="lase">{{item.lastChapter}}</span>
            </p>
          </div>
        </li>
      </ul>
    </zf-scroll-y>
  </zf-container>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import {getDistanceTime} from 'common/js/util'
  import {getBookSource} from 'api/book'

  export default {
    mounted() {
      setTimeout(() => {
        this.init()
      }, 20)
    },
    beforeDestroy() {
      this.$emit('leave')
    },
    data() {
      return {
        bookSource: [],
        prevcurrency: parseInt(this.$route.query.prevcurrency),
        followerCount: this.$route.query.followerCount
      }
    },
    filters: {
      getDistanceTime
    },
    computed: {
      ...mapGetters('book', [
        'ifLikeBook'           // 返回当前书是否已追
      ])
    },
    methods: {
      ...mapMutations('book', [
        'set_bookid'
      ]),
      ...mapActions('book', [
        'set_myCurrency'
      ]),
      init() {
        this.bookid = this.$route.query.bookid
        this.set_bookid(this.bookid)
        this.$emit('load')

        // 获取书源
        getBookSource(this.bookid).then(res => {
          console.log(res)
          if (res) {
            this.bookSource = res.data
            this.$emit('loadOk')
          } else {
            this.$emit('loadNo', this.init)
          }
        }).catch(err => {
          console.log(err)
          this.$emit('loadNo', this.init)
        })
      },
      active(index) {
        return this.prevcurrency === index ? 'active' : ''
      },
      icon(str) {
        return str.substring(0, 1)
      },
      // 设置书源
      setBookSource(currency) {
        this.set_myCurrency(currency)
        this.$router.back()
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
    background: $color-f8f8f8
    ul
      margin: 0 .2rem
      li
        display: flex
        align-items: center
        &.active
          color: $color-d93f30
        .icon
          flex: 0 0 .6rem
          span
            display: inline-block
            width: .3rem
            height: .3rem
            border-radius: 50%
            background: $color-333
            color: $color-f8f8f8
            line-height: .3rem
            text-align: center
        .txt
          padding: .2rem 0
          h3
          p
            color: $color-999
            margin-top: .05rem
            font-size: $font-size-1_3
            @include no-warp
</style>
