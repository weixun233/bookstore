<template>
  <div class="banner" ref="banner">
    <div class="banner-group" ref="bannerGroup" :style="groupHeight">
      <slot>
      </slot>
    </div>
    <div class="dots" v-if="dotControl">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // 引入dom.js
  import {addClass} from 'common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    name: 'zfBanner',
    props: {
      // 是否关闭ol
      dotControl: {
        type: Boolean,
        default: true
      },
      // 横向循环轮播 (true)  (开启后元素会+2)
      loop: {
        type: Boolean,
        default: true
      },
      // 自动轮播 (true)
      autoPlay: {
        type: Boolean,
        default: true
      },
      // 轮播间隔 (4000)
      interval: {
        type: Number,
        default: 4000
      },
      // 是否让banner容器高度100%
      groupH: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    computed: {
      groupHeight() {
        return this.groupH ? 'height: 100%' : ''
      }
    },
    mounted() {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
      // 窗口改变重新计算slider大小
      window.addEventListener('resize', () => {
        if (!this.banner) {
          return
        }
        this._setSliderWidth(true)
        this.banner.refresh()
      })
    },
    activated() {
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      clearTimeout(this.timer)
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.bannerGroup.children
        let width = 0
        let sliderWidth = this.$refs.banner.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'banner-item')

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.bannerGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.banner = new BScroll(this.$refs.banner, {
          scrollX: true,      // 开启横向滚动
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            Speed: 400
          }
        })

        this.banner.on('scrollEnd', (e) => {
          let pageIndex = this.banner.getCurrentPage().pageX
          this.currentPageIndex = pageIndex
          this.$emit('scrollEnd', pageIndex)
          if (this.autoPlay) {
            this._play()
          }
        })
        this.banner.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        let pageIndex = this.currentPageIndex + 1
        this.timer = setTimeout(() => {
          this.banner.goToPage(pageIndex, 0, 300)
        }, this.interval)
      },
      _bannerTo(pageX, pageY = 0, time = 300) {
        this.banner.goToPage(pageX, pageY, time)
      }
    }
  }
</script>

<style scoped lang="sass" type="text/sass">
  @import '~common/css/variable'

  .banner
    min-height: 1px
    .banner-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .banner-item
        float: left
        box-sizing: border-box
        overflow: hidden
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-fff05
        &.active
          width: 20px
          border-radius: 5px
          background: $color-fff08
</style>
