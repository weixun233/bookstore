<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    name: 'zfScrollX',
    props: {
      // 第一个位默认值
      // (0、1、2、3) 不为0时滚动会派发scroll事件 传递点坐标
      probeType: {
        type: Number,
        default: 1
      },
      // (false、true) 是否可以click
      click: {
        type: Boolean,
        default: true
      },
      // 是否监听scroll的scroll事件
      listenScroll: {
        type: Boolean,
        default: false
      },
      // 数据
      data: {
        type: Array | Object,
        default: null
      },
      // 数据更新延迟更新DOM时间
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          scrollX: true,      // 开启横向滚动
          scrollY: false
        })

        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
      },
      // 禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应
      disable() {
        this.scroll && this.scroll.disable()
      },
      // 启用 better-scroll, 默认 开启
      enable() {
        this.scroll && this.scroll.enable()
      },
      // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      // 滚动到指定的位置
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      // 滚动到指定的目标元素
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>
