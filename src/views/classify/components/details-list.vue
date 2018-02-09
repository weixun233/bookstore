<template>
  <div style="height: 100%">
    <book-list class="book-list"
               :data="listdata"
               @select="selectBook" @scrollToEnd="scrollToEnd"></book-list>
  </div>
</template>
<script>
  import {getClassifyDetails} from 'api/classify'
  import {routerList} from 'common/js/mixin'

  export default {
    mixins: [routerList],
    mounted() {
      setTimeout(() => {
        this.init()
      }, 20)
    },
    // 组件停用时调用
    beforeDestroy () {
      this.$emit('leave')
    },
    props: {
      // 当前 index
      navIndex: {
        type: Number,
        default: 0
      },
      // 本列表 index
      index: {
        type: Number,
        default: -1
      },
      // 类别
      major: {
        type: String,
        default: ''
      },
      // 子类别
      minor: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        start: 0,
        minorSwitch: false,
        listdata: [],
        parameter: ['new', 'hot', 'male', 'male']     // 请求的参数
      }
    },
    watch: {
      // 监听navindex
      navIndex() {
        this.init()
      },
      minor() {
        this.minorSwitch = true
        this.init()
      }
    },
    methods: {
      init() {
        if ((this.navIndex === this.index && this.listdata.length === 0) || this.minorSwitch) {
          this.minorSwitch = false
          this.$emit('load')
          getClassifyDetails({
            type: this.parameter[this.navIndex],
            major: this.major,
            minor: this.minor
          }).then(res => {
            if (res) {
              this.listdata = res.data.books
              this.$emit('loadOk')
            } else {
              this.$emit('loadNo', this.init)
            }
          }).catch(err => {
            console.log(err)
            this.$emit('loadNo', this.init)
          })
        } else if (this.listdata.length > 0) {
          this.$emit('loadOk')
        }
      },
      // 跳转书详情
      select(item, route) {
        this.$router.push({
          path: `${route}/book?bookid=${item._id}`
        })
      },
      // 滚动底部加载
      scrollToEnd() {
        this.start += 20
        getClassifyDetails({
          type: this.parameter[this.navIndex],
          major: this.major,
          minor: this.minor,
          start: this.start
        }).then(res => {
          this.listdata = this.listdata.concat(res.data.books)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
<style scoped lang="sass" type="text/sass">
  .book-list
    position: fixed
    top: 0
    bottom: .8rem
    overflow: hidden
</style>
